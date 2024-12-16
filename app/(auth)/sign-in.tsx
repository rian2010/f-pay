import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Alert,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@/context/authContext'; // Import the AuthContext
import Toast from 'react-native-toast-message';  // Import the toast library

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [animationSize, setAnimationSize] = useState(300);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);

  const { loginWithPhone } = useAuth(); // Use loginWithPhone from AuthContext
  const navigation = useNavigation();

  // const loginWithPhone = async (phoneNumber: string): Promise<void> => {
  //   try {
  //     const response = await fetch('http://192.168.100.112:8080/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ step: 'verify_no_hp', no_hp: phoneNumber }),
  //     });
  //
  //     // Check if the response is OK
  //     if (!response.ok) {
  //       const text = await response.text(); // Read the response as text
  //       throw new Error(text || 'Phone number not found');
  //     }
  //
  //     // If the response is OK, attempt to parse as JSON
  //     try {
  //       const data = await response.json();
  //       setNoHP(phoneNumber); // Update the noHP in context if successful
  //     } catch (err) {
  //       console.error('Server returned non-JSON response:', err);
  //       throw new Error('Invalid server response format');
  //     }
  //
  //   } catch (error: any) {
  //     console.error('Error during login:', error.message);
  //     throw new Error(error.message || 'Failed to connect to the server');
  //   }
  // };

  const handleLogin = async (): Promise<void> => {
    if (!phoneNumber) {
      setIsPhoneNumberValid(false);
      return;
    }

    try {
      // Perform login
      await loginWithPhone(phoneNumber);
      console.log('Phone number verified, navigating to PIN screen...');
      navigation.navigate('pin'); // Navigate to the PIN screen if successful
      setPhoneNumber(''); // Reset the input field
    } catch (error: any) {
      console.log('Error during login:', error); // Debugging line

      // Display the error message as a toast
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error',
        text2: error.message || 'Phone number not found',  // Message to display in the toast
        visibilityTime: 4000,  // Duration of the toast
      });
      setPhoneNumber(''); // Clear input after error
    }
  };


  const handleRegister = () => {
    navigation.navigate('sign-up');
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setAnimationSize(200);
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setAnimationSize(300);
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.lottieContainer}>
        <LottieView
          source={require('../../assets/images/welcome.json')}
          style={[styles.lottie, { width: animationSize, height: animationSize }]}
          autoPlay
        />
      </View>

      <View style={styles.bottomSection}>
        <Text style={styles.label}>No Telepon</Text>
        <View style={[styles.inputContainer, !isPhoneNumberValid && styles.inputContainerError]}>
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
          <Text style={styles.errorText}>Nomor telepon diperlukan</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Selanjutnya</Text>
        </TouchableOpacity>

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

// Styles (unchanged)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  lottieContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {},
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputContainerError: {
    borderColor: 'red',
  },
  icon: {
    padding: 10,
    marginLeft: 10,
  },
  input: {
    height: 50,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#000',
    flex: 1,
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

