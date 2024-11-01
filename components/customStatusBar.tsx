import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useIsFocused } from '@react-navigation/native';

const CustomStatusBar = ({ backgroundColor, barStyle }) => {
  const isFocused = useIsFocused();

  return isFocused ? (
    <StatusBar backgroundColor={backgroundColor} style={barStyle} />
  ) : null; // Return null if not focused
};

export default CustomStatusBar;

