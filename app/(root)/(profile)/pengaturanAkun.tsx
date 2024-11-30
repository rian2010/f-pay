import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Modal,
  Pressable,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { router } from 'expo-router';

const AccountScreen = () => {
  const [isFacePayEnabled, setIsFacePayEnabled] = useState(true); // Default value
  const [showModal, setShowModal] = useState(false);

  const navigation = useNavigation();

  const handleChangePassword = () => {
    router.push('/(auth)/forgotPassword')
  }

  const toggleFacePay = (value) => {
    if (!value) {
      // If the user is disabling, show the modal
      setShowModal(true);
    } else {
      // Enable the switch directly
      setIsFacePayEnabled(true);
    }
  };

  const confirmDisable = () => {
    setIsFacePayEnabled(false); // Disable the Switch
    setShowModal(false); // Close the modal
  };

  const cancelDisable = () => {
    setShowModal(false); // Close the modal without changing the Switch state
  };

  return (
    <View style={styles.container}>
      <View style={styles.maincontent} className="w-[327px] h-[161px] mt-7 bg-white p-4">
        <TouchableOpacity className="flex-row items-center justify-between mb-4" onPress={handleChangePassword}>
          <View className="flex-row items-center">
            <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
              <MaterialCommunityIcons name="lock" size={24} color="#32A7E2" />
            </View>
            <Text className="text-sm font-pregular">Ganti pin</Text>
          </View>

          <MaterialCommunityIcons name='chevron-right' size={24} color="#32A7E2" />
        </TouchableOpacity>


        <View className="w-full h-[1px] bg-[#E0E0E0]" />

        {/* Account Option */}
        <TouchableOpacity className="flex-row items-center justify-between mt-4">
          <View className="flex-row items-center">
            <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
              <MaterialCommunityIcons name="face-recognition" size={24} color="#32A7E2" />
            </View>
            <Text className="text-sm font-pregular">Akun</Text>
          </View>
          <Switch
            value={isFacePayEnabled}
            onValueChange={toggleFacePay}
            trackColor={{ false: "#767577", true: "#4C9AFF" }}
            thumbColor={isFacePayEnabled ? "#FFF" : "#f4f3f4"}
          />
        </TouchableOpacity>
      </View>

      {/* Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={showModal}
        onRequestClose={cancelDisable}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nonaktifkan FacePay?</Text>
            <Text style={styles.modalText}>
              Anda akan kehilangan akses ke pembayaran dengan wajah. Lanjutkan?
            </Text>
            <View style={styles.modalActions}>
              <Pressable style={styles.buttonOutline} onPress={cancelDisable}>
                <Text style={styles.buttonOutlineText}>Batal</Text>
              </Pressable>
              <Pressable style={styles.buttonSolid} onPress={confirmDisable}>
                <Text style={styles.buttonSolidText}>Nonaktifkan</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 20,
  },
  maincontent: {
    paddingLeft: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    flexDirection: 'column',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    fontFamily: 'PoppinsMedium',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  buttonOutline: {
    flex: 1,
    borderColor: '#32A7E2',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  buttonOutlineText: {
    color: '#32A7E2',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonSolid: {
    flex: 1,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonSolidText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 16,
  },

});

export default AccountScreen;

