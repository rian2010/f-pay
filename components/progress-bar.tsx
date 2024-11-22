import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Canvas, Path, SkFont, Skia } from '@shopify/react-native-skia';
import { SharedValue, useSharedValue, withTiming, Easing } from 'react-native-reanimated';

type Props = {
  strokeWidth: number;
  radius: number;
  font: SkFont;
  duration?: number; // Duration for the animation in milliseconds
};

const CircularProgressBar = ({
  radius,
  strokeWidth,
  font,
  duration = 2000, // Default animation duration of 2 seconds
}: Props) => {
  const end = useSharedValue(0); // Shared value for the end percentage (0 to 1)

  const innerRadius = radius - strokeWidth / 2;

  const path = Skia.Path.Make();
  path.addCircle(radius, radius, innerRadius);

  useEffect(() => {
    // Animate the `end` value to 1 over the specified duration
    end.value = withTiming(1, {
      duration,
      easing: Easing.inOut(Easing.ease),
    });
  }, [duration, end]);

  return (
    <View style={{ width: radius * 2, height: radius * 2 }}>
      <Canvas style={styles.container}>
        {/* Background Circle */}
        <Path
          path={path}
          strokeWidth={strokeWidth}
          color="#FFF"
          style="stroke"
          strokeJoin="round"
          strokeCap="round"
          start={0}
          end={1}
        />
        {/* Animated Progress Circle */}
        <Path
          path={path}
          strokeWidth={strokeWidth}
          color="#32A7E2"
          style="stroke"
          strokeJoin="round"
          strokeCap="round"
          start={0}
          end={end} // Use the animated `end` shared value
        />
      </Canvas>
    </View>
  );
};

export default CircularProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

