import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import FlashMessage from 'react-native-flash-message';

export default function App() {
  return (
    <>
      <RootNavigator />
      <StatusBar style="light" />
      <FlashMessage position="top" />
    </>
  );
}
