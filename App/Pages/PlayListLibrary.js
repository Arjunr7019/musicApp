import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Services from '../Shared/Services';
import { MusicController } from '../Context/MusicController';
import { MovingText } from '../Components/MovingText';
import { CurrentMusic } from '../Context/CurrentMusic';

const MusicCard = ({ name, artists, iconPress, image,selectedCard }) => {
  return (
    <TouchableOpacity style={{ paddingLeft: 10, marginBottom: 10, backgroundColor: "white", borderRadius: 6, paddingVertical: 10, width: "100vw", display: "flex", alignItems: "center", flexDirection: "row" }}
      onPress={selectedCard}
    >
      <Image style={{ display: "flex", zIndex: 1, width: 50, height: 50 }} source={{ uri: image }} ></Image>
      <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
        <View style={{ width: "60%", overflow: "hidden", paddingHorizontal: 10, display: "flex", alignItems: "center" }}>
          <MovingText style={{ fontWeight: "bold", fontSize: 16 }} text={name} animatedThreshold={25} />
          {/* <Text style={{ width: "100%", fontWeight: "bold", fontSize: 16 }}>
            {name}
          </Text> */}
          <Text style={{ width: "100%" }}>
            {artists}
          </Text>
        </View>
        <View style={{ display: "flex", justifyContent: "start", alignItems: "center", flexDirection: "row" }}>
          <Pressable onPress={iconPress}>
            <Ionicons style={{ paddingHorizontal: 6 }} name="heart" size={24} color="red" />
          </Pressable>
          <Entypo style={{ paddingHorizontal: 6 }} name="dots-three-vertical" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  )
}
const FavoritesScreen = ({ backToPlaylist }) => {

  const [favoritesSongsList, setFavoritesSongsList] = useState(null)
  const [changes, setChanges] = useState(null)

  const { musicControllerData, setMusicControllerData } = useContext(MusicController);
  const { currentMusicData, setCurrentMusicData } = useContext(CurrentMusic);

  useEffect(() => {
    Services.getFavoriteMusicsList().then(res => {
      res ? setFavoritesSongsList(res) : setFavoritesSongsList(null)
    })
  }, [changes])

  const RemoveSong = async (index) => {
    let remove = favoritesSongsList;
    remove.splice(index, 1);
    remove.length === 0 ? await Services.setFavoriteMusicsList(null) : await Services.setFavoriteMusicsList(remove)
    setChanges(index)
    // console.log(remove)
  }

  const playAll = () => {
    musicControllerData?.favoriteSongsFunction()
    Services?.setIndexValue(1);
  }

  const playSelectedMusic = (item,index)=>{
    setCurrentMusicData({
      "name": item?.name,
      "artist": item?.artist,
      "image": item?.image,
      "download": item?.download,
      "songSelected": true,
      "fromFavoriteList": true
    })
    Services.getIndexValue().then(res =>{
      res ? Services.setIndexValue(index + 1) : Services.setIndexValue(index + 1)
    })
  }

  return (
    <>
      {favoritesSongsList === null ?
        <View style={[style.LibraryCardConatiner, { paddingTop: 40 }]}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            <Pressable style={{ width: "35%" }} onPress={backToPlaylist}>
              <Ionicons style={{ width: "35%" }} name="arrow-back-outline" size={30} color="black" />
            </Pressable>
            <Text style={{ width: "65%", fontSize: 26, fontWeight: "bold" }}>Favorites</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <MaterialCommunityIcons name="emoticon-sad-outline" size={40} color="gray" />
            <Text style={{ fontSize: 30, color: "gray" }}>Empty Favorites List</Text>
          </View>
        </View> :
        <View style={[style.LibraryCardConatiner, { paddingTop: 40 }]}>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
            <Pressable style={{ width: "35%" }} onPress={backToPlaylist}>
              <Ionicons style={{ width: "35%" }} name="arrow-back-outline" size={30} color="black" />
            </Pressable>
            <Text style={{ width: "65%", fontSize: 26, fontWeight: "bold" }}>Favorites</Text>
          </View>
          <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap", paddingVertical: 20 }}>
            <Image style={{ width: 120, height: 120, resizeMode: "cover", borderTopLeftRadius: 15 }} source={{ uri: favoritesSongsList[0]?.image }} />
            <Image style={{ width: 120, height: 120, resizeMode: "cover", borderTopRightRadius: 15 }} source={{ uri: favoritesSongsList[1]?.image }} />
            <Image style={{ width: 120, height: 120, resizeMode: "cover", borderBottomLeftRadius: 15 }} source={{ uri: favoritesSongsList[2]?.image }} />
            <Image style={{ width: 120, height: 120, resizeMode: "cover", borderBottomRightRadius: 15 }} source={{ uri: favoritesSongsList[3]?.image }} />
          </View>
          <View style={{ marginBottom: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Pressable onPress={playAll}>
              <View style={{ borderRadius: 50, display: "flex", justifyContent: "center", alignItems: "center", width: 60, height: 60, backgroundColor: "#FFADA2" }}>
                <FontAwesome5 style={{ margin: "auto" }} name="play" size={24} color="white" />
              </View>
            </Pressable>
          </View>
          <ScrollView style={currentMusicData ? style.songsListWhileModalVisible : style.songsList} showsVerticalScrollIndicator={false}>
            {favoritesSongsList?.map((item, index) =>
              <MusicCard selectedCard={()=> playSelectedMusic(item,index)} key={item?.id} image={item?.image} name={item?.name} artists={item?.artist} iconPress={() => RemoveSong(index)} />
            )}
          </ScrollView>
        </View>}
    </>
  )
}
export default function PlayListLibrary() {

  const [favoritesActive, setFavoritesActive] = useState(false);

  return (
    <>
      {favoritesActive ? <FavoritesScreen backToPlaylist={() => setFavoritesActive(false)}></FavoritesScreen> :
        <View style={[style.LibraryCardConatiner, { paddingTop: 40 }]}>
          <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>Library</Text>
          <Pressable onPress={() => setFavoritesActive(true)}>
            <View style={style.LibraryCard}>
              <Fontisto name="heart" size={26} color="black" />
              <Text style={{ fontWeight: "medium", fontSize: 24, marginHorizontal: 10 }}>Favorites</Text>
            </View>
          </Pressable>
          <View style={style.LibraryCard}>
            <Feather name="download" size={26} color="black" />
            <Text style={{ fontWeight: "medium", fontSize: 24, marginHorizontal: 10 }}>Downloads</Text>
          </View>
        </View>}
    </>
  )
}

const style = StyleSheet.create({
  LibraryCardConatiner: {
    flex: 1,
    justifyContent: "start",
    alignItems: "start",
    flexDirection: "column",
    paddingHorizontal: 30,
  },
  LibraryCard: {
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexDirection: "row",
    marginTop: 20
  },
  songsList: {
    height: 350
  }
  ,
  songsListWhileModalVisible: {
    height: 350,
    marginBottom: 80
  }
})