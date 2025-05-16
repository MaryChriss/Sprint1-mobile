import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Configuration from "../screens/Configuration";

const Tab = createBottomTabNavigator();

export default function BottomTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === "Home") {
            const iconName = focused ? "home-sharp" : "home-outline";
            return <Ionicons name={iconName} size={size} color={color} />;
          } else if (route.name === "Configuration") {
            return <FontAwesome5 name="cog" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: "#2E9936",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#242424",
          borderTopWidth: 0,
          height: 80,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Tab.Screen name="Configuration" component={Configuration} options={{ headerShown: false }} />
    </Tab.Navigator>
  );
}
