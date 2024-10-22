import { StyleSheet, TouchableOpacity, View, Text, SafeAreaView, TextInput } from 'react-native'
import React, {useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import Services from '../Shared/Services';

export default function LoginSignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [login, setLogin] = useState(true);
    const{userData,setUserData}=useContext(AuthContext);

    const userInfo = {
        "name":name,
        "email":email,
        "password":password
    }

    const setUserInfo = async()=>{
        setUserData(userInfo);
        await Services.setUserAuth(userInfo);
    }

    return (
        <View style={{ backgroundColor: 'white', borderTopRightRadius: 35, borderTopLeftRadius: 35, width:"100%" }}>
            <Text style={style.text}>{login ? "Login" : "Sign Up"}</Text>
            <SafeAreaView style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", }}>
                {login ? <></> : <TextInput value={name} onChangeText={setName} placeholder='Name' style={style.inputForm} />}
                <TextInput value={email} onChangeText={setEmail} placeholder='Email' style={style.inputForm} />
                <TextInput value={password} onChangeText={setPassword} placeholder='Password' style={style.inputForm} />
                <TouchableOpacity onPress={() => login ? setLogin(false) : setLogin(true)}>
                    <Text style={{ marginTop: 10 }}>{login ? "Don't have Account" : "Already have an Account"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={setUserInfo}>
                    <View style={style.LoginSignUpbutton}>
                        <Text style={style.buttonText}>{login ? "Login" : "Sign Up"}</Text>
                    </View>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    )
}

const style = StyleSheet.create({
    image: {
        width: "100%",
        resizeMode: 'cover',
        marginBottom: -150
    },
    text: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: "center",
        marginVertical: 20
    },
    LoginSignUpbutton: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        backgroundColor: "#FFADA2",
        borderRadius: 15,
        marginTop: 20
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'semibold',
        textAlign: "center",
        color: "white"
    },
    inputForm: {
        height: 50,
        width: '80%',
        borderWidth: 1,
        borderRadius: 30,
        paddingHorizontal: 15,
        marginBottom: 10
    }
})