import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Pages/Login';
import { AuthContext } from './App/Context/AuthContext';
import { useEffect, useState } from 'react';
import Services from './App/Shared/Services';
import Navigation from './StackNavigator';
import { ModalVisibility } from './App/Context/ModalVisibility';
import { ModalPortal } from 'react-native-modals';

export default function App() {
  const [userData, setUserData] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  useEffect(() => {
    Services.getUserAuth().then(res => {
      console.log(res);
      res ? setUserData(res) : setUserData(null);
    })
  }, [])

  return (
    <>
      <ModalVisibility.Provider value={{ modalVisible, setModalVisible }}>
        <AuthContext.Provider value={{ userData, setUserData }}>
          {userData ? <>
            <Navigation />
            <ModalPortal />
          </> : <Login />}
        </AuthContext.Provider>
      </ModalVisibility.Provider>
    </>
  );
}