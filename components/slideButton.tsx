import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, Alert } from 'react-native';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import Ionicons from '@expo/vector-icons/Ionicons';

const SlidingButton: React.FC<{ onSlideComplete: () => void }> = ({ onSlideComplete }) => {
  const [translationX] = useState(new Animated.Value(0));
  const [slideComplete, setSlideComplete] = useState(false);

  // Interpolating the background color based on the translationX value
  const backgroundColor = translationX.interpolate({
    inputRange: [0, 200],  // The range for the translationX value
    outputRange: ['#32A7E2', '#4CAF50'],  // The color change from initial to end
    extrapolate: 'clamp',  // Ensures the value doesn't exceed the defined output range
  });

  // Interpolating the opacity of the text as the button slides
  const textOpacity = translationX.interpolate({
    inputRange: [0, 150],  // As the button moves from 0 to 150
    outputRange: [1, 0],   // Fade out from full opacity to fully invisible
    extrapolate: 'clamp',  // Prevents the opacity from going below 0
  });

  const handleGesture = Animated.event(
    [{ nativeEvent: { translationX } }],
    { useNativeDriver: false }  // No native driver needed for background color and opacity
  );

  const handleStateChange = ({ nativeEvent }: any) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationX > 270) {
        setSlideComplete(true);
        onSlideComplete();

        // Show an alert when the button reaches the end
        Alert.alert('Success', 'Button slid successfully!', [
          { text: 'OK', onPress: () => console.log('Alert closed') },
        ]);
      } else {
        Animated.spring(translationX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <Animated.View
        style={[styles.sliderContainer, { backgroundColor }]}  // Animated background color
      >
        {/* Display "Geser Untuk Mengirim" when slide is not complete */}
        {!slideComplete && (
          <Animated.Text style={[styles.sliderText, { opacity: textOpacity }]}>
            Geser Untuk Mengirim
          </Animated.Text>
        )}
        {/* Display "✔ Sent" when slide is complete */}
        {slideComplete && (
          <Text style={styles.sliderText}>✔ Sent</Text>
        )}

        <PanGestureHandler
          onGestureEvent={handleGesture}
          onHandlerStateChange={handleStateChange}
        >
          <Animated.View
            style={[styles.sliderButton, { transform: [{ translateX: translationX }] }]}
          >
            <Ionicons name="arrow-forward" size={24} color="#32A7E2" />
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </GestureHandlerRootView>
  );
};

export default SlidingButton;

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderContainer: {
    position: 'relative',
    width: '100%',
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  sliderText: {
    position: 'absolute',
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sliderButton: {
    margin: 5,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

