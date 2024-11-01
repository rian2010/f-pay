import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView, Image, StatusBar } from 'react-native';
import TabSection from '@/components/in_out';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import images from '@/constants/images';

const Account = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1, paddingTop: 20, paddingBottom: 20 }}>
      <View style={styles.container}>


        <View style={{ backgroundColor: '#32A7E2' }}>
          <Text style={styles.headerTitle}>Akun</Text>
        </View>

        <View style={styles.headerBackground}>
          <View style={styles.avatarContainer}>
            <Image
              source={images.avatar} // Replace with actual avatar image URL
              style={styles.avatar}
            />
          </View>
        </View>

        <View className='pt-14'>
          <Text className='text-[20px] justify-center text-center font-pregular'>Miaw</Text>
        </View>

        <TabSection />

        <View style={styles.maincontent} className="w-[327px] h-[151px] mt-7 bg-white p-4">
          <TouchableOpacity className="flex-row items-center justify-between mb-4" onPress={() => {/* handle Profile press */ }}>
            <View className="flex-row items-center">
              <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
                <MaterialCommunityIcons name='account' size={24} color="#32A7E2" />
              </View>
              <Text className="text-sm font-pregular">Profil</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={24} color="#32A7E2" />
          </TouchableOpacity>

          <View className="w-full h-[1px] bg-[#E0E0E0]" />

          <TouchableOpacity className="flex-row items-center justify-between mt-4" onPress={() => {/* handle Account press */ }}>
            <View className="flex-row items-center">
              <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
                <MaterialCommunityIcons name='shield-account-variant' size={24} color="#32A7E2" />
              </View>
              <Text className="text-sm font-pregular">Akun</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={24} color="#32A7E2" />
          </TouchableOpacity>
        </View>

        <View style={styles.maincontent} className="w-[327px] h-[221px] mt-7 bg-white p-4">
          <TouchableOpacity className="flex-row items-center justify-between mb-4" onPress={() => {/* handle FAQ press */ }}>
            <View className="flex-row items-center">
              <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
                <MaterialCommunityIcons name='frequently-asked-questions' size={24} color="#32A7E2" />
              </View>
              <Text className="text-sm font-pregular">Pusat Bantuan</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={24} color="#32A7E2" />
          </TouchableOpacity>

          <View className="w-full h-[1px] bg-[#E0E0E0]" />

          <TouchableOpacity className="flex-row items-center justify-between mt-4 mb-4" onPress={() => {/* handle Terms press */ }}>
            <View className="flex-row items-center">
              <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
                <MaterialCommunityIcons name='file-document' size={24} color="#32A7E2" />
              </View>
              <Text className="text-sm font-pregular">Syarat & Ketentuan</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={24} color="#32A7E2" />
          </TouchableOpacity>

          <View className="w-full h-[1px] bg-[#E0E0E0]" />

          <TouchableOpacity className="flex-row items-center justify-between mt-4" onPress={() => {/* handle Log Out press */ }}>
            <View className="flex-row items-center">
              <View className="bg-[#e8f4fa] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
                <MaterialCommunityIcons name='logout' size={24} color="#E74C3C" />
              </View>
              <Text className="text-sm font-pregular">Log Out</Text>
            </View>
            <MaterialCommunityIcons name='chevron-right' size={24} color="#E74C3C" />
          </TouchableOpacity>
        </View>
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
    marginBottom: -50, // Adjust to pull the avatar upwards to overlap the blue section
    backgroundColor: '#FFFFFF',
    padding: 5,
    borderRadius: 55, // Border radius increased to match new size
  },
  avatar: {
    width: 100,   // Increased width of the avatar
    height: 100,  // Increased height of the avatar
    borderRadius: 50, // Circular avatar (half of 100)
  },

  headerTitle: {
    fontSize: 19,
    fontFamily: 'PoppinsMedium',
    textAlign: 'center',
    marginBottom: 21,
    marginTop: 31,
    color: 'white'
  },

});

export default Account;

