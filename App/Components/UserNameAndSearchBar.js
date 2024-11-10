import { View, Text, TextInput } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';

export default function UserNameAndSearchBar() {
    const { userData, setUserData } = useContext(AuthContext);

    // const [searchValue, setSearchValue] = useState('')


    return (
        <View style={{ paddingHorizontal: 20, paddingVertical: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row' }}>
            <View style={{ width: "30%" }}>
                <Text>Hello</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{userData?.name}</Text>
            </View>
            {/* <View style={{ width: "70%" }}>
                <TextInput style={{ height: 40, width: "100%", borderWidth: 1, borderRadius: 30, paddingHorizontal: 15 }} onChangeText={setSearchValue} value={searchValue} placeholder='Search' />
            </View> */}
        </View>
    )
}