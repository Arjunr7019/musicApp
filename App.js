import { StyleSheet, Text, View } from 'react-native';
import Login from './App/Pages/Login';
import { AuthContext } from './App/Context/AuthContext';
import { useEffect, useState } from 'react';
import Home from './App/Pages/Home';
import Services from './App/Shared/Services';

export default function App() {
  const [userData, setUserData] = useState()
  useEffect(() => {
    Services.getUserAuth().then(res=>{
      console.log(res);
      res?setUserData(res):setUserData(null);
    })
  }, [])

  return (
    <View>
      <AuthContext.Provider value={{ userData, setUserData }}>
        {userData?<Home />:<Login/>}
      </AuthContext.Provider>
    </View>
  );
}
