import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Services from '../Shared/Services';

const MusicCard = ({ name, artists, iconPress }) => {
  return (
    <TouchableOpacity style={{ paddingLeft: 10, marginBottom: 10, backgroundColor: "white", borderRadius: 6, paddingVertical: 10, width: "100vw", display: "flex", alignItems: "center", flexDirection: "row" }}
    // onPress={() =>{setCurrentMusicData({
    //     "name":item?.name,
    //     "artist":item.artists.primary[0]?.name,
    //     "image":item.image[2]?.url,
    //     "download":item.downloadUrl[2].url,
    //     "songSelected":true
    //     })}}
    >
      <Image style={{ width: 50, height: 50 }} source={require("../Assets/Img/songBanner.png")} ></Image>
      <View style={{ width: "80%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
        <View style={{ paddingHorizontal: 10, display: "flex", alignItems: "center" }}>
          <Text style={{ width: "100%", fontWeight: "bold", fontSize: 16 }}>
            {name}
          </Text>
          <Text style={{ width: "100%" }}>
            {artists}
          </Text>
        </View>
        <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row" }}>
          <Pressable onPress={ iconPress }>
            <Ionicons style={{ paddingHorizontal: 6 }} name="heart" size={24} color="red" />
          </Pressable>
          <Entypo style={{ paddingHorizontal: 6 }} name="dots-three-vertical" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  )
}
const FavoritesScreen = ({ onPress, addMusic }) => {

  useEffect(() => {
    Services.getFavoriteMusicsList().then(res => {
      res ? setFavoritesSongsList(res) : setFavoritesSongsList(null)
    })
  }, [addMusic,changes])

  const [favoritesSongsList, setFavoritesSongsList] = useState(null)
  const [changes, setChanges] = useState(null)

  const RemoveSong = async(index)=>{
    let remove = favoritesSongsList;
    remove.splice(index, 1);
    await Services.setFavoriteMusicsList(remove);
    setChanges(index)
    console.log(remove)
  }

  return (
    <View style={[style.LibraryCardConatiner, { paddingTop: 40 }]}>
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
        <Pressable style={{ width: "35%" }} onPress={onPress}>
          <Ionicons style={{ width: "35%" }} name="arrow-back-outline" size={30} color="black" />
        </Pressable>
        <Text style={{ width: "65%", fontSize: 26, fontWeight: "bold" }}>Favorites</Text>
      </View>
      <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row", flexWrap: "wrap", paddingVertical: 20 }}>
        <Image style={{ width: 120, height: 120, resizeMode: "cover", borderTopLeftRadius: 15 }} source={require("../Assets/Img/songBanner.png")} />
        <Image style={{ width: 120, height: 120, resizeMode: "cover", borderTopRightRadius: 15 }} source={require("../Assets/Img/songBanner.png")} />
        <Image style={{ width: 120, height: 120, resizeMode: "cover", borderBottomLeftRadius: 15 }} source={require("../Assets/Img/songBanner.png")} />
        <Image style={{ width: 120, height: 120, resizeMode: "cover", borderBottomRightRadius: 15 }} source={require("../Assets/Img/songBanner.png")} />
      </View>
      <View style={{ marginBottom: 10, display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Pressable onPress={addMusic}>
          <View style={{ borderRadius: 50, display: "flex", justifyContent: "center", alignItems: "center", width: 60, height: 60, backgroundColor: "#FFADA2" }}>
            <FontAwesome5 style={{ margin: "auto" }} name="play" size={24} color="white" />
          </View>
        </Pressable>
      </View>
      <ScrollView style={{height:350}} showsVerticalScrollIndicator={false}>
        {favoritesSongsList?.map((item, index)=>
          <MusicCard key={item.id} name={item.name} artists={item.artist} iconPress={()=> RemoveSong(index)}/>
        )}
      </ScrollView>
    </View>
  )
}
export default function PlayListLibrary() {

  const [favorites, setFavorites] = useState(false);
  const [count, setCount] = useState(0);
  const [songsList, setSongsList] = useState([]);

  const addNewSong = async () => {
    setCount(count + 1);
    const song = {
      "id": count,
      "name": `name ${count}`,
      "artist": `artist ${count}`,
      "image": "../Assets/Img/songBanner.png"
    }
    let list = songsList;
    list.push(song);
    setSongsList(list)

    Services.getFavoriteMusicsList().then(res => {
      if(res){
        let favorite = res;
        favorite.push(song);
        Services.setFavoriteMusicsList(favorite)
      }else{
        Services.setFavoriteMusicsList(songsList)
      }
      // res ? setSongsList(res) : setSongsList([])
      console.log(res);
    })
    setTimeout(()=>{
      if (songsList) {
        let favorite = songsList;
        favorite.push(song);
        Services.setFavoriteMusicsList(favorite)
      } else {
        Services.setFavoriteMusicsList(song)
      }
    })
  }

  return (
    <>
      {favorites ? <FavoritesScreen addMusic={()=>addNewSong()} onPress={() => setFavorites(false)}></FavoritesScreen> :
        <View style={[style.LibraryCardConatiner, { paddingTop: 40 }]}>
          <Text style={{ fontSize: 26, fontWeight: "bold", textAlign: "center" }}>Library</Text>
          <Pressable onPress={() => setFavorites(true)}>
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
    display: "flex",
    justifyContent: "center",
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
  grid: {
    flex: 4,
  }
})