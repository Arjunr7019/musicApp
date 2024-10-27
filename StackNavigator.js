import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./App/Pages/Home";
import PlayListLibrary from "./App/Pages/PlayListLibrary";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from "@react-navigation/native";
// import Ionicons from '@expo/vector-icons/Ionicons';
import ProfilePage from "./App/Pages/ProfilePage";

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator 
        screenOptions={{
            tabBarActiveTintColor: "#FFAAA2",  
            tabBarInactiveTintColor: "white",  
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
                    headerTitleAlign:"center",
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
    )
}

const Stack = createNativeStackNavigator();

function Navigation(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Main" component={BottomTabs} options={{headerShown:false}}/>
                <Stack.Screen name="Profile" component={ProfilePage} options={{headerShown:true}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation