import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // For the backspace icon
import { useNavigation } from '@react-navigation/native';
import { Link } from 'expo-router';
import { useAuth } from '@/context/authContext';
import Toast from 'react-native-toast-message';

const PinEntryScreen: React.FC = () => {
  const [pin, setPin] = useState<string>('');  // To store entered PIN
  const navigation = useNavigation();
  const { noHP, setToken } = useAuth();


  const handleKeyPress = (value: string): void => {
    if (pin.length < 6) {
      setPin((prevPin) => prevPin + value);
    }
  };

  // Handle backspace key press
  const handleBackspace = (): void => {
    setPin((prevPin) => prevPin.slice(0, -1));
  };

  // Simulate backend logic for PIN verification
  const verifyPin = async (pin: string, step: string) => {
    try {
      const response = await fetch('http://192.168.100.112:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step, no_hp: noHP, pin }), // Send phone number and PIN
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Invalid PIN');
      }

      const data = await response.json();
      setToken(data.token); // Store the token if valid
      return true; // Return true on successful PIN verification
    } catch (error) {
      const errorMessage = error.message || 'An unknown error occurred';

      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: errorMessage,
        visibilityTime: 4000, // Duration of the toast
      });

      setPin(''); // Clear PIN on error
      return false; // Return false on failure
    }
  };

  // Handle the PIN submission once it's entered
  const handleSubmitPin = async (): Promise<void> => {
    try {
      const isValid = await verifyPin(pin, 'verify_pin'); // Pass 'verify_pin' as step
      if (isValid) {
        console.log('Login berhasil');
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Login Berhasil',
          visibilityTime: 4000
        })
        navigation.navigate('(root)'); // Navigate to root screen if PIN is valid
        setPin(''); // Clear PIN after successful login
      } else {
        console.log('PIN salah');
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Error',
          text2: 'PIN salah. Silahkan coba lagi!',
          visibilityTime: 4000, // Duration of the toast
        });
        setPin(''); // Clear PIN on invalid attempt
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: 'Terjadi kesalahan. Silahkan coba lagi nanti!',
        visibilityTime: 4000, // Duration of the toast
      });
      setPin(''); // Clear PIN on error
    }
  };

  // Render PIN dots based on entered PIN length
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

  // Redirect to submit PIN once it's 6 digits long
  useEffect(() => {
    if (pin.length === 6) {
      handleSubmitPin();
    }
  }, [pin]);

  return (
    <View style={styles.container}>
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
        <Link href='/(auth)/forgotPassword' style={styles.forgotText}>Lupa pin anda?</Link>
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
    marginTop: 40,
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
    marginBottom: 10,
  },
});

export default PinEntryScreen;

