import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Gateways() {
  return (
    <View style={styles.container}>
      <View style={styles.gatewayBox}>
        <Text style={styles.title}>Gateway Zona A</Text>
        <Text style={styles.fixedValue}>1</Text>
      </View>

      <View style={styles.gatewayBox}>
        <Text style={styles.title}>Gateway Zona B</Text>
        <Text style={styles.fixedValue}>1</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -80,
    marginLeft: 15,
    gap: 20,
  },
  gatewayBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    width: 160,
    elevation: 2,
  },
  title: {
    fontSize: 14,
    color: '#333',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  fixedValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
  },
});
