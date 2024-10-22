import { View, Text, Button } from 'react-native'
import React, { useContext } from 'react';
import Services from '../Shared/Services';
import { AuthContext } from '../Context/AuthContext';
import WelcomeHeader from '../Components/WelcomeHeader';
import UserNameAndSearchBar from '../Components/UserNameAndSearchBar';

export default function Home() {
    const { userData, setUserData } = useContext(AuthContext);

    return (
        <View>
            <WelcomeHeader></WelcomeHeader>
            <UserNameAndSearchBar></UserNameAndSearchBar>
            <Button title='Logout' onPress={() => { Services.Logout(); setUserData(null) }}></Button>
        </View>
    )
}