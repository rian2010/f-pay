import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Modal } from 'react-native';
import InputField from '@/components/FormField';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

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

  // State for showing the date picker
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // Validation function
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
    if (!birthdate.trim()) {
      newErrors.birthdate = 'Tanggal lahir harus diisi';
      valid = false;
    }
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'No telepon harus diisi';
      valid = false;
    } else if (!/^\+62\s\d{3,}-\d{3,}-\d{3,}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Format nomor telepon tidak valid (contoh: +62 812-3456-7890)';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || new Date();
    setShowDatePicker(false);
    // Format date as DD/MM/YYYY
    const formattedDate = currentDate.toLocaleDateString('en-GB'); // English (UK) format: DD/MM/YYYY
    setBirthdate(formattedDate);
  };

  // Handler for next step
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
        <TouchableOpacity
          style={[
            styles.inputField,
            errors.birthdate && styles.errorBorder,
          ]}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={styles.inputValue}>{birthdate || 'Pilih tanggal'}</Text>
        </TouchableOpacity>
        {errors.birthdate ? <Text style={styles.errorTextInput}>{errors.birthdate}</Text> : null}


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

      {/* Date Picker Modal */}
      {showDatePicker && (
        <Modal transparent={true} animationType="slide" visible={showDatePicker}>
          <View style={styles.modalView}>
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          </View>
        </Modal>
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
    borderWidth: 1, // Add border
    borderColor: '#ccc', // Neutral border color
    borderRadius: 8, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 15, // Add some padding for a better look
    backgroundColor: '#FFF',
  },
  inputLabel: {
    fontSize: 12,
    fontFamily: 'PoppinsMedium',
  },
  inputValue: {
    fontSize: 16,
    fontFamily: 'PoppinsMedium',
    color: '#333',
    marginTop: 5,
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
  errorText: {
    fontSize: 12,
    color: 'red',
    fontFamily: 'PoppinsRegular',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#01ADEF',
    borderRadius: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default SignUpPage;

