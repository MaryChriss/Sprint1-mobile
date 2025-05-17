import { StyleSheet, Text, View, TextInput } from 'react-native';
import React, { useState } from 'react';

export default function Metragem() {
  const [metragem, setMetragem] = useState('');

  return (
    <View style={{  width: 130, marginTop: 20 }}>
        <Text style={styles.filialTitle}>Metragem:</Text>


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
    marginBottom: 9,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  suffix: {
    fontSize: 16,
  },
});
