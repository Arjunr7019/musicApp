import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import Services from '../Shared/Services';

export default function ProfilePage() {
    const { userData, setUserData } = useContext(AuthContext);

    return (
        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", paddingVertical: 20, paddingHorizontal: 20 }}>
            <View style={{ padding: 6, backgroundColor: 'black', borderRadius: 30 }}>
                <Feather name="user" size={50} color="white" />
            </View>
            <Text style={{ fontSize: 24, textAlign: "left", width: "100%", marginTop: 10 }}>{"Name:" + userData?.name}</Text>
            <Text style={{ fontSize: 24, textAlign: "left", width: "100%", marginTop: 10 }}>{"Email:" + userData?.email}</Text>
            <TouchableOpacity onPress={() => { Services.Logout(); setUserData(null) }}>
                <View style={style.LogoutButton}>
                    <Text style={style.LogoutText}>Logout</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    LogoutButton: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: "#FFADA2",
        borderRadius: 15,
        marginTop: 20
    },
    LogoutText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'semibold',
        textAlign: "center",
        color: "white"
    },
})