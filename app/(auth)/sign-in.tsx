import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from 'react-native';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome or another icon set

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [animationSize, setAnimationSize] = useState(300); // Initial size
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false); // State for keyboard visibility
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true); // State to track phone number validity
  const navigation = useNavigation();

  const handleLogin = () => {
    if (!phoneNumber) {
      setIsPhoneNumberValid(false); // Set invalid state if phone number is empty
      return;
    }

    setIsPhoneNumberValid(true); // Reset the state if phone number is valid
    navigation.navigate('pin');
    setPhoneNumber('');
  };

  const handleRegister = () => {
    navigation.navigate('sign-up');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setAnimationSize(200); // Shrink size when keyboard is shown
      setIsKeyboardVisible(true); // Set keyboard visibility to true
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setAnimationSize(300); // Return to original size when keyboard is hidden
      setIsKeyboardVisible(false); // Set keyboard visibility to false
    });

    // Clean up the listeners on unmount
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {/* Lottie View centered */}
      <View style={styles.lottieContainer}>
        <LottieView
          source={require("../../assets/images/welcome.json")}
          style={[styles.lottie, { width: animationSize, height: animationSize }]} // Adjust size dynamically
          autoPlay
        />
      </View>

      {/* The bottom section */}
      <View style={styles.bottomSection}>
        <Text style={styles.label}>No Telepon</Text>
        <View style={[styles.inputContainer, !isPhoneNumberValid && styles.inputContainerError]}>
          {/* Icon on the left side of the input */}
          <Icon name="phone" size={20} color="#7B7B8B" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="+62 8726-0592-908"
            placeholderTextColor="#7B7B8B"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            maxLength={15}
          />
        </View>
        {!isPhoneNumberValid && (
          <Text style={styles.errorText}>Nomor telepon diperlukan</Text> // Error message
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Selanjutnya</Text>
        </TouchableOpacity>

        {/* Conditionally render the registration text based on keyboard visibility */}
        {!isKeyboardVisible && (
          <TouchableOpacity>
            <Text style={styles.registerText} onPress={handleRegister}>
              Tidak memiliki akun? <Text style={styles.link}>Daftar sekarang</Text>
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

// Styling with red border for error state
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  lottieContainer: {
    flex: 1, // Take remaining space
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    // Width and height are dynamically set through the animationSize state
  },
  bottomSection: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    justifyContent: 'flex-end',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 20,
    flexDirection: 'row', // Add this line
    alignItems: 'center', // Align items in the center
  },
  inputContainerError: {
    borderColor: 'red', // Red border for error
  },
  icon: {
    padding: 10,
    marginLeft: 10 // Add padding to the icon
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    flex: 1, // Allow the input to take remaining space
  },
  button: {
    backgroundColor: '#01ADEF',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 13,
  },
  link: {
    color: '#01ADEF',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default LoginPage;

