import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Keyboard from '@/components/keyboard';
import SlidingButton from '@/components/slideButton';
import { router } from 'expo-router';

const TransferScreen: React.FC = () => {
  const [amount, setAmount] = useState<string>('0');

  const handleSend = () => {
    alert('Transfer Successful');

  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 2 }}>
          <Ionicons name="arrow-back" size={21} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Transfer</Text>
      </View>

      <TouchableOpacity style={styles.userCard}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/women/68.jpg' }}
          style={styles.userImage}
        />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>Samantha</Text>
          <Text style={styles.userBank}>Bank - 0987 3422 8756</Text>
        </View>
        <Ionicons name="chevron-down" size={20} color="black" />
      </TouchableOpacity>

      <Text style={styles.amount}>Rp {amount}</Text>

      <Keyboard amount={amount} setAmount={setAmount} />

      <SlidingButton onSlideComplete={handleSend} />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    marginBottom: 21,
    marginTop: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    marginBottom: 20,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userBank: {
    fontSize: 14,
    color: '#7d7d7d',
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4a4a4a',
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default TransferScreen;

