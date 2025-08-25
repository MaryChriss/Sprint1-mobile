import { Button } from "react-native";
// Importando os pacotes necessários
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// Importando as telas que serão exibidas
import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import MainTabs from "./components/MainTabs";
// Criando nossa Stack de navegação
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
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
