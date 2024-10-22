import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import LoginSignUp from '../Components/LoginSignUp';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Login() {
    const [loginForm, setLoginForm] = useState(false);

    return (
        <View style={{display:'flex', justifyContent:"center",alignItems:"center", flexDirection:"column"}}>
            <View style={{ width: "100%" }}>
                <Image style={loginForm ? style.LoginSignUpFormimage : style.image} source={require('../Assets/Img/music-wellcome.png')}></Image>
            </View>
            {loginForm ? <LoginSignUp></LoginSignUp> :
                <View>
                    <Text style={style.text}>Welcome to Music App</Text>
                    <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", marginTop: 60 }}>
                        <TouchableOpacity onPress={() => loginForm ? setLoginForm(false) : setLoginForm(true)}>
                            <Text style={style.loginSignUpButton}>Login/Sign Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={style.googleSignInContainer}>
                                <AntDesign name="google" size={24} color="white" />
                                <Text style={style.googleSignIn}>Sign in with Google</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>}
            {loginForm?<TouchableOpacity onPress={() => loginForm ? setLoginForm(false) : setLoginForm(true)}>
                <View style={style.BackButton}>
                    <Ionicons style={{textAlign:'center'}} name="arrow-back" size={24} color="white" />
                </View>
            </TouchableOpacity>:<></>}
        </View>
    )
}

const style = StyleSheet.create({
    image: {
        width: "100%",
        resizeMode: 'cover'
    },
    LoginSignUpFormimage: {
        width: "100%",
        resizeMode: 'cover',
        marginBottom: -150
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: "center"
    },
    loginSignUpButton: {
        fontSize: 20,
        fontWeight: 'semibold',
        textAlign: "center"
    },
    googleSignInContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: "#FFADA2",
        borderRadius: 15,
        marginTop: 20
    },
    BackButton:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        backgroundColor: "#FFADA2",
        borderRadius: 15,
        marginTop: 20,
        padding:15
    },
    googleSignIn: {
        fontSize: 20,
        fontWeight: 'semibold',
        textAlign: "center",
        color: "white",
        marginLeft: 10
    }
})