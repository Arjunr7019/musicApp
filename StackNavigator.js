import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./App/Pages/Home";
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
import { Pressable } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

const Tab = createBottomTabNavigator();

function BottomTabs() {

    const { modalVisible, setModalVisible } = useContext(ModalVisibility)
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
            <FloatingCurrentMusic />
            <BottomModal
                visible={modalVisible} onHardwareBackPress={() => setModalVisible(false)} swipeDirection={["up", "down"]} swipeThreshold={200}>
                <ModalContent style={{ height: "100%", width: "100%" }}>
                    <Pressable style={{ padding: 10,backgroundColor:"#e0e0e0", borderRadius:10 }} onPress={() => setModalVisible(false)}>
                        <Entypo name="chevron-down" size={24} color="black" />
                    </Pressable>
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

export default Navigation