import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from 'react-native';
import Configuration from "../screens/Configuration";
import BottomTabsNavigator from "./BottomTabsNavigator";


export type RootStackParamList = {
  Home: undefined;
  Configuration: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={BottomTabsNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Configuration" component={Configuration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3d2929',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
