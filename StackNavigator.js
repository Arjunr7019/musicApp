import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./App/Pages/Home";
import SearchArea from "./App/Components/SearchArea";
import PlayListLibrary from "./App/Pages/PlayListLibrary";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from "@react-navigation/native";
// import Ionicons from '@expo/vector-icons/Ionicons';
import ProfilePage from "./App/Pages/ProfilePage";
import FloatingCurrentMusic from "./App/Components/FloatingCurrentMusic";
import { useContext } from "react";
import { ModalVisibility } from "./App/Context/ModalVisibility";
import { BottomModal } from "react-native-modals";
import { ModalContent } from "react-native-modals";
import { Pressable, View, Text, StyleSheet, Image } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CurrentMusic } from "./App/Context/CurrentMusic";
import { MusicController } from "./App/Context/MusicController";

const Tab = createBottomTabNavigator();

function BottomTabs() {

    const { modalVisible, setModalVisible } = useContext(ModalVisibility)
    const { currentMusicData } = useContext(CurrentMusic)
    const {musicControllerData, setMusicControllerData} = useContext(MusicController);

    return (
        <>
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: "#FFAAA2",
                    tabBarInactiveTintColor: "white",
                    tabBarHideOnKeyboard: true
                }}>
                <Tab.Screen
                    name="Home"
                    component={Home}
                    options={{
                        tabBarLabel: "Home",
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ?
                                (
                                    <AntDesign name="home" size={30} color="#FFAAA2" />
                                )
                                :
                                (
                                    <AntDesign name="home" size={30} color="black" />
                                )
                    }}
                />
                <Tab.Screen
                    name="Search"
                    component={SearchArea}
                    options={{
                        tabBarLabel: "Search",
                        headerShown: false,
                        tabBarIcon: ({ focused }) =>
                            focused ?
                                (
                                    <AntDesign name="search1" size={30} color="#FFAAA2" />
                                )
                                :
                                (
                                    <AntDesign name="search1" size={30} color="black" />
                                )
                    }}
                />
                <Tab.Screen
                    name="Library"
                    component={PlayListLibrary}
                    options={{
                        tabBarLabel: "Library",
                        headerShown: true,
                        headerTitleAlign: "center",
                        // headerLeft: ()=> <Ionicons name="arrow-back" size={30} color="black" />,
                        tabBarIcon: ({ focused }) =>
                            focused ?
                                (
                                    <MaterialCommunityIcons name="playlist-music-outline" size={30} color="#FFAAA2" />
                                )
                                :
                                (
                                    <MaterialCommunityIcons name="playlist-music-outline" size={30} color="black" />
                                )
                    }}
                />
            </Tab.Navigator>
            {currentMusicData?.songSelected ? <FloatingCurrentMusic />:<></>}
            <BottomModal
                visible={modalVisible} onSwipeOut={() => setModalVisible(false)} swipeDirection={["up", "down"]} swipeThreshold={200}>
                <ModalContent style={{ height: "100%", width: "100%" }}>
                    <View style={style.currentMusicScreen}>
                        <Pressable style={style.PressableIcon} onPress={() => setModalVisible(false)}>
                            <Entypo name="chevron-down" size={24} color="black" />
                        </Pressable>
                        {/* <View style={{ marginVertical: "auto" }}>
                            <Text style={{ fontSize: 20, fontWeight:"bold" }}>CurrentSong</Text>
                        </View> */}
                        <View style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <Pressable style={style.PressableIcon}>
                                <Entypo name="share" size={24} color="black" />
                            </Pressable>
                            <Pressable style={style.PressableIcon}>
                                <Entypo name="dots-three-vertical" size={24} color="black" />
                            </Pressable>
                        </View>
                    </View>
                    <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "column", height: "90%", paddingTop: 10 }}>
                        <View style={{ width: "100%" }}>
                            <Image style={{ width: 350, height: 350, borderRadius: 10 }} source={{uri:currentMusicData?.image}} />
                            <Text style={{ textAlign: "center", fontSize: 30, fontWeight: "bold" }}>{currentMusicData?.name}</Text>
                            <Text style={{ textAlign: "center", fontWeight: "bold" }}>{currentMusicData?.artist}</Text>
                        </View>
                        <View style={{ width: "100%" }}>
                            <View>
                                <View style={{ width: "100%", marginTop: 10, height: 3, backgroundColor: "gray", borderRadius: 5 }}>
                                    <View style={[style.progressBar, { width: `${(musicControllerData?.position/musicControllerData?.duration) * 100}%` }]} />
                                    <View style={[style.progressCircle, { left: `${(musicControllerData?.position/musicControllerData?.duration) * 100}%`, marginLeft: -12 / 2 }]} />
                                </View>
                            </View>
                            <View style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", paddingVertical: 5 }}>
                                <Text style={{ fontWeight: "bold" }}>{musicControllerData?.currentTime}</Text>
                                <Text style={{ fontWeight: "bold" }}>{musicControllerData?.totalDuration}</Text>
                            </View>
                        </View>
                        <View style={{ width: "100%", display: "flex", justifyContent: "space-evenly", alignItems: "center", flexDirection: "row", }}>
                            <Pressable>
                                <FontAwesome5 style={{ paddingHorizontal: 10 }} name="step-backward" size={30} color="black" />
                            </Pressable>
                            <Pressable onPress={musicControllerData?.isPlaying ? musicControllerData?.pauseSound : musicControllerData?.playSound}>
                                <View style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "black", padding: 30, borderRadius: 80 }}>
                                    <FontAwesome5 name={musicControllerData?.isPlaying?"pause":"play"} size={30} color="white" />
                                </View>
                            </Pressable>
                            <Pressable>
                                <FontAwesome5 style={{ paddingHorizontal: 10 }} name="step-forward" size={30} color="black" />
                            </Pressable>
                        </View>
                        <View style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexDirection: "row", }}>
                            <Pressable>
                                <Ionicons style={{ paddingHorizontal: 10 }} name="heart-outline" size={30} color="black" />
                            </Pressable>
                            <Pressable>
                                <Ionicons style={{ paddingHorizontal: 10 }} name="download-outline" size={30} color="black" />
                            </Pressable>
                        </View>
                    </View>
                </ModalContent>
            </BottomModal>
        </>
    )
}

const Stack = createNativeStackNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={ProfilePage} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const style = StyleSheet.create({
    currentMusicScreen: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        marginTop: 12
    },
    PressableIcon: {
        padding: 10,
        borderRadius: 10,
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#FFADA2"
    },
    progressCircle: {
        position: "absolute",
        top: -5,
        width: 12,
        height: 12,
        borderRadius: 12 / 2,
        backgroundColor: "#FFADA2"
    }
})

export default Navigation