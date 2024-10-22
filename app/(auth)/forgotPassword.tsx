import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, SafeAreaView } from 'react-native';

const ForgotPassword = () => {
  const [kode, setKode] = useState('');
  const [error, setError] = useState('');

  const handleForgotPassword = () => {
    if (!kode) {
      setError('Kode is required');
      return;
    }

    Alert.alert('Ganti Pin', `Kode yang dimasukkan: ${kode}`);
    setKode(''); // Reset the kode input
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Masukkan Kode</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Kode"
            value={kode}
            onChangeText={setKode}
            autoCapitalize="none"
            maxLength={7} // Limit the input to 7 characters
          />
          <TouchableOpacity style={styles.buttonSecondary} onPress={handleForgotPassword}>
            <Text style={styles.buttonText}>Kirim Ulang</Text>
          </TouchableOpacity>
        </View>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <Text style={styles.verificationText}>
          Kode verifikasi telah dikirim ke{' '}
          <Text style={styles.phoneNumber}>(+62) 0398829xxx</Text>.
        </Text>

        <Text style={styles.verificationText}>
          Kode ini akan kedaluwarsa 10 menit setelah pesan ini.
        </Text>

        <TouchableOpacity
          style={[styles.button, { opacity: kode.length === 7 ? 1 : 0.5 }]} // Change opacity based on kode length
          onPress={handleForgotPassword}
          disabled={kode.length !== 7} // Enable button only if kode length is 7
        >
          <Text style={styles.buttonText}>Ganti Pin</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  innerContainer: {
    marginTop: 20,
    width: '90%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#F9F9F9',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 12,
    marginBottom: 10,
    fontFamily: 'PoppinsRegular',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#808080',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    height: 50,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    flex: 1,
  },
  buttonSecondary: {
    backgroundColor: '#01ADEF',
    padding: 15,
    borderRadius: 20,
    marginLeft: 10,
    justifyContent: 'center',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#01ADEF',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  verificationText: {
    marginVertical: 5,
    fontSize: 14,
    color: '#808080',
    fontFamily: 'PoppinsMedium',
  },
  phoneNumber: {
    fontFamily: 'PoppinsBold',
    fontSize: 14,
  },
});

export default ForgotPassword;

