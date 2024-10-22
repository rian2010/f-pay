import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the back arrow icon
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';


const PinEntryScreen: React.FC = () => {
  const [pin, setPin] = useState<string>('');
  const navigation = useNavigation();

  const handleKeyPress = (value: string): void => {
    if (pin.length < 6) {
      setPin((prevPin) => prevPin + value);
    }
  };

  const handleBackspace = (): void => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  //NOTE: : this redirect thing when the number fully inputed, is not
  //        implemented using backend yet, simply just a logic!
  useEffect(() => {
    if (pin.length === 6) {
      navigation.navigate('(tabs)');
    }
  }
  )

  const renderDots = (): JSX.Element[] => {
    const dots = [];
    for (let i = 0; i < 6; i++) {
      dots.push(
        <View
          key={i}
          style={[styles.dot, { backgroundColor: i < pin.length ? '#9EA3AE' : '#E2E2E2' }]}
        />
      );
    }
    return dots;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {/* Add your header component here */}

      {/* Wrapper for Dots and Keypad */}
      <View style={styles.wrapper}>
        {/* PIN Dots */}
        <View style={styles.pinDotsContainer}>{renderDots()}</View>

        {/* Numeric Keypad */}
        <View style={styles.keypadContainer}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, null, 0].map((num, index) =>
            num === null ? (
              <View key={index} style={styles.keypadButton} />
            ) : (
              <TouchableOpacity
                key={index}
                style={styles.keypadButton}
                onPress={() => handleKeyPress(num.toString())}
              >
                <Text style={styles.keypadText}>{num}</Text>
              </TouchableOpacity>
            )
          )}
          {/* Backspace Button */}
          <TouchableOpacity style={styles.keypadButton} onPress={handleBackspace}>
            <Ionicons name="backspace" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Forgot PIN */}
      <TouchableOpacity>
        <Link href='/(auth)\forgotPassword' style={styles.forgotText}>Lupa pin anda?</Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    marginTop: 40, // Adjust this value to move the entire section down
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  pinDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    margin: 10,
    backgroundColor: '#E2E2E2',
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '80%',
    justifyContent: 'space-between',
  },
  keypadButton: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  keypadText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  forgotText: {
    color: '#4A90E2',
    marginBottom: 10, // Decrease this value to reduce the gap
  },
});


export default PinEntryScreen;

