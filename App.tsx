import { Button } from "react-native";
import { NavigationContainer, DefaultTheme} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import MainTabs from "./components/MainTabs";

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer theme={{...DefaultTheme, colors: {...DefaultTheme.colors, background: 'white', primary: '#EB4435'}}}>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{ title: "Buscar" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
