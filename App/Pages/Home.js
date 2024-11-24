import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import WelcomeHeader from '../Components/WelcomeHeader';
import UserNameAndSearchBar from '../Components/UserNameAndSearchBar';
import Services from '../Shared/Services';
import { CurrentMusic } from '../Context/CurrentMusic';

export default function Home() {
    const { userData, setUserData } = useContext(AuthContext);
    const { currentMusicData, setCurrentMusicData } = useContext(CurrentMusic);
    const [lastSession, setLastSession] = useState()

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
        method: "get",
        headers: myHeaders,
        redirect: "follow",

    };

    useEffect(() => {
        // fetch(`https://saavn.dev/api/artists/485956/albums`, requestOptions)
        //     .then(response => response.json())
        //     .then(result => setLastSession(result.data.albums))
        //     .catch(error => console.log('error', error));

        Services.getLastSession().then(res => {
            if(res){
                setLastSession(res)
            }else{
                setLastSession(null)
            }
        })
    }, [])
    useEffect(()=>{
        if(lastSession){
            let add = lastSession;
            add.push(currentMusicData);
            setLastSession(add);
            Services.getLastSession().then(res =>{
                res ? Services.setLastSession(add) : Services.setLastSession(add);
            })
        }else{
            Services.getLastSession().then(res =>{
                res ? Services.setLastSession([currentMusicData]) : Services.setLastSession([currentMusicData]);
            })
        }
    },[currentMusicData])

    const chunkData = (data, size) => {
        return data?.reduce((chunks, item, index) => {
            const chunkIndex = Math.floor(index / size);
            if (!chunks[chunkIndex]) {
                chunks[chunkIndex] = []; // Start a new chunk
            }
            chunks[chunkIndex].push(item);
            return chunks;
        }, []);
    };

    const chunkedData = chunkData(lastSession, 3);
    // lastSession.map((data) => console.log(data.image[2].url))
    return (
        <View>
            <WelcomeHeader />
            <UserNameAndSearchBar />
            <Text style={{ fontSize: 24, fontWeight: 'bold', paddingTop: 20, paddingLeft: 15, paddingBottom: 6 }}>
                Last Session
            </Text>
            {lastSession ? <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={chunkedData}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'column', marginHorizontal: 10 }}>
                        {item.map((album, idx) => (
                            <TouchableOpacity
                                key={idx}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginVertical: 10,
                                }}
                            >
                                <Image
                                    style={{ width: 50, height: 50, borderRadius: 10 }}
                                    source={{ uri: album?.image }}
                                />
                                <View style={{ paddingStart: 5 }}>
                                    <Text
                                        numberOfLines={1}
                                        style={{ width: 100, fontWeight: 'bold', fontSize: 16 }}
                                    >
                                        {album?.name}
                                    </Text>
                                    <Text numberOfLines={1} style={{ width: 100 }}>
                                        {album?.artist || 'Unknown'}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            /> :
                <View>
                    <Text style={{ textAlign: "center", fontSize: 15, fontWeight: "bold", color: "gray" }}>lastSession is empty</Text>
                </View>}
        </View>
    )
}