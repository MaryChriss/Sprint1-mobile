import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import HomeStackNavigator from "./HomeStackNavigator";
import Configuration from "../screens/Configuration";
import Search from "../screens/Search";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Home") {
            return <Entypo name="home" size={size} color={color} />;
          } else if (route.name === "Configuration") {
            return <FontAwesome5 name="cog" size={size} color={color} />;
          } else if (route.name === "Search") {
            return (
              <FontAwesome6 name="magnifying-glass" size={size} color={color} />
            );
          }
        },
        tabBarActiveTintColor: "#2E9936",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#242424",
          borderTopWidth: 0,
          height: 80,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Configuration" component={Configuration} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  );
}
