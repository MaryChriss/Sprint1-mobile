import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme as NavDarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Search from "./src/screens/Search";
import MainTabs from "./src/components/MainTabs";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";
import Profile from "./src/screens/Profile";
import { createContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Themes from "./src/screens/Themes";
import { navigationRef } from "./src/services/RootNavigation";

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#2E9936",
    background: "#F2F2F7",
    card: "#FFFFFF",
    text: "#111827",
    border: "rgba(0,0,0,0.06)",
  },
};

const Dark = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    primary: "#2E9936",
    background: "#1f1f1f",
    card: "#111111",
    text: "#F5F5F5",
    border: "rgba(255,255,255,0.12)",
  },
};

export const AppContext = createContext<{
  value: string;
  setValue: (val: string) => void;
}>({
  value: "",
  setValue: () => {},
});

export default function App() {
  const [value, setValueState] = useState("0");
  const load = async () => {
    const storedTheme = await AsyncStorage.getItem("theme");
    setValueState(storedTheme ?? "0");
  };

  const themeObj = Number(value) === 1 ? Dark : Light;

  useEffect(() => {
    load();
  }, []);

  const setValue = async (val: string) => {
    setValueState(val);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AppContext.Provider value={{ value, setValue }}>
          <NavigationContainer ref={navigationRef} theme={themeObj}>
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
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Themes"
                component={Themes}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </AppContext.Provider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
