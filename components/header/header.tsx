
import {Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";

export default function Header() {
    const navigation = useNavigation<any>();
    
    return (
        <View style={styles.container}>
            <View style={styles.name}>
            <Image source={require('../../assets/logo.png')}/>
            <Text style={styles.title}>Future Stack</Text>
            
            </View>

            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <MaterialIcons name="logout" size={24} color="#1ead27" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
      name: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    container: {
        marginTop: 20,
        width: '100%',
        height: 60,
        backgroundColor: '#242424',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        justifyContent: 'space-between',
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 10,
    },
    title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
