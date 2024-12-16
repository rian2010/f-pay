import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { createContext, useContext, useEffect, useState } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [noHP, setNoHP] = useState('');
  const [token, setToken] = useState(null);
  const navigation = useNavigation
  const [user, setUser] = useState(null);  // Add user state to store logged-in user
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        const response = await fetch('http://localhost:8080/current_user', { //NOTE: untuk semua "LOCALHOST" di ganti jadi ip address hp
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);  // Set user data
          setToken(token);  // Make sure the token is set
        } else {
          await AsyncStorage.removeItem('userToken');
        }
      }
      setIsLoading(false);
    };

    fetchUser();
  }, [])

  useEffect(() => {
    if (!token) {
      CommonActions.reset({
        index: 0,
        routes: [
          'sign-in'
        ]
      })
    }
  }, [token, navigation]);

  // const loginWithPhone = async (phoneNumber) => {
  //   try {
  //     const response = await fetch('http://192.168.100.112:8080/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ step: 'verify_no_hp', no_hp: phoneNumber }),
  //     });
  //
  //     const text = await response.text(); // Fetch response as text
  //     let data;
  //
  //     // Try to parse JSON
  //     try {
  //       data = JSON.parse(text);
  //     } catch (err) {
  //       console.error('Server returned non-JSON response:', text);
  //       throw new Error('Invalid server response format');
  //     }
  //
  //     if (!response.ok) {
  //       throw new Error(data.message || 'Phone number not found');
  //     }
  //
  //     setNoHP(phoneNumber);
  //   } catch (error) {
  //     console.error('Error during login:', error.message);
  //     throw new Error(error.message || 'Failed to connect to the server');
  //   }
  // };

  const loginWithPhone = async (phoneNumber) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ step: 'verify_no_hp', no_hp: phoneNumber }),
      });

      // Check if the response is OK
      if (!response.ok) {
        const text = await response.text(); // Read the response as text
        throw new Error(text || 'Phone number not found');
      }

      // If the response is OK, attempt to parse as JSON
      try {
        const data = await response.json();
        setNoHP(phoneNumber); // Update the noHP in context if successful
      } catch (err) {
        console.error('Server returned non-JSON response:', err);
        throw new Error('Invalid server response format');
      }

    } catch (error) {
      console.error('Error during login:', error.message);
      throw new Error(error.message || 'Failed to connect to the server');
    }
  };

  // const verifyPin = async (pin) => {
  //   try {
  //     const response = await fetch('http://192.168.100.112:8080/login', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ step: 'verify_pin', no_hp: noHP, pin }),
  //     });
  //
  //     const text = await response.text(); // Fetch response as text
  //     let data;
  //
  //     // Try to parse JSON
  //     try {
  //       data = JSON.parse(text);
  //     } catch (err) {
  //       console.error('Server returned non-JSON response:', text);
  //       throw new Error('Invalid server response format');
  //     }
  //
  //     if (!response.ok) {
  //       throw new Error(data.message || 'Invalid PIN');
  //     }
  //
  //     setToken(data.token); // Store the token
  //   } catch (error) {
  //     console.error('Error during PIN verification:', error.message);
  //     throw new Error(error.message || 'Failed to connect to the server');
  //   }
  // };
  //

  const verifyPin = async (pin, step) => {
    try {
      const response = await fetch('http://localhost:8080/login', {
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

  const logout = () => {
    setToken(null);
    setNoHP('');
    setUser(null);
    AsyncStorage.removeItem('userToken');
  }

  return (
    <AuthContext.Provider value={{ noHP, setNoHP, token, setToken, loginWithPhone, verifyPin, logout, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


