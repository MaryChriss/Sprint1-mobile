import {Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dropdown from "../../components/listDropdown/dropdown";
import Header from "../../components/header/header";
import MapaMotos from "../../components/mapa/mapa";
import { useNavigation } from "@react-navigation/native";
import React from "react";

export default function Home() {
    return (
        <View style={styles.container}>
            <Header />
        
            <Dropdown /> 
            <View>
                <Text style={styles.filialTitle}>Mapa de Vagas:</Text>
                <MapaMotos />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    filialTitle: {
        color: '#fff',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 150,
        marginLeft: 40,
    },
    container: {
        flex: 1,
        backgroundColor: '#242424',
    },
    search: {
  position: 'absolute',
  bottom: 30, // distância do fundo da tela
  right: 20, // distância da borda direita
  backgroundColor: '#13c431',
  width: 60,
  height: 60,
  borderRadius: 30,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5, // sombra no Android
  shadowColor: '#000', // sombra no iOS
  shadowOpacity: 0.3,
  shadowOffset: { width: 0, height: 2 },
  shadowRadius: 4,
},


});