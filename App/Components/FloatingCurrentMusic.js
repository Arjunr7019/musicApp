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

  let Index = 0;
  useEffect(() => {
    return sound
      ? () => {
        // Cleanup when the component unmounts or when `sound` changes
        sound.unloadAsync();
        stopUpdatingPosition();
      }
      : undefined;
  }, [sound]);

  const loadAndPlaySound = async (url) => {
    //before playing music Set audio mode for background playback
    await Audio.setAudioModeAsync({
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true
    });

    // await Audio.setNowPlayingAsync({
    //   title: currentMusicData?.name,
    //   artist: currentMusicData?.artist,
    //   artwork: currentMusicData?.image // Path to album art image
    // });
    // // Set up track metadata for lock screen
  
    try {
      if (sound) {
        await sound.unloadAsync();
        stopUpdatingPosition();
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: url },
        { shouldPlay: true }
      );
      setSound(newSound);

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPosition(status.positionMillis);
          setDuration(status.durationMillis);
        }
      });

      setIsPlaying(true);
      startUpdatingPosition(newSound);
      
      // await Audio.setNowPlayingAsync({
      //   title: currentMusicData?.name,
      //   artist: currentMusicData?.artist,
      //   artwork: currentMusicData?.image // Path to album art image
      // });
      // // Set up track metadata for lock screen

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
        await loadAndPlaySound(currentMusicData.download);
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
    stopUpdatingPosition();
    const id = setInterval(async () => {
      if (soundInstance) {
        const status = await soundInstance.getStatusAsync();
        if (status.isLoaded) {
          setPosition(status.positionMillis);
        }
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
    if (currentMusicData?.download) {
      loadAndPlaySound(currentMusicData.download);
    }
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
      "favoriteSongsFunction": favoriteSongs,
      "nextMusic": toGetIndexValue
    })
  }, [position, isPlaying])

  //Song completed message
  useEffect(() => {
    if (isPlaying && duration !== 0 && position === duration) {
      console.log("Song completed");
      setIsPlaying(false);
      setPosition(0);
      setDuration(0);
      if (currentMusicData?.fromFavoriteList) {
        Services.getIndexValue().then(res => {
          res ? Index = res : Index = 0;
          console.log("favorite list length", favorites?.length);
          console.log(res);
          setTimeout(() => {
            if (Index < favorites?.length) {
              Services.setIndexValue(Index + 1);
              console.log(Index)
              favoriteSongs()
            } else if (Index === favorites?.length) {
              Services.setIndexValue(0);
            }
          })
        })
      }
    }
  }, [position]);

  const favoriteSongs = () => {
    console.log("inSide Function", Index);
    setCurrentMusicData({
      "name": favorites[Index]?.name,
      "artist": favorites[Index]?.artist,
      "image": favorites[Index]?.image,
      "download": favorites[Index]?.download,
      "songSelected": true,
      "fromFavoriteList": true,
    })
    // if (favorites[currentIndex]?.download) {
    //   loadAndPlaySound(favorites[currentIndex]?.download);
    // }
  }

  const nextMusic = (currentPlayingIndex) => {
    if (currentMusicData?.fromFavoriteList) {
      console.log("inside nextMusic Function", currentPlayingIndex);
      console.log("favorite list length", favorites?.length);
      Services.getIndexValue().then(res => {
        res ? Index = res : Index = res;
        console.log("res", res)
        if (Index < favorites?.length) {
          if (Index === currentPlayingIndex + 1) {
            console.log("Index === currentPlayingIndex + 1 --->", Index);
            sound.pauseAsync();
            favoriteSongs();
            Services.setIndexValue(Index + 1);
          } else if (Index === currentPlayingIndex) {
            Index = Index + 1;
            console.log("Index === currentPlayingIndex ---->", Index);
            Services.setIndexValue(Index);
            sound.pauseAsync();
            favoriteSongs();
          }
        }
      })
    }
  }

  const toGetIndexValue = () => {
    if (currentMusicData?.fromFavoriteList) {
      Services.getIndexValue().then(res => {
        res ? Index = res : Index = res;
        nextMusic(Index - 1);
      })
    }
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
              <FontAwesome5 style={{ paddingHorizontal: 10, paddingVertical: 10 }} name="step-backward" size={24} color="gray" />
            </Pressable>
            <Pressable onPress={isPlaying ? pauseSound : playSound}>
              <FontAwesome5 style={{ paddingHorizontal: 10, paddingVertical: 10 }} name={isPlaying ? "pause" : "play"} size={24} color="black" />
            </Pressable>
            <Pressable onPress={() => toGetIndexValue()}>
              <FontAwesome5 style={{ paddingHorizontal: 10, paddingVertical: 10 }} name="step-forward" size={24}
                color={currentMusicData?.fromFavoriteList ? "black" : "gray"} />
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
