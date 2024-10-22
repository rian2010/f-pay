import images from '@/constants/images';
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.headerBackground}>
      {/* Profile Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={images.avatar} // Replace with actual avatar image URL
          style={styles.avatar}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerBackground: {
    width: '100%',
    backgroundColor: '#32A7E2',
    height: 90,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  avatarContainer: {
    marginBottom: -50, // Adjust to pull the avatar upwards to overlap the blue section
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 55, // Border radius increased to match new size
  },
  avatar: {
    width: 100,   // Increased width of the avatar
    height: 100,  // Increased height of the avatar
    borderRadius: 50, // Circular avatar (half of 100)
  },
});

export default Header;


