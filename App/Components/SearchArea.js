import { View, Text, TextInput, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { CurrentMusic } from '../Context/CurrentMusic'

export default function SearchArea() {
    const [searchValue, setSearchValue] = useState('')
    const [searchedSongs, setSearchedSongs] = useState()

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
                .then(result => setSearchedSongs(result.data.results))
                .catch(error => console.log('error', error));
        }
    }
    return (
        <View style={{ paddingTop: 50, paddingHorizontal: 20,paddingBottom:80 }}>
            <View style={{ width: "100%" }}>
                <TextInput onSubmitEditing={searchMusic} style={{ height: 40, width: "100%", borderWidth: 1, borderRadius: 30, paddingHorizontal: 15 }} onChangeText={setSearchValue} value={searchValue} placeholder='Search' />
            </View>
            <FlatList style={{ width: "100%" }} showsVerticalScrollIndicator={false}
                data={searchedSongs}
                renderItem={({ item }) =>
                (<View style={{ paddingHorizontal: 10, width: "100vw" }}>
                    <TouchableOpacity style={{ paddingVertical: 10, width: "100vw", display: "flex", flexDirection: "row" }} 
                    onPress={() =>{setCurrentMusicData({
                        "name":item?.name,
                        "artist":item.artists.primary[0]?.name,
                        "image":item.image[2]?.url,
                        "download":item.downloadUrl[2].url,
                        "songSelected":true
                        })}}>
                        <Image style={{ width: 50, height: 50 }} source={{ uri: item.image[2].url }} ></Image>
                        <View style={{paddingHorizontal:10,display:"flex",alignItems:"center"}}>
                            <Text style={{ width: "100%", fontWeight: "bold", fontSize: 16 }}>
                                {item?.name}
                            </Text>
                            <Text style={{ width: "100%" }}>
                                {item.artists.primary[0]?.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>)} ></FlatList>
        </View>
    )
}