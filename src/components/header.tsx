import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const navigation = useNavigation<any>();
  const { colors } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderBottomColor: colors.border,
          backgroundColor: colors.background,
        },
      ]}
    >
      <View style={styles.name}>
        <Image
          style={{ width: 27, height: 27 }}
          source={require("../../assets/logo.png")}
        />
        <Text style={[styles.title, { color: colors.text }]}>Future Stack</Text>
      </View>

      <TouchableOpacity
        onPress={async () => {
          try {
            await AsyncStorage.multiRemove(["token", "userData"]);
            navigation.reset({
              index: 0,
              routes: [{ name: "Login" as never }],
            });
          } catch (e) {
            console.error("Erro no logout:", e);
          }
        }}
      >
        <MaterialIcons name="logout" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  name: { flexDirection: "row", alignItems: "center", gap: 10 },
  container: {
    marginTop: 20,
    width: "100%",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    justifyContent: "space-between",
  },
  title: { fontSize: 20, fontWeight: "bold" },
});
