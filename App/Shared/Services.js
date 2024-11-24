import AsyncStorage from "@react-native-async-storage/async-storage";

const setUserAuth = async(value)=>{
    await AsyncStorage.setItem('userData', JSON.stringify(value));
}

const getUserAuth = async()=>{
    const value = await AsyncStorage.getItem('userData');
    return JSON.parse(value);
}

const Logout = ()=>{
    AsyncStorage.clear();
}

const setFavoriteMusicsList = async(value)=>{
    await AsyncStorage.setItem('favorite',JSON.stringify(value))
}

const getFavoriteMusicsList = async()=>{
    const value = await AsyncStorage.getItem('favorite');
    return JSON.parse(value);
}

const setIndexValue = async(value)=>{
    await AsyncStorage.setItem('index',JSON.stringify(value))
}
const getIndexValue = async()=>{
    const value = await AsyncStorage.getItem('index');
    return JSON.parse(value);
}

const setLastSession = async(value)=>{
    await AsyncStorage.setItem('lastSession',JSON.stringify(value))
}
const getLastSession = async()=>{
    const value = await AsyncStorage.getItem('lastSession');
    return JSON.parse(value);
}

export default {
    setUserAuth,
    getUserAuth,
    Logout,
    setFavoriteMusicsList,
    getFavoriteMusicsList,
    setIndexValue,
    getIndexValue,
    setLastSession,
    getLastSession
}