import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AccountScreen = () => {
  const [isFacePayEnabled, setIsFacePayEnabled] = useState(false);

  const toggleFacePay = () => {
    setIsFacePayEnabled(previousState => !previousState);
  };

  return (
    <View style={styles.container}>
      {/* Content Section */}
      <Text style={styles.todayText}>Today</Text>
      <View style={styles.optionContainer}>
        <View style={styles.option}>
          <MaterialCommunityIcons name="lock" size={24} color="#4C9AFF" />
          <Text style={styles.optionText}>Ganti Pin</Text>
        </View>
        <View style={styles.option}>
          <MaterialCommunityIcons name="face-recognition" size={24} color="#4C9AFF" />
          <Text style={styles.optionText}>Face Pay</Text>
          <Switch
            value={isFacePayEnabled}
            onValueChange={toggleFacePay}
            trackColor={{ false: "#767577", true: "#4C9AFF" }}
            thumbColor={isFacePayEnabled ? "#4C9AFF" : "#f4f3f4"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 16,
    color: '#333',
  },
  todayText: {
    fontSize: 16,
    color: '#A0A0A0',
    marginBottom: 10,
  },
  optionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

export default AccountScreen;
