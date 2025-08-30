import { View, Text, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = "default",
  suffix,
}: any) {
  return (
    <View style={styles.box}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          keyboardType={keyboardType}
          underlineColor="transparent"
          activeOutlineColor="#fff"
          outlineColor="#fff"
          mode="outlined"
          theme={{ colors: { text: "#000", background: "#fff" } }}
        />
        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { marginBottom: 0 },
  label: { fontSize: 14, marginBottom: 6 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 15,
  },
  input: { flex: 1, fontSize: 16, backgroundColor: "#fff" },
  suffix: { fontSize: 16, color: "#333", marginLeft: 5 },
});
