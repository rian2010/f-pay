// TabSection.js
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const TabSection = () => {
  return (
    <View style={styles.tabSection}>
      <TouchableOpacity style={styles.tabButton}>
        <View className="bg-[#22B07D] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
          <MaterialCommunityIcons name='arrow-down' size={22} color="white" />
        </View>
        <View className="flex-col">
          <Text style={styles.tabText}>Pemasukan</Text>
          <Text className="text-[#4D4D4D] font-pmedium text-[12px]">Rp 300.000</Text>
        </View>
      </TouchableOpacity>
      <View className="w-[1px] h-10 bg-[#E0E0E0] my-auto" />
      <TouchableOpacity style={styles.tabButton}>
        <View className="bg-[#FF8700] rounded-[25px] h-[34px] w-[34px] items-center justify-center mr-2">
          <MaterialCommunityIcons name='arrow-up' size={22} color="white" />
        </View>
        <View className="flex-col">
          <Text style={styles.tabText}>Pengeluaran</Text>
          <Text className="text-[#4D4D4D] font-pmedium text-[12px]">Rp 50.000</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  tabSection: {
    width: 327,
    height: 74,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 12,
  },
  tabButton: {
    padding: 10,
    flexDirection: 'row',
  },
  tabText: {
    color: '#2C3A4B',
    fontSize: 13,
    fontFamily: 'PoppinsMedium',
  },
};

export default TabSection;

