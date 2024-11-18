import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import InputField from '@/components/FormField';
import { useNavigation } from '@react-navigation/native';


const SignUpPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const navigation = useNavigation();

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    birthdate: '',
    phoneNumber: '',
  });

  const handleFaceRegister = () => {
    navigation.navigate('face-recog');
  }

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: '', email: '', birthdate: '', phoneNumber: '' };

    if (!name) {
      newErrors.name = 'Nama lengkap harus diisi';
      valid = false;
    }
    if (!email) {
      newErrors.email = 'Email harus diisi';
      valid = false;
    }
    if (!birthdate) {
      newErrors.birthdate = 'Tanggal lahir harus diisi';
      valid = false;
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = 'No telepon harus diisi';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      console.log('Proceeding with signup');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.subtitle}>Buat akun untuk melanjutkan</Text>

        <InputField
          label="Nama Lengkap"
          value={name}
          onChangeText={setName}
          placeholder="Nama Lengkap"
          errorMessage={errors.name}
        />
        <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="example@gmail.com"
          keyboardType="email-address"
          errorMessage={errors.email}
        />
        <InputField
          label="Tanggal Lahir"
          value={birthdate}
          onChangeText={setBirthdate}
          placeholder="DD/MM/YYYY"
          icon="calendar"
          iconPosition="right"
          keyboardType="numeric"
          errorMessage={errors.birthdate}
        />
        <InputField
          label="No Telepon"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="+62 8726-0592-908"
          icon="phone"
          iconPosition="left"
          keyboardType="phone-pad"
          errorMessage={errors.phoneNumber}
        />
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleFaceRegister}>
        <Text style={styles.buttonText}>Langkah Selanjutnya</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: 100,
  },

  subtitle: {
    fontSize: 12,
    color: '#808080',
    fontFamily: 'PoppinsRegular',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#01ADEF',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'PoppinsMedium',
  },
});

export default SignUpPage;

