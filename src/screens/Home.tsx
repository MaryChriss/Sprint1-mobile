import {Image, StyleSheet, Text, View } from "react-native";
import Dropdown from "../../components/listDropdown/dropdown";
import Header from "../../components/header/header";
import MapaMotos from "../../components/mapa/mapa";

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

});