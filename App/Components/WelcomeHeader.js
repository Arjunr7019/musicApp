import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Feather from '@expo/vector-icons/Feather';
import Services from '../Shared/Services';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeHeader() {
    const { userData, setUserData } = useContext(AuthContext);
    
    const navigation = useNavigation();

    return (
        <View style={{ paddingTop: 50, paddingHorizontal: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <SimpleLineIcons name="menu" size={24} color="black" />
            <TouchableOpacity onPress={()=> navigation.navigate("Profile")}>
                <View style={{ padding: 6, backgroundColor: 'black', borderRadius: 30 }}>
                    <Feather name="user" size={24} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    )
}