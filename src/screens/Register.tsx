import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ImageBackground,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import InputField from "../components/InputField";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function Register() {
  const navigation = useNavigation<any>();

  const [step, setStep] = useState<0 | 1>(0);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (v: string) => /\S+@\S+\.\S+/.test(v);
  const validatePhone = (v: string) => /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/.test(v);

  const goNext = () => {
    if (!name || !phone) {
      showMessage({
        message: "Complete seus dados",
        description: "Preencha Nome e Telefone antes de continuar.",
        type: "warning",
      });
      return;
    }
    if (!validatePhone(phone)) {
      showMessage({
        message: "Telefone inválido",
        description: "Formato esperado: (11) 99999-0000",
        type: "danger",
      });
      return;
    }
    setStep(1);
  };

  const handleRegister = async () => {
    if (!email || !password) {
      showMessage({
        message: "Complete seus dados",
        description: "Preencha Email e Senha.",
        type: "warning",
      });
      return;
    }
    if (!validateEmail(email)) {
      showMessage({
        message: "Email inválido",
        description: "Digite um email válido.",
        type: "danger",
      });
      return;
    }

    const userData = { name, phone, email, password };
    await AsyncStorage.setItem("userData", JSON.stringify(userData));

    showMessage({
      message: "Sucesso",
      description: "Cadastro realizado com sucesso.",
      type: "success",
    });

    setName("");
    setPhone("");
    setEmail("");
    setPassword("");
    navigation.navigate("Login");
  };

  const Stepper = ({ current }: { current: 0 | 1 }) => {
    const completed = current === 1;
    return (
      <View style={styles.stepper}>
        <View style={styles.stepLineWrap}>
          <View style={styles.stepLineBg} />
          <View
            style={[styles.stepLineFg, { width: completed ? "100%" : "0%" }]}
          />
        </View>

        <View style={styles.stepItem}>
          <View
            style={[
              styles.stepDot,
              current === 0 && styles.stepDotActive,
              completed && styles.stepDotCompleted,
            ]}
          >
            {completed ? (
              <Icon name="check" size={18} color={"#34c43d"} />
            ) : (
              <Text
                style={[styles.stepNum, current === 0 && styles.stepNumActive]}
              >
                1
              </Text>
            )}
          </View>
          <Text
            style={[styles.stepLabel, current === 0 && styles.stepLabelActive]}
          >
            Dados pessoais
          </Text>
        </View>

        <View style={styles.stepItem}>
          <View style={[styles.stepDot, current === 1 && styles.stepDotActive]}>
            <Text
              style={[styles.stepNum, current === 1 && styles.stepNumActive]}
            >
              2
            </Text>
          </View>
          <Text
            style={[styles.stepLabel, current === 1 && styles.stepLabelActive]}
          >
            Acesso
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/wppLogin.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.hero}>
            <Text style={styles.title}>
              Bem-vindo ao{"\n"}
              <Text style={styles.titleHighlight}>Future Stack</Text>
            </Text>
            <Text style={styles.subtitle}>
              seu aplicativo para localizar {"\n"}sua moto com agilidade
            </Text>
          </View>

          {/* Card */}
          <View style={styles.card}>
            <Stepper current={step} />

            {/* Conteúdo por etapa */}
            {step === 0 ? (
              <View style={styles.formArea}>
                <InputField
                  placeholder="Nome"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                />
                <InputField
                  placeholder="Telefone"
                  value={phone}
                  keyboardType="phone-pad"
                  onChangeText={setPhone}
                  style={styles.input}
                />

                <TouchableOpacity style={styles.primaryButton} onPress={goNext}>
                  <Text style={styles.primaryText}>Continuar</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.formArea}>
                <InputField
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
                <InputField
                  placeholder="Senha"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                  style={styles.input}
                />

                <View style={styles.buttonsRow}>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => setStep(0)}
                  >
                    <Text style={styles.secondaryText}>Voltar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.primaryButton}
                    onPress={handleRegister}
                  >
                    <Text style={styles.primaryText}>Cadastre-se</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Já tem cadastro? Faça login</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    justifyContent: "center",
  },
  hero: {
    marginTop: 120,
    alignItems: "center",
    marginBottom: 100,
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 36,
    letterSpacing: 0.3,
  },
  titleHighlight: {
    color: "#34c43d",
    fontWeight: "900",
  },
  subtitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 8,
    opacity: 0.9,
  },
  card: {
    marginTop: 28,
    borderRadius: 16,
    padding: 16,
  },
  stepper: {
    marginBottom: 10,
    paddingTop: 6,
    paddingBottom: 14,
    paddingHorizontal: 24,
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  stepLineWrap: {
    position: "absolute",
    left: 24,
    right: 24,
    top: 22,
    height: 4,
    overflow: "hidden",
    borderRadius: 2,
  },
  stepLineBg: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  stepLineFg: {
    height: "100%",
    backgroundColor: "#2E9936",
    borderRadius: 2,
  },
  stepItem: {
    alignItems: "center",
    width: "50%",
  },
  stepDot: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },
  stepDotActive: { borderColor: "#2E9936" },
  stepDotCompleted: { borderColor: "#2E9936" },
  stepNum: { color: "#2E9936", fontWeight: "800" },
  stepNumActive: { color: "#2E9936" },
  stepLabel: { marginTop: 6, color: "#fff", fontWeight: "600" },
  stepLabelActive: { color: "#2c8f31" },
  formArea: { paddingTop: 8 },
  input: {
    marginBottom: 12,
    borderRadius: 12,
  },
  buttonsRow: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    marginTop: 4,
  },
  primaryButton: {
    backgroundColor: "#2E9936",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  secondaryButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: "#2E9936",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    marginTop: 22,
    backgroundColor: "#fff",
  },
  secondaryText: { color: "#2E9936", fontSize: 16, fontWeight: "700" },
  link: {
    marginTop: 16,
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
});
