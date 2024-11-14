import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Pages/Login';
import { AuthContext } from './App/Context/AuthContext';
import { useEffect, useState } from 'react';
import Services from './App/Shared/Services';
import Navigation from './StackNavigator';
import { ModalVisibility } from './App/Context/ModalVisibility';
import { ModalPortal } from 'react-native-modals';
import { CurrentMusic } from './App/Context/CurrentMusic';
import { MusicController } from './App/Context/MusicController';
import { FavoriteMusicContext } from './App/Context/FavoriteMusicContext';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [userData, setUserData] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [currentMusicData, setCurrentMusicData] = useState()
  const [musicControllerData, setMusicControllerData] = useState()
  const [favorites, setFavorites] = useState()

  useEffect(() => {
    Services.getUserAuth().then(res => {
      res ? setUserData(res) : setUserData(null);
    })
    Services.getFavoriteMusicsList().then(res => {
      res ? setFavorites(res) : setFavorites([]);
    })
  }, [])

  return (
    <>
      <FavoriteMusicContext.Provider value={{favorites, setFavorites}}>
        <MusicController.Provider value={{ musicControllerData, setMusicControllerData }}>
          <CurrentMusic.Provider value={{ currentMusicData, setCurrentMusicData }}>
            <ModalVisibility.Provider value={{ modalVisible, setModalVisible }}>
              <AuthContext.Provider value={{ userData, setUserData }}>
                {userData ? <>
                  <StatusBar style="dark"/>
                  <Navigation />
                  <ModalPortal />
                </>
                  : <Login />}
              </AuthContext.Provider>
            </ModalVisibility.Provider>
          </CurrentMusic.Provider>
        </MusicController.Provider>
      </FavoriteMusicContext.Provider>
    </>
  );
}