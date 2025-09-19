import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

export default function Counter({ label, value, onIncrease, onDecrease }: any) {
  const { colors } = useTheme();
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <View
        style={[
          styles.counterContainer,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
            borderWidth: StyleSheet.hairlineWidth,
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={onDecrease}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={[styles.countText, { color: colors.text }]}>{value}</Text>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={onIncrease}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 15, marginBottom: 8 },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: 10,
  },
  button: { borderRadius: 100, paddingHorizontal: 10, marginHorizontal: 10 },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" },
  countText: { fontSize: 20, fontWeight: "bold" },
});
