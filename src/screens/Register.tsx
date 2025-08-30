import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import InputField from "../components/InputField";

export default function Register() {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      showMessage({
        message: "Erro",
        description: "Preencha todos os campos.",
        type: "danger",
      });
      return;
    }

    if (!validateEmail(email)) {
      showMessage({
        message: "Erro",
        description: "Digite um email válido.",
        type: "danger",
      });
      return;
    }

    const userData = { name, email, password };
    await AsyncStorage.setItem("userData", JSON.stringify(userData));

    showMessage({
      message: "Sucesso",
      description: "Cadastro realizado com sucesso.",
      type: "success",
    });
    setName("");
    setEmail("");
    setPassword("");
    navigation.navigate("Login");
  };

  return (
    <ImageBackground
      source={require("../../assets/wppLogin.png")}
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

            <InputField
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
            />
            <InputField
              placeholder="Senha"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Cadastre-se</Text>
          </TouchableOpacity>

          <Text
            style={styles.buttonText}
            onPress={() => navigation.navigate("Login")}
          >
            Já tem cadastro? Faça login
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    color: "#2E9936",
  },
  container: {
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  containerPhases: {
    marginTop: -90,
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 40,
  },
  titleHighlight: {
    color: "#34c43d",
    fontWeight: "bold",
  },
  subtitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    marginTop: 8,
  },
  loginContainer: {
    marginTop: 180,
  },
  loginLabel: {
    color: "#fff",
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  containereverything: {
    marginBottom: -90,
  },
  input: {
    marginBottom: -10,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2E9936",
    borderRadius: 15,
    width: "50%",
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
