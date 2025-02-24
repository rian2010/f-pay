import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Keyboard: React.FC<{
  amount: string;
  setAmount: React.Dispatch<React.SetStateAction<string>>
}> = ({ amount, setAmount }) => {

  const handleKeyPress = (value: string) => {
    if (value === 'backspace') {
      setAmount(amount.slice(0, -1) || '0'); // Avoid empty string
    } else if (value === '.' && !amount.includes('.')) {
      setAmount(amount + value);
    } else if (value !== 'backspace' && value !== '.') {
      setAmount(amount === '0' ? value : amount + value); // Replace '0' on first input
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.keypad}>
        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => handleKeyPress(key)}
          >
            {key === 'backspace' ? (
              <Ionicons name="backspace" size={24} color="gray" />
            ) : (
              <Text style={styles.keyText}>{key}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  key: {
    width: '30%',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  keyText: {
    fontSize: 24,
    color: '#4a4a4a',
  },
});

export default Keyboard;

