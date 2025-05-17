import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

export const Metragem = () => {
  const [metragem, setMetragem] = useState('');

  return (
    <View style={{ width: 150 }}>
      <Text style={styles.filialTitle}>Metragem do Pátio (m²):</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Ex: 120"
          placeholderTextColor="#aaa"
          value={metragem}
          onChangeText={setMetragem}
        />
        <Text style={styles.suffix}>m²</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filialTitle: {
    color: '#fff',
    fontSize: 15,
    marginTop: 20,
    marginLeft: 4,
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  suffix: {
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
});
