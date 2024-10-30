import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { ModalVisibility } from '../Context/ModalVisibility';

export default function FloatingCurrentMusic() {

  const{modalVisible, setModalVisible} = useContext(ModalVisibility);

  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={()=> {setModalVisible(true)}} style={style.floatingPlayer}>
      <View style={style.musicImage}>
        <Image style={{ width: "90%", height: "90%" }} source={require('../Assets/Img/music-wellcome.png')} ></Image>
      </View>
      <View style={style.musicNameIcons}>
        <View>
          <Text style={{ fontSize: 18, paddingStart: 10 }}>Name</Text>
          <Text style={{ fontSize: 12, paddingStart: 10 }}>Artist</Text>
        </View>
        <View style={style.musicIcons}>
          <FontAwesome5 style={{paddingHorizontal:10}} name="step-backward" size={24} color="black" />
          <FontAwesome5 style={{paddingHorizontal:10}} name="play" size={24} color="black" />
          <FontAwesome5 style={{paddingHorizontal:10}} name="step-forward" size={24} color="black" />
        </View>
      </View>
    </TouchableOpacity>
  )
}

const style = StyleSheet.create({
  floatingPlayer: {
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  musicImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 4,
    backgroundColor: "black",
    width: 60,
    height: 60,
    borderRadius: 10,
    marginVertical: 10
  },
  musicNameIcons:{
    display:"flex",
    justifyContent:"space-between",
    alignItems:"center",
    flexDirection:"row",
    width:"70%"
  },
  musicIcons:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    flexDirection:"row",
  }
})
