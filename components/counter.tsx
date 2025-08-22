import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Counter({ label, value, onIncrease, onDecrease }: any) {
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.button} onPress={onDecrease}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.countText}>{value}</Text>
        <TouchableOpacity style={styles.button} onPress={onIncrease}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { color: "#fff", fontSize: 15, marginBottom: 8 },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
  },
  button: {
    backgroundColor: "#0da32189",
    borderRadius: 100,
    paddingHorizontal: 10,
    marginHorizontal: 10,
  },
  buttonText: { color: "white", fontSize: 20, fontWeight: "bold" },
  countText: { fontSize: 20, fontWeight: "bold", color: "#333" },
});
