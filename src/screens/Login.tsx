import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ImageBackground, Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const loadSavedData = async () => {
      const data = await AsyncStorage.getItem('userData');
      if (data) {
        const user = JSON.parse(data);
        setEmail(user.email);
        setPassword(user.password); // pré-preenche para facilitar teste
      }
    };
    loadSavedData();
  }, []);

  const handleLogin = async () => {
    const data = await AsyncStorage.getItem('userData');
    if (data) {
      const user = JSON.parse(data);
      if (user.email === email && user.password === password) {
        navigation.navigate('Home');
      } else {
        Alert.alert("Erro", "Email ou senha incorretos.");
      }
    } else {
      Alert.alert("Erro", "Nenhum usuário cadastrado.");
    }
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
            <TextInput label="Email" mode="outlined" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput label="Senha" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>

          <Text style={styles.buttonText} onPress={() => navigation.navigate('Register')}>
            Não tem cadastro? Cadastre-se
          </Text>
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
