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
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import InputField from "../components/InputField";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { cadastro } from "../services/rotes";

export default function Register() {
  const navigation = useNavigation<any>();
  const { t } = useTranslation();

  const [step, setStep] = useState<0 | 1>(0);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    phone?: string;
    email?: string;
    password?: string;
  }>({});

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateName = (v: string) =>
    /^[A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç]+(?:\s[A-ZÁÀÂÃÉÈÊÍÌÎÓÒÔÕÚÙÛÇ][a-záàâãéèêíìîóòôõúùûç]+)*$/.test(
      v.trim()
    );

  const validatePassword = (v: string) =>
    /^(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(
      v.trim()
    );

  const validateEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v.trim());

  const validatePhone = (v: string) => {
    const onlyDigits = v.replace(/\D/g, "");
    return /^(\d{10}|\d{11})$/.test(onlyDigits);
  };
  const validateField = (
    field: "name" | "phone" | "email" | "password",
    value: string
  ) => {
    let msg = "";

    if (field === "name") {
      if (!value?.trim()) msg = t("infName");
      else if (!validateName(value)) msg = t("nomeM");
    }

    if (field === "phone") {
      if (!value?.trim()) msg = t("infTel");
      else if (!validatePhone(value)) msg = t("invalidCellphone");
    }

    if (field === "email") {
      if (!value?.trim()) msg = t("infEmail");
      else if (!validateEmail(value)) msg = t("invalidEmail");
    }

    if (field === "password") {
      if (!value?.trim()) msg = t("InfSenha");
      else if (!validatePassword(value)) msg = t("senhavalid");
    }

    setErrors((prev) => ({ ...prev, [field]: msg }));
    return !msg;
  };

  const goNext = () => {
    const okName = validateField("name", name);
    const okPhone = validateField("phone", phone);
    if (!okName || !okPhone) return;
    setErrors((prev) => ({ ...prev, name: undefined, phone: undefined }));
    setStep(1);
  };

  const handleRegister = async () => {
    const okEmail = validateField("email", email);
    const okPwd = validateField("password", password);
    if (!okEmail || !okPwd) return;

    try {
      setLoading(true);

      const phoneNumber = Number(phone.replace(/\D/g, ""));
      if (!Number.isFinite(phoneNumber)) {
        setErrors((prev) => ({ ...prev, phone: t("telefInvalid") }));
        setLoading(false);
        return;
      }

      const response = await cadastro({
        nomeUser: name,
        phone: phoneNumber,
        email,
        password,
      });

      console.log("Cadastro realizado com sucesso!");

      const userData = {
        idUser: response.idUser,
        nomeUser: response.nomeUser,
        email: response.email,
        phone: response.phone,
      };
      await AsyncStorage.setItem("userData", JSON.stringify(userData));

      console.log("DADOS SALVOS:", userData);

      setName("");
      setPhone("");
      setEmail("");
      setPassword("");
      setErrors({});
      navigation.navigate("Login");
    } catch (error: any) {
      const res = error?.response;
      const status: number | undefined = res?.status ?? error?.status;

      const data = res?.data ?? error?.data;
      const dataText =
        typeof data === "string" ? data : data ? JSON.stringify(data) : "";
      const msgText = `${error?.message ?? ""} ${dataText}`;

      const isDupEmail =
        status === 409 ||
        /duplicate key|23505|unique constraint|uc_usuario_email|email.*already exists/i.test(
          msgText
        );

      if (isDupEmail) {
        setErrors((prev) => ({ ...prev, email: t("emailInUse") }));
        return;
      }

      const serverMsg =
        (typeof data === "object" && (data?.message || data?.error)) ||
        (typeof data === "string" && data) ||
        error?.message ||
        t("erroCadas");

      showMessage({ message: "Erro", description: serverMsg, type: "danger" });
    } finally {
      setLoading(false);
    }
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
            {t("dadospessoais")}
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
            {t("acesso")}
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
              {t("welcometo")}
              {"\n"}
              <Text style={styles.titleHighlight}> {t("projName")}</Text>
            </Text>
            <Text style={styles.subtitle}>
              {t("yApp")} {"\n"} {t("yMt")}
            </Text>
          </View>

          <View style={styles.card}>
            <Stepper current={step} />

            {step === 0 ? (
              <View style={styles.formArea}>
                <InputField
                  placeholder={t("name")}
                  value={name}
                  onChangeText={(v) => {
                    setName(v);
                    if (errors.name) validateField("name", v);
                  }}
                  containerStyle={styles.glass}
                  style={{}}
                />
                {!!errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}

                <InputField
                  placeholder={t("cellphone")}
                  value={phone}
                  onChangeText={(v) => {
                    setPhone(v);
                    if (errors.phone) validateField("phone", v);
                  }}
                  containerStyle={styles.glass}
                  style={{}}
                />
                {!!errors.phone && (
                  <Text style={styles.errorText}>{errors.phone}</Text>
                )}

                <TouchableOpacity
                  style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                  onPress={goNext}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.primaryText}>{t("continuar")}</Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.formArea}>
                <InputField
                  placeholder={t("email")}
                  value={email}
                  onChangeText={(v) => {
                    setEmail(v);
                    if (errors.email) validateField("email", v);
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.glass}
                />
                {!!errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <InputField
                  placeholder={t("password")}
                  value={password}
                  onChangeText={(v) => {
                    setPassword(v);
                    if (errors.password) validateField("password", v);
                  }}
                  secureTextEntry
                  containerStyle={styles.glass}
                />
                {!!errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}

                <View style={styles.buttonsRow}>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => setStep(0)}
                    disabled={loading}
                  >
                    <Text style={styles.secondaryText}>{t("back")}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.primaryButton, loading && { opacity: 0.7 }]}
                    onPress={handleRegister}
                    disabled={loading}
                  >
                    {loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.primaryText}>{t("cadastrase")}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>{t("temCadastro")}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1, justifyContent: "center" },
  errorText: {
    marginTop: 2,
    color: "#E53935",
    fontSize: 12,
    fontWeight: "600",
  },
  glass: {
    backgroundColor: "rgba(219, 219, 219, 0.35)",
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "rgba(255,255,255,0.25)",
    marginBottom: 12,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
    justifyContent: "center",
  },
  hero: { marginTop: 120, alignItems: "center", marginBottom: 100 },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 36,
    letterSpacing: 0.3,
  },
  titleHighlight: { color: "#34c43d", fontWeight: "900" },
  subtitle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    marginTop: 8,
    opacity: 0.9,
  },
  card: { marginTop: 28, borderRadius: 16, padding: 16 },
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
  stepLineBg: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0 },
  stepLineFg: { height: "100%", backgroundColor: "#2E9936", borderRadius: 2 },
  stepItem: { alignItems: "center", width: "50%" },
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
  input: { marginBottom: 12, borderRadius: 12 },
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
