import { View, Text, Button, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import WelcomeHeader from '../Components/WelcomeHeader';
import UserNameAndSearchBar from '../Components/UserNameAndSearchBar';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Home() {
    const { userData, setUserData } = useContext(AuthContext);
    const [songsList, setSongsList] = useState([])

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",

    };

    useEffect(() => {
        fetch(`https://v1.nocodeapi.com/arjunr/spotify/NiWQmMMygGRFyeAo/browse/new?country=ISO 3166-1`, requestOptions)
            .then(response => response.json())
            .then(result => setSongsList(result.albums.items))
            .catch(error => console.log('error', error));
    }, [])

    // songsList.map((data) => console.log(data.images[0].url))
    return (
        <View>
            <WelcomeHeader></WelcomeHeader>
            <UserNameAndSearchBar></UserNameAndSearchBar>
            <Text style={{fontSize:20, fontWeight:"bold", paddingTop:20, paddingLeft:15}}>New Releases</Text>
            <ScrollView style={{display: "flex", flexDirection: "row"}} horizontal={true}>
                    {songsList.map((data) => {
                        return (
                            <SafeAreaView style={{ paddingHorizontal:10 }} key={data.id}>
                                <TouchableOpacity onPress={()=> console.log(data.id)}>
                                    <Image style={{ width: 100, height: 100 }} source={{ uri: data.images[2].url }}></Image>
                                    <Text style={{width:100}}>
                                        {data.name}
                                    </Text>
                                </TouchableOpacity>
                            </SafeAreaView>
                        )
                    })}
            </ScrollView>
        </View>
    )
}