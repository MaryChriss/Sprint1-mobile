import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

export default function Login() {
  const [text, setText] = React.useState("");
const navigation = useNavigation<any>();

useEffect(() => {
  // Quando a tela carregar, buscamos o email salvo anteriormente
  const loadEmail = async () => {
    const savedEmail = await AsyncStorage.getItem('userEmail');
    if (savedEmail) {
      setText(savedEmail); // mostra o email salvo no campo
    }
  };
  loadEmail();
}, []);

const handleLogin = async () => {
  await AsyncStorage.setItem('userEmail', text); // salva o email
  navigation.navigate('Home'); // navega após login
};

  return (
    <ImageBackground
      source={require('../../assets/wppLogin.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.containerPhases}>
          <Text style={styles.title}>
            Bem-vindo ao{"\n"}
            <Text style={styles.titleHighlight}>Future Stack</Text>
          </Text>

          <Text style={styles.subtitle}>
            seu aplicativo para localizar {"\n"}sua moto com agilidade
          </Text>
        </View>

<View style={styles.containereverything}>
     <View style={styles.loginContainer}>
          <Text style={styles.loginLabel}>Login:</Text>

          <TextInput
            label="Email"
            mode="outlined"
            value={text}
            onChangeText={text => setText(text)}
            style={styles.input}
          />

          <TextInput
            label="Senha"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <View>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
  <Text style={styles.buttonText}>Entrar</Text>
</TouchableOpacity>


            <Text style={styles.buttonText} onPress={() => navigation.navigate('Register')}>Não tem cadastro? Cadastre-se</Text>
        </View>
</View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    color: '#2E9936',
  },
  container: {
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  containerPhases: {
    marginTop: -150,
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 40,
  },
  titleHighlight: {
    color: '#34c43d',
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    marginTop: 8,
  },
  loginContainer: {
    marginTop: 200,
  },
  loginLabel: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  containereverything: {
    marginBottom: -100,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  button: {
  marginTop: 20,
  backgroundColor: '#2E9936',
  borderRadius: 15,
  width: '50%',
  paddingVertical: 10,
  alignItems: 'center',
  justifyContent: 'center',
    alignSelf: 'center',
marginBottom: 20,
},
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
}

});
