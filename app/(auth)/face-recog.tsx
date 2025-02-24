import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Text, Alert, Platform, PermissionsAndroid, SafeAreaView, StatusBar, Modal, TouchableOpacity } from 'react-native';
import { Camera, getCameraDevice, useCameraDevices } from 'react-native-vision-camera';
import { Ionicons } from '@expo/vector-icons';
import CircularProgressBar from '@/components/progress-bar';
import { useFont } from '@shopify/react-native-skia';
import { Stack } from 'expo-router';
import FaceScan from '@/components/facescan';

const RADIUS = 50;
const STROKE_WIDTH = 15;

const FaceCapture: React.FC = () => {
  const [isCameraInitialized, setIsCameraInitialized] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [modalMessage, setModalMessage] = useState(''); // Modal message state
  const cameraRef = useRef<Camera>(null);
  const devices = useCameraDevices();
  const frontCamera = getCameraDevice(devices, 'front');
  const font = useFont(require('../../assets/fonts/Poppins-Regular.ttf'), 60);

  useEffect(() => {
    const requestPermissions = async () => {
      let permissionGranted = false;

      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'We need access to your camera to capture photos.',
            buttonPositive: 'OK',
          }
        );
        permissionGranted = granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        const cameraPermission = await Camera.requestCameraPermission();
        permissionGranted = cameraPermission === 'authorized';
      }

      if (permissionGranted) {
        setHasPermission(true);
      } else {
        setErrorMessage('Camera permission is required to use this feature.');
      }
    };

    requestPermissions();
  }, []);



  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: 'Overview',
          headerShown: false,
        }}
      />
      {Platform.OS === 'android' ? <StatusBar hidden /> : null}

      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFillObject}
        device={frontCamera}
        isActive={isCameraActive}
        photo={true}
        onInitialized={() => setIsCameraInitialized(true)}
        onError={(error) => {
          setErrorMessage('Camera error: ' + error.message);
          console.error('Camera error:', error);
        }}
      />

      {/* Circular Progress Bar */}
      <View style={styles.circularContainer}>
        <CircularProgressBar radius={RADIUS} strokeWidth={STROKE_WIDTH} font={font} />
      </View>

      {/* Bottom Modal with Icon */}
      <View style={styles.bottomModal}>
        <View style={styles.iconContainer}>
          <Ionicons name="information-circle-outline" size={30} color="#3b82f6" />
        </View>
        <Text style={styles.infoText}>
          {modalMessage || 'Pastikan muka anda terlihat!'}
        </Text>
      </View>

      {/* FaceScan Overlay */}
      <FaceScan />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  errorText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    margin: 20,
  },
  circularContainer: {
    position: 'absolute',
    top: '67.5%',
    left: '50%',
    transform: [{ translateX: -RADIUS }],
    zIndex: 20,
  },
  bottomModal: {
    position: 'absolute',
    bottom: 45,
    left: 5,
    right: 5,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    zIndex: 10,
  },
  iconContainer: {
    backgroundColor: '#E0F7FF',
    padding: 10,
    borderRadius: 50,
    marginRight: 12,
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4B5563',
  },
});

export default FaceCapture;

