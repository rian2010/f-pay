import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
} from "react-native";

import { Overlay } from "@/components/overlay";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [hasPermission, setHasPermission] = useState(null); // State to track camera permission
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    // Function to request camera permission
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Camera access is required to scan QR codes.");
        setHasPermission(false);
      } else {
        setHasPermission(true);
      }
    };

    requestCameraPermission(); // Call the permission request function

    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen
        options={{
          title: "Overview",
          headerShown: false,
        }}
      />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}

      {hasPermission === null ? (
        // Optional: Display loading or waiting screen while requesting permission
        <Overlay />
      ) : hasPermission ? (
        // Render CameraView only if permission is granted
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(async () => {
                await Linking.openURL(data);
              }, 500);
            }
          }}
        />
      ) : (
        // Optional: Render an error message if permission is denied
        <Overlay message="Camera permission is denied." />
      )}
      <Overlay />
    </SafeAreaView>
  );
}

