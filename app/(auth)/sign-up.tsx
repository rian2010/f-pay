import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from 'react-native';
import InputField from '@/components/FormField';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [birthdate, setBirthdate] = useState<Date | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const navigation = useNavigation();

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    birthdate: '',
    phoneNumber: '',
  });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', birthdate: '', phoneNumber: '' };

    if (!name.trim()) {
      newErrors.name = 'Nama lengkap harus diisi';
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Email harus diisi';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format email tidak valid';
      valid = false;
    }
    if (!birthdate) {
      newErrors.birthdate = 'Tanggal lahir harus diisi';
      valid = false;
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'No telepon harus diisi';
      valid = false;
    } else if (!/^08\d{8,13}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Format nomor telepon tidak valid';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setBirthdate(selectedDate);
    }
  };

  const handleNextStep = () => {
    if (validateForm()) {
      console.log('Proceeding with signup');
      navigation.navigate('face-recog');
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

        <Text style={styles.inputLabel}>Tanggal Lahir</Text>
        <View>
          <TouchableOpacity
            style={[styles.inputField, errors.birthdate && styles.errorBorder]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputValue}>
              {birthdate
                ? birthdate.toLocaleDateString('en-GB') // Format: DD/MM/YYYY
                : 'Pilih tanggal'}
            </Text>
          </TouchableOpacity>
          {errors.birthdate ? (
            <Text style={styles.errorTextInput}>{errors.birthdate}</Text>
          ) : null}
        </View>

        <InputField
          label="No Telepon"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          placeholder="+62 812-3456-7890"
          icon="phone"
          iconPosition="left"
          keyboardType="phone-pad"
          errorMessage={errors.phoneNumber}
        />
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={handleNextStep}>
        <Text style={styles.buttonText}>Langkah Selanjutnya</Text>
      </TouchableOpacity>

      {/* Date Picker */}
      {showDatePicker && (
        <DateTimePicker
          value={birthdate || new Date()}
          mode="date"
          display="spinner"
          onChange={handleDateChange}
        />
      )}
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
  inputField: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: 'PoppinsMedium',
    color: '#808080',
  },
  inputValue: {
    fontSize: 16,
    fontFamily: 'PoppinsMedium',
    marginTop: 5,
    color: '#808080',
  },
  errorBorder: {
    borderColor: 'red',
  },
  errorTextInput: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'PoppinsRegular',
    marginTop: 5,
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

