import { useNavigation } from "@react-navigation/native";
import React from "react";
import { ImageBackground, Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { TextInput } from 'react-native-paper';

export default function Login() {
  const [text, setText] = React.useState("");
const navigation = useNavigation<any>();
  const [name, setName] = React.useState('');
const [email, setEmail] = React.useState('');
const [password, setPassword] = React.useState('');

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
          <Text style={styles.loginLabel}>Cadastre-se:</Text>

          <TextInput
  label="Nome"
  value={name}
  onChangeText={text => setName(text)}
  style={styles.input}
/>

<TextInput
  label="Email"
  value={email}
  onChangeText={text => setEmail(text)}
  style={styles.input}
/>

<TextInput
  label="Senha"
  secureTextEntry
  value={password}
  onChangeText={text => setPassword(text)}
  style={styles.input}
/>

        </View>

        <View>
            <TouchableOpacity
  style={styles.button}
  onPress={() => {
    console.log('Cadastro realizado:', { name, email, password });
    setName('');
    setEmail('');
    setPassword('');
  }}
>
  <Text style={styles.buttonText}>Cadastre-se</Text>
</TouchableOpacity>


            <Text style={styles.buttonText} onPress={() => navigation.navigate('Login')}>Já tem cadastro? Faça login</Text>
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
    marginTop: -90,
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
    marginTop: 180,
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
