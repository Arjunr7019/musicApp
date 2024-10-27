import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';

export default function PlayListLibrary() {
  return (
    <View style={style.LibraryCardConatiner}>
      <View style={style.LibraryCard}>
        <Fontisto name="heart" size={26} color="black" />
        <Text style={{ fontWeight: "medium", fontSize: 24, marginHorizontal:10 }}>Fevorites</Text>
      </View>
      <View style={style.LibraryCard}>
        <Feather name="download" size={26} color="black" />
        <Text style={{ fontWeight: "medium", fontSize: 24, marginHorizontal:10 }}>Downloads</Text>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  LibraryCardConatiner:{
    display: "flex", 
    justifyContent: "center", 
    alignItems: "start", 
    flexDirection: "column",
    paddingHorizontal: 30,
  },
  LibraryCard:{
    display: "flex", 
    justifyContent: "start", 
    alignItems: "center", 
    flexDirection: "row",
    marginTop: 20
  }
})