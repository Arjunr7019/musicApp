import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';

export default function WelcomeHeader() {
    const { userData, setUserData } = useContext(AuthContext);

    return (
        <View style={{ paddingTop: 50, paddingHorizontal: 20, display:'flex', justifyContent:'space-between',alignItems:'center',flexDirection:'row' }}>
            <SimpleLineIcons name="menu" size={24} color="black" />
            <View style={{padding:6, backgroundColor:'black', borderRadius:30}}>
                <Feather name="user" size={24} color="white" />
            </View>
            {/* <Text>Hello</Text>
      <Text style={{fontSize:20, fontWeight:'bold'}}>{userData?.name}</Text> */}

        </View>
    )
}