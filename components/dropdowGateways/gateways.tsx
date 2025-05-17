import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Gateways() {
  const [quantidade, setQuantidade] = useState(2);

  const aumentar = () => {
    if (quantidade < 20) {
      setQuantidade(prev => prev + 1);
    }
  };

  const diminuir = () => {
    if (quantidade > 2) {
      setQuantidade(prev => prev - 1);
    }
  };

  return (
    <View style={{ width: 130, marginLeft: 35 }}>
      <Text style={styles.filialTitle}>Qnt. de Gateways:</Text>

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
    marginTop: 10,
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
    elevation: 2,
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
