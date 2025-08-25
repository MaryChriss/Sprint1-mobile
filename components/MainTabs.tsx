import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Entypo from "@expo/vector-icons/Entypo";
import Configuration from "../src/screens/Configuration";
import Search from "../src/screens/Search";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Home from "../src/screens/Home";
const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#2E9936",
        tabBarInactiveTintColor: "#999",
        tabBarLabelStyle: {
          borderTopWidth: 0,
          height: 80,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          switch (route.name) {
            case "Home":
              iconName = <Entypo name="home" size={size} color={color} />;
              break;
            case "Configuration":
              iconName = <FontAwesome5 name="cog" size={size} color={color} />;
              break;
          }
          return iconName;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Tab.Screen
        name="Configuration"
        component={Configuration}
        options={{ title: "Configuration" }}
      />
    </Tab.Navigator>
  );
}
