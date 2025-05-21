import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

export default function Metragem() {
  const [metragemPatio, setMetragemPatio] = useState('');
  const [metragemManutencao, setMetragemManutencao] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.label}>Metragem Zona A (Pátio):</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 200"
            placeholderTextColor="#aaa"
            value={metragemPatio}
            onChangeText={setMetragemPatio}
          />
          <Text style={styles.suffix}>m²</Text>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={styles.label}>Metragem Zona B (Manutenção):</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Ex: 120"
            placeholderTextColor="#aaa"
            value={metragemManutencao}
            onChangeText={setMetragemManutencao}
          />
          <Text style={styles.suffix}>m²</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 20,
    marginLeft: 35,
  },
  box: {
    width: 180,
  },
  label: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 6,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  suffix: {
    fontSize: 16,
    color: '#333',
  },
});
