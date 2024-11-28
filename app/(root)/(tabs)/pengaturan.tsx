import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TabSection from '@/components/in_out';
import images from '@/constants/images';


import LogoutModal from '@/components/logoutmodal';
import { router } from 'expo-router';

const Account = () => {

  const handleProfile = () => {
    router.push("/(profile)/profil");
  }

  const handleAkun = () => {
    router.push("/(profile)/pengaturanAkun");
  }


  const [isModalVisible, setModalVisible] = useState(false);

  // Function to toggle the modal visibility
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Function to handle logout action
  const handleLogout = () => {
    toggleModal();
    console.log('User logged out');
    // Add your logout logic here (e.g., clearing user data, navigating to login screen)
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 20, paddingBottom: 20 }}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={{ backgroundColor: '#32A7E2' }}>
          <Text style={styles.headerTitle}>Akun</Text>
        </View>

        {/* Avatar Section */}
        <View style={styles.headerBackground}>
          <View style={styles.avatarContainer}>
            <Image source={images.avatar} style={styles.avatar} />
          </View>
        </View>

        {/* User Name Section */}
        <View className='pt-14'>
          <Text className='text-[20px] justify-center text-center font-pregular'>Miaw</Text>
        </View>

        <TabSection />

        {/* Profile and Account Options */}
        <View style={styles.maincontent} className="w-[327px] h-[151px] mt-7 bg-white p-4">
          {/* Profile Option */}
          <TouchableOpacity className="flex-row items-center justify-between mb-4" onPress={handleProfile}>
            <View className="flex-row items-center">
              <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
                <MaterialCommunityIcons name='account' size={24} color="#32A7E2" />
              </View>
              <Text className="text-sm font-pregular">Profil</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={24} color="#32A7E2" />
          </TouchableOpacity>

          <View className="w-full h-[1px] bg-[#E0E0E0]" />

          {/* Account Option */}
          <TouchableOpacity className="flex-row items-center justify-between mt-4" onPress={handleAkun}>
            <View className="flex-row items-center">
              <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
                <MaterialCommunityIcons name='shield-account-variant' size={24} color="#32A7E2" />
              </View>
              <Text className="text-sm font-pregular">Akun</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={24} color="#32A7E2" />
          </TouchableOpacity>
        </View>

        {/* Help Center and Terms Section */}
        <View style={styles.maincontent} className="w-[327px] h-[221px] mt-7 bg-white p-4">
          {/* FAQ Option */}
          <TouchableOpacity className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center">
              <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
                <MaterialCommunityIcons name='frequently-asked-questions' size={24} color="#32A7E2" />
              </View>
              <Text className="text-sm font-pregular">Pusat Bantuan</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={24} color="#32A7E2" />
          </TouchableOpacity>

          <View className="w-full h-[1px] bg-[#E0E0E0]" />

          {/* Terms & Conditions Option */}
          <TouchableOpacity className="flex-row items-center justify-between mt-4 mb-4">
            <View className="flex-row items-center">
              <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
                <MaterialCommunityIcons name='file-document' size={24} color="#32A7E2" />
              </View>
              <Text className="text-sm font-pregular">Syarat & Ketentuan</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={24} color="#32A7E2" />
          </TouchableOpacity>

          <View className="w-full h-[1px] bg-[#E0E0E0]" />

          {/* Log Out Option */}
          <TouchableOpacity
            className="flex-row items-center justify-between mt-4"
            onPress={toggleModal}
          >
            <View className="flex-row items-center">
              <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
                <MaterialCommunityIcons name='logout' size={24} color="#E74C3C" />
              </View>
              <Text className="text-sm font-pregular">Log Out</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={24} color="#E74C3C" />
          </TouchableOpacity>
        </View>

        {/* Logout Modal */}
        <LogoutModal
          isVisible={isModalVisible}
          onClose={toggleModal}
          onLogout={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  headerBackground: {
    width: '100%',
    backgroundColor: '#32A7E2',
    height: 80,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  avatarContainer: {
    marginBottom: -50,
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 55,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  headerTitle: {
    fontSize: 19,
    fontFamily: 'PoppinsMedium',
    textAlign: 'center',
    marginBottom: 21,
    marginTop: 31,
    color: 'white',
  },
});

export default Account;

