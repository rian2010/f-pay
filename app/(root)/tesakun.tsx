import React from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CountryFlag from 'react-native-country-flag';
import images from '@/constants/images';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Avatar Section */}
      <View style={styles.avatarContainer}>
        <Image source={images.avatar} style={styles.avatar} />
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        {/* Full Name */}
        <Text style={styles.label}>Nama Lengkap</Text>
        <TextInput style={styles.input} placeholder="Twilight" />

        {/* Email */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="twilight@gmail.com"
          keyboardType="email-address"
        />

        {/* Birth Date */}
        <Text style={styles.label}>Tanggal Lahir</Text>
        <View style={styles.inputWithIcon}>
          <TextInput style={styles.input} placeholder="15/03/2003" />
          <MaterialCommunityIcons name="calendar" size={24} color="gray" />
        </View>

        {/* Phone Number */}
        <Text style={styles.label}>No Telepon</Text>
        <View style={styles.inputWithFlag}>
          <View style={styles.flagContainer}>
            <CountryFlag isoCode="ID" size={24} />
          </View>
          <TextInput
            style={styles.inputPhone}
            placeholder="+62 8726-0592-908"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>SIMPAN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 14,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  inputWithFlag: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  flagContainer: {
    width: 24,
    height: 24,
    borderRadius: 12, // Fully rounded flag
    overflow: 'hidden',
    marginRight: 8,
  },
  inputPhone: {
    flex: 1,
    fontSize: 14,
  },
  saveButton: {
    backgroundColor: '#32A7E2',
    height: 50,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;

