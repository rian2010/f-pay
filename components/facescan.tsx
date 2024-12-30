import React from 'react';
import { Platform, StyleSheet, Dimensions } from 'react-native';
import { Canvas, DiffRect, rrect, rect } from '@shopify/react-native-skia';

const { width, height } = Dimensions.get('window');

const innerWidth = 340;
const innerHeight = 430; // Height of the cutout (no change)

const outer = rrect(rect(0, 0, width, height), 0, 0);

// Move the inner rectangle higher by adjusting the Y-position
const inner = rrect(
  rect(
    width / 2 - innerWidth / 2, // Center the cutout horizontally
    height / 2 - innerHeight / 2 - 90, // Move it 90px higher vertically
    innerWidth,
    innerHeight
  ),
  50, // Rounded corners radius for inner
  50  // Rounded corners radius for inner
);

const FaceScan = () => {
  return (
    <Canvas
      style={Platform.OS === 'android' ? { flex: 1 } : StyleSheet.absoluteFillObject}
    >
      <DiffRect inner={inner} outer={outer} color="black" opacity={0.8} />
    </Canvas>
  );
};

export default FaceScan;

