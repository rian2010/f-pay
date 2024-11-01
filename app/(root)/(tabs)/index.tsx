import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

import images from '@/constants/images';
import { useNavigation } from '@react-navigation/native';

const Home = () => {

  const navigation = useNavigation();

  const handleNotification = () => {
    navigation.navigate('notifikasi');
  };

  const handleActionButtonPress = (label) => {
    switch (label) {
      case 'Transfer':
        navigation.navigate('TransferScreen'); // Adjust with your actual screen name
        break;
      case 'Top-up':
        navigation.navigate('TopUpScreen'); // Adjust with your actual screen name
        break;
      case 'Scan QR':
        navigation.navigate('qr'); // Adjust with your actual screen name
        break;
      case 'Lainnya':
        navigation.navigate('menu'); // Adjust with your actual screen name
        break;
      default:
        console.warn(`No navigation defined for ${label}`);
    }
  };

  return (
    <View className="flex-1" style={{ backgroundColor: '#f3f3f8' }}>
      <View style={styles.headerContainer}>
        <View style={styles.profileSection}>
          <Image
            source={images.avatar}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.greetingText}>Hi, Miaw</Text>
            <Text style={styles.dateText}>Rabu, Feb 14, 2024</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleNotification}>
          <Icon name="bell" size={28} color="#32A7E2" />
        </TouchableOpacity>
      </View>

      <View className="items-center">
        <Text className="text-[16px] text-center font-pregular" style={{ color: 'rgba(8, 36, 49, 0.5)' }}>
          Saldo Anda
        </Text>
        <Text className="text-[36px] text-center font-pregular text-[#2C2C63]">
          Rp 10,000,000
        </Text>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionButtonContainer}>
        {['Transfer', 'Top-up', 'Scan QR', 'Lainnya'].map((label, index) => (
          <View key={index} style={{ alignItems: 'center' }}>
            <TouchableOpacity
              onPress={() => handleActionButtonPress(label)}
              style={{
                width: 55,
                height: 55,
                borderRadius: 20,
                backgroundColor: ['#32A7E2', '#B548C6', '#FF8700', '#22B07D'][index],
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Ionicons name={['send', 'wallet', 'qr-code', 'grid'][index]} size={20} color="white" />
            </TouchableOpacity>
            <Text style={{ color: '#a0a3bd', fontSize: 13, marginTop: 5, fontFamily: "PoppinsMedium" }}>{label}</Text>
          </View>
        ))}
      </View>

      {/* Transaction List */}
      <View style={styles.transactionContainer}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 13 }}>Transaksi</Text>
        {[
          { type: 'Grosir', date: 'Nov 17', description: 'Minimarket Anugrah', amount: '326.800', icon: 'cart', iconColor: '#32A7E2' },
          { type: 'Hiburan', date: 'Nov 17', description: 'Hiburan Sepak Bola', amount: '326.800', icon: 'game-controller', iconColor: '#B548C6' },
          { type: 'Peralatan', date: 'Nov 17', description: 'DSLR Camera', amount: '326.800', icon: 'camera', iconColor: '#FF8700' },
          { type: 'ATK', date: 'Nov 17', description: 'Alat tulis', amount: '326.800', icon: 'pencil', iconColor: '#22B07D' },
        ].map((transaction, index) => (
          <View key={index} style={styles.transactionItem}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={styles.transactionIconBackground}>
                <Ionicons name={transaction.icon} size={20} color={transaction.iconColor} />
              </View>
              <View>
                <Text style={{ fontWeight: 'bold' }}>{transaction.type}</Text>
                <Text style={{ color: '#a0a3bd', fontSize: 12 }}>{transaction.date}</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={{ fontWeight: 'bold' }}>{transaction.amount}</Text>
              <Text style={{ color: '#a0a3bd', fontSize: 12 }}>{transaction.description}</Text>
            </View>
          </View>
        ))}
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 40,
    padding: 20,
    margin: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 15,
  },
  greetingText: {
    fontSize: 16,
    fontFamily: "PoppinsBold",
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    color: '#888',
    fontFamily: "PoppinsRegular",
  },
  actionButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: 15,
  },
  transactionContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 20,
    marginTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  transactionIconBackground: {
    width: 40,
    height: 40,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F8',
    marginRight: 10,
  },
});

export default Home;

