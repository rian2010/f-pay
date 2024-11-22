import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

const LogoutModal = ({ isVisible, onClose, onLogout }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={150}
      animationOutTiming={150}
      backdropTransitionOutTiming={0} // Prevent flicker effect
      backdropColor="rgba(0, 0, 0, 0.5)" // Set explicit backdrop color
    >
      <View style={styles.modalContent}>
        <Text style={styles.modalText}>Anda yakin ingin keluar?</Text>

        {/* Cancel Button */}
        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={styles.cancelText}>Batal</Text>
        </TouchableOpacity>

        <View className="w-full h-[1px] bg-[#E0E0E0] mb-[10px]" />

        <TouchableOpacity onPress={onLogout} style={styles.button}>
          <Text style={styles.logoutText}>Keluar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    width: 270,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    alignSelf: 'center',
  },
  modalText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'PoppinsSemiBold'
  },
  button: {
    width: '100%',
    paddingVertical: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 16,
    marginBottom: 8.5,
    fontFamily: 'PoppinsRegular'
  },
  logoutText: {
    fontSize: 16,
    color: '#FC1E20', // Red color for "Logout"
    fontFamily: 'PoppinsRegular'
  },
});

export default LogoutModal;

