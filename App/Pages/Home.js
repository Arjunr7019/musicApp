import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import WelcomeHeader from '../Components/WelcomeHeader';
import UserNameAndSearchBar from '../Components/UserNameAndSearchBar';

export default function Home() {
    const { userData, setUserData } = useContext(AuthContext);
    const [songsList, setSongsList] = useState()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",

    };

    useEffect(() => {
        fetch(`https://saavn.dev/api/artists/485956/albums`, requestOptions)
            .then(response => response.json())
            .then(result => setSongsList(result.data.albums))
            .catch(error => console.log('error', error));
    }, [])

    // songsList.map((data) => console.log(data.image[2].url))
    return (
        <View >
            <WelcomeHeader></WelcomeHeader>
            <UserNameAndSearchBar></UserNameAndSearchBar>
            <Text style={{ fontSize: 24, fontWeight: "bold", paddingTop: 20, paddingLeft: 15, paddingBottom: 6 }}>Honey Singh</Text>
            <FlatList style={{ display: "flex", flexDirection: "row" }} horizontal={true} showsHorizontalScrollIndicator={false}
                data={songsList}
                renderItem={({ item }) => 
                (<View style={{ paddingHorizontal: 10 }}>
                    <TouchableOpacity onPress={() => console.log("albumID", item.id)}>
                        <Image style={{ width: 150, height: 150 }} source={{ uri: item.image[2].url }} ></Image>
                        <Text style={{ width: 100, fontWeight: "bold", fontSize: 16 }}>
                            {item.name}
                        </Text>
                        <Text style={{ width: 100 }}>
                            {item.artists.primary[0].name}
                        </Text>
                    </TouchableOpacity>
                </View>)} >
            </FlatList>
        </View>
    )
}