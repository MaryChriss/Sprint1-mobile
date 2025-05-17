import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

export default function Vagas() {
  const [quantidade, setQuantidade] = useState(60); // mínimo 60

  const aumentar = () => setQuantidade(prev => prev + 1);
  const diminuir = () => {
    if (quantidade > 60) {
      setQuantidade(prev => prev - 1);
    }
  };

  return (
    <View style={{ width: 130, height: 49, marginTop: 15 }}>
      <Text style={styles.filialTitle}>Qnt. de Vagas:</Text>

      <View style={styles.counterContainer}>
        <TouchableOpacity style={styles.button} onPress={diminuir}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <Text style={styles.countText}>{quantidade}</Text>

        <TouchableOpacity style={styles.button} onPress={aumentar}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filialTitle: {
    color: '#fff',
    fontSize: 15,
    marginTop: 5,
    marginLeft: 4,
    marginBottom: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 10,
  },
  button: {
    backgroundColor: '#0da32189',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 1,
    marginHorizontal: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  countText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
});
