// Account.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Header from '@/components/header'; // Adjust the path as necessary
import TabSection from '@/components/in_out'; // Adjust the path as necessary

const Account = () => {
  return (
    <View style={styles.container}>
      {/* Include the Header */}
      <Header />

      {/* Nama */}
      <View className='pt-14'>
        <Text className='text-[20px] justify-center text-center font-pregular'>Miaw</Text>
      </View>

      {/* Use the TabSection Component */}
      <TabSection />

      {/* Additional Account Page Content */}
      <View style={styles.contentSection}>
        <Text style={styles.text}>Mi</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the container to take up full height
  },
  contentSection: {
    flex: 1, // Take up the remaining space
    alignItems: 'center', // Center content
    justifyContent: 'center', // Center content vertically
  },
  text: {
    color: 'black', // Set the text color
    fontSize: 18, // Set the font size for better visibility
  },
});

export default Account;

