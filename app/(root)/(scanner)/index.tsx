import { View, Text, Alert } from 'react-native';
import React, { useEffect } from 'react';
import { useCameraPermissions } from 'expo-camera';

const QR = () => {
  const [permission, requestPermission] = useCameraPermissions(); // Get permission state and request function

  const isPermissionGranted = Boolean(permission?.granted); // Check if permission is granted

  useEffect(() => {
    const checkPermission = async () => {
      if (!isPermissionGranted) {
        const { status } = await requestPermission(); // Request permission
        if (status !== 'granted') {
          Alert.alert('Camera permission is required to scan QR codes');
        }
      }
    };

    checkPermission();
  }, [isPermissionGranted, requestPermission]);

  return (
    <View>
      <Text>QR Code Scanner</Text>
      {isPermissionGranted ? (
        <Text>Camera is ready to use!</Text>
      ) : (
        <Text>Please grant camera permission to use the scanner.</Text>
      )}
    </View>
  );
};

export default QR;

