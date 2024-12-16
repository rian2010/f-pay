import { Camera, CameraView } from "expo-camera";
import { Stack } from "expo-router";
import {
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Alert,
  View,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { FaceScan } from "@/components/facescan";
import { useFont } from "@shopify/react-native-skia";
import CircularProgressBar from "@/components/progress-bar";

const RADIUS = 50;
const STROKE_WIDTH = 15;

export default function Home() {
  const [hasPermission, setHasPermission] = useState(null);
  const font = useFont(require('../../assets/fonts/Poppins-Regular.ttf'), 60);

  useEffect(() => {
    // Request camera permission
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission required", "Camera access is required.");
        setHasPermission(false);
      } else {
        setHasPermission(true);
      }
    };

    requestCameraPermission();
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
        <FaceScan />
      ) : hasPermission ? (
        <CameraView style={StyleSheet.absoluteFillObject} facing="front" />
      ) : (
        <FaceScan message="Camera permission is denied." />
      )}

      {/* Circular Progress Bar Above Modal */}
      <View style={styles.circularContainer}>
        <CircularProgressBar
          radius={RADIUS}
          strokeWidth={STROKE_WIDTH}
          font={font}
        />
      </View>

      {/* Bottom Modal with Icon beside Text */}
      <View className="absolute bottom-[45px] h-20 left-5 right-5 bg-white rounded-2xl shadow-lg z-10 flex flex-row items-center px-4">
        {/* Icon Container */}
        <View className="bg-blue-100 p-2 rounded-xl mr-3">
          <Ionicons
            name="information-circle-outline"
            size={30}
            color="#3b82f6"
          />
        </View>

        <Text className="text-base font-semibold text-gray-800">
          Pastikan muka anda terlihat!
        </Text>
      </View>

      <FaceScan />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalText: {
    fontSize: 16,
    color: "black",
  },

  circularContainer: {
    position: 'absolute', // Position the progress bar above the modal
    top: '67.5%', // Adjust the vertical position above the modal
    left: '50%', // Center horizontally
    transform: [{ translateX: -RADIUS }], // Offset to properly center the circle
    zIndex: 20, // Ensure the progress bar is above the modal and camera
  },
});

