import { View, Image, StyleSheet, Text, TouchableOpacity, Pressable } from 'react-native'
import React, { useContext, useState, useEffect, useRef } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ModalVisibility } from '../Context/ModalVisibility';
import { Audio } from 'expo-av';
import { CurrentMusic } from '../Context/CurrentMusic';
import { MovingText } from './MovingText';
import { MusicController } from '../Context/MusicController';
import { FavoriteMusicContext } from '../Context/FavoriteMusicContext';
import Services from '../Shared/Services';

export default function FloatingCurrentMusic() {

  const { modalVisible, setModalVisible } = useContext(ModalVisibility);
  const { currentMusicData, setCurrentMusicData } = useContext(CurrentMusic);
  const { musicControllerData, setMusicControllerData } = useContext(MusicController);
  const { favorites, setFavorites } = useContext(FavoriteMusicContext);

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState();
  const [position, setPosition] = useState(0); // Current playback position in ms
  const [duration, setDuration] = useState(0); // Total duration of the song in ms
  const [intervalId, setIntervalId] = useState(null); // For tracking the interval
  const [songUrl, setSongUrl] = useState(currentMusicData?.download); // Initial song URL
  // const [currentIndex, setCurrentIndex] = useState(0);

  let currentIndex = 0;

  const loadAndPlaySound = async (url) => {
    try {
      // Unload the current sound if it exists
      if (sound) {
        await sound.unloadAsync();
        stopUpdatingPosition();
      }

      // Load the new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(newSound);

      // Set playback status update to get the total duration
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
        }
      });

      setIsPlaying(true);
      startUpdatingPosition(newSound);
    } catch (error) {
      console.error("Error loading or playing sound:", error);
    }
  };

  const playSound = async () => {
    try {
      if (sound) {
        await sound.playAsync();
        setIsPlaying(true);
        startUpdatingPosition(sound);
      } else if (currentMusicData?.download) {
        loadAndPlaySound(currentMusicData?.download);
      }
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  };

  const pauseSound = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setIsPlaying(false);
        stopUpdatingPosition();
      }
    } catch (error) {
      console.error("Error pausing sound:", error);
    }
  };

  const startUpdatingPosition = (soundInstance) => {
    stopUpdatingPosition(); // Clear any previous interval
    const id = setInterval(async () => {
      const status = await soundInstance.getStatusAsync();
      if (status.isLoaded) {
        setPosition(status.positionMillis);
      }
    }, 1000);
    setIntervalId(id);
  };

  const stopUpdatingPosition = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  useEffect(() => {
    // Play new song whenever currentMusicData changes
    if (currentMusicData?.download) {
      loadAndPlaySound(currentMusicData?.download);
    }

    // Clean up the sound and interval when component unmounts or song changes
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
      stopUpdatingPosition();
    };
  }, [currentMusicData]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  useEffect(() => {
    setMusicControllerData({
      "position": position,
      "duration": duration,
      "currentTime": formatTime(position),
      "totalDuration": formatTime(duration),
      "isPlaying": isPlaying,
      "pauseSound": pauseSound,
      "playSound": playSound,
      "favoriteSongsFunction":favoriteSongs
    })
  }, [position, isPlaying])

  //Song completed message
  useEffect(() => {
    if (isPlaying && duration !== 0 && position === duration) {
      console.log("Song completed");
      setIsPlaying(false);
      setPosition(0);
      setDuration(0);
      if(currentMusicData?.fromFavoriteList){
        ++currentIndex
        console.log(currentIndex)
        favoriteSongs()
      }
    }
  }, [position]);

  useEffect(() => {
    Services.getFavoriteMusicsList().then(res => {
      res ? setFavorites(res) : setFavorites([]);
    })
  }, [currentMusicData])

  const favoriteSongs = () => {
    setCurrentMusicData({
      "name": favorites[currentIndex]?.name,
      "artist": favorites[currentIndex]?.artist,
      "image": favorites[currentIndex]?.image,
      "download": favorites[currentIndex]?.download,
      "songSelected": true,
      "fromFavoriteList":true,
    })
  }


  return (
    <TouchableOpacity onPress={() => { setModalVisible(true) }} style={style.floatingPlayer}>
      <View style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
        <View style={{ width: "100%", height: 3, backgroundColor: "gray", borderRadius: 5 }}>
          <View style={[style.progressBar, { width: duration ? `${(position / duration) * 100}%` : '0%' }]} />
          {/* <View style={[style.progressCircle, { left: `${(position / duration) * 100}%`, marginLeft: -12 / 2 }]} /> */}
        </View>
        {/* <Text >Current Time: {formatTime(position)}</Text>
        <Text>Total Duration: {formatTime(duration)}</Text> */}
      </View>
      <View style={{ width: "100%", display: "flex", justifyContent: "center", flexDirection: "row" }}>
        <View style={style.musicImage}>
          <Image style={{ width: "100%", height: "100%", borderRadius: 10 }} source={{ uri: currentMusicData?.image }} ></Image>
        </View>
        <View style={style.musicNameIcons}>
          <View style={{ overflow: "hidden", width: "50%" }}>
            <MovingText style={style.songFontSize} text={currentMusicData?.name} animatedThreshold={25} />
            {/* <Text style={{ fontSize: 12, paddingStart: 10 }}>{currentMusicData?.name}</Text> */}
            <Text style={{ fontSize: 12, paddingStart: 10 }}>{currentMusicData?.artist}</Text>
          </View>
          <View style={style.musicIcons}>
            <Pressable>
              <FontAwesome5 style={{ paddingHorizontal: 10, paddingVertical: 10 }} name="step-backward" size={24} color="black" />
            </Pressable>
            <Pressable onPress={isPlaying ? pauseSound : playSound}>
              <FontAwesome5 style={{ paddingHorizontal: 10, paddingVertical: 10 }} name={isPlaying ? "pause" : "play"} size={24} color="black" />
            </Pressable>
            <Pressable>
              <FontAwesome5 style={{ paddingHorizontal: 10, paddingVertical: 10 }} name="step-forward" size={24} color="black" />
            </Pressable>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  floatingPlayer: {
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
  musicImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 60,
    height: 60,
    borderRadius: 10,
    marginVertical: 10
  },
  musicNameIcons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "70%"
  },
  musicIcons: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  songFontSize: {
    fontSize: 16,
    paddingStart: 10,
    fontWeight: "bold"
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#FFADA2"
  },
  progressCircle: {
    position: "absolute",
    top: -5,
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: "#FFADA2"
  }
})
