import { View, Text, TextInput, FlatList, TouchableOpacity, Image, SafeAreaView, Pressable } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { CurrentMusic } from '../Context/CurrentMusic'
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';
import Services from '../Shared/Services';

export default function SearchArea() {
    const [searchValue, setSearchValue] = useState('')
    const [searchedSongs, setSearchedSongs] = useState()
    const [compareSearchToFavorite, setCompareSearchToFavorite] = useState()

    const { currentMusicData, setCurrentMusicData } = useContext(CurrentMusic);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",
    };
    const searchMusic = () => {
        console.log("key is pressed")
        if (searchValue == '') {
            console.log("Search area is empty")
        } else {
            fetch(`https://saavn.dev/api/search/songs?query=${searchValue}'`, requestOptions)
                .then(response => response.json())
                .then(result => {setSearchedSongs(result.data.results); console.log(searchedSongs[0].id)})
                .catch(error => console.log('error', error));
        }
    }

    
    const[favoriteListChanges, setFavoriteListChanges] = useState()
    
    useEffect(() => {
        Services.getFavoriteMusicsList().then(res => {
            res ? setCompareSearchToFavorite(res) : setCompareSearchToFavorite();
        })
    }, [favoriteListChanges])

    const addNewSongToFavoriteList = (item) => {
        let song = {
            "id": item?.id,
            "name": item?.name,
            "artist": item.artists.primary[0]?.name,
            "image": item.image[2]?.url,
            "download": item.downloadUrl[2].url
        }
        // console.log(item)
        Services.getFavoriteMusicsList().then(res => {
            let list = [];
            list.push(song);
            if (res) {
                let favorite = res;
                favorite.push(song);
                Services.setFavoriteMusicsList(favorite)
            } else {
                Services.setFavoriteMusicsList(list)
            }
            setFavoriteListChanges(item?.id);
        })
    }

    const compare = (item)=>{
        if(compareSearchToFavorite){
            compareSearchToFavorite.forEach((data)=>{
                if(item == data?.id){
                    return "heart"
                }else{
                    return "heart-outline"
                }
            })
        }
    }

    return (
        <View style={{ paddingTop: 50, paddingHorizontal: 20 }}>
            <View style={{ width: "100%" }}>
                <TextInput onSubmitEditing={searchMusic} style={{ height: 40, width: "100%", borderWidth: 1, borderRadius: 30, paddingHorizontal: 15 }} onChangeText={setSearchValue} value={searchValue} placeholder='Search' />
            </View>
            <SafeAreaView style={{ marginBottom: 80, width: "100%" }}>
                <FlatList style={{ width: "100%" }} showsVerticalScrollIndicator={false}
                    data={searchedSongs}
                    renderItem={({ item }) =>
                    (<View style={{ backgroundColor: "white", marginVertical: 5, borderRadius: 6, paddingHorizontal: 10, width: "100%" }}>
                        <TouchableOpacity style={{ paddingVertical: 10, width: "100%", display: "flex", flexDirection: "row" }}
                            onPress={() => {
                                setCurrentMusicData({
                                    "name": item?.name,
                                    "artist": item.artists.primary[0]?.name,
                                    "image": item.image[2]?.url,
                                    "download": item.downloadUrl[2].url,
                                    "songSelected": true
                                })
                            }}>
                            <Image style={{ width: 50, height: 50 }} source={{ uri: item.image[2].url }} ></Image>
                            <View style={{ width: "60%", paddingHorizontal: 10, display: "flex", alignItems: "center" }}>
                                <Text style={{ width: "100%", fontWeight: "bold", fontSize: 16 }}>
                                    {item?.name}
                                </Text>
                                <Text style={{ width: "100%" }}>
                                    {item.artists.primary[0]?.name}
                                </Text>
                            </View>
                            <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                <Pressable onPress={() => {
                                    addNewSongToFavoriteList(item);
                                }}>
                                    <Ionicons style={{ paddingHorizontal: 6 }}
                                        name="heart" size={24}
                                        color={compareSearchToFavorite?.id == item?.id ? "red" : "black"} />
                                </Pressable>
                                <Pressable>
                                    <Entypo style={{ paddingHorizontal: 6 }} name="dots-three-vertical" size={24} color="black" />
                                </Pressable>
                            </View>
                        </TouchableOpacity>
                    </View>)} >
                </FlatList>
            </SafeAreaView>
        </View>
    )
}