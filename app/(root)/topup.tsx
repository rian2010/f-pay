import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetMethods } from '@/components/topupMethod';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from 'expo-router';

const TopUpScreen = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const pressHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const [amount, setAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState('Instan');

  const handleAmountPress = (value: number) => {
    setAmount(value);
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <View style={styles.container}>
          {/* Header */}
          <View className="flex-row items-center justify-center">
            <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 2 }}>
              <Ionicons name="arrow-back" size={21} color="#333" />
            </TouchableOpacity>
            <Text className="font-pregular mb-[21px] mt-[20px] text-[18px]">Top Up</Text>
          </View>

          {/* Top Up Methods */}
          <View style={styles.methodContainer}>
            <TouchableOpacity
              style={[
                styles.methodButton,
                selectedMethod === 'Instan' && styles.activeMethodButton,
              ]}
              onPress={() => setSelectedMethod('Instan')}
            >
              <Text style={selectedMethod === 'Instan' ? styles.activeMethodText : styles.methodText}>
                Instan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.methodButton,
                selectedMethod === 'Metode lain' && styles.activeMethodButton,
              ]}
              onPress={() => setSelectedMethod('Metode lain')}
            >
              <Text style={selectedMethod === 'Metode lain' ? styles.activeMethodText : styles.methodText}>
                Metode lain
              </Text>
            </TouchableOpacity>
          </View>

          {/* Top Up Amount Section */}
          <View style={styles.amountContainer}>
            <Text className='font-pregular text-lg items-center justify-center'>Rp.</Text>
            <TextInput
              style={styles.amountInput}
              value={amount.toString()}
              keyboardType="numeric"
              onChangeText={(text) => {
                const parsedAmount = parseInt(text, 10) || 0;
                setAmount(parsedAmount);
              }}
              placeholder="Enter amount"
              placeholderTextColor="#aaa"
            />
          </View>

          {/* Preset Amount Options */}
          <View style={styles.presetContainer}>
            {[10000, 20000, 50000, 70000, 100000, 150000].map((value) => (
              <TouchableOpacity
                key={value}
                style={styles.presetButton}
                onPress={() => handleAmountPress(value)}
              >
                <Text style={styles.presetText}>{`${value / 1000}k`}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Spacer to push elements down */}
          <View style={{ flex: 1 }} />

          {/* Bottom Actions */}
          <View style={styles.whiteContainer}>
            <TouchableOpacity style={styles.warningContainer} onPress={() => pressHandler()}>
              <View className="bg-red-500 rounded-[25px] h-[28px] w-[28px] items-center justify-center mr-2">
                <Ionicons name="ellipsis-horizontal-sharp" size={20} color="white" />
              </View>
              <View className="flex-col">
                <Text>TopUp saldo dengan</Text>
                <Text className="mr-[4px] text-red-500 text-[12px]">Pilih metode top up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Konfirmasi & top up</Text>
              <Text style={styles.confirmAmount}>Rp{amount}</Text>
              <Ionicons name="arrow-forward-outline" size={18} color="#fff" style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <BottomSheet
            ref={bottomSheetRef}
            snapTo={'75%'}
            backgroundColor={'white'}
            backDropColor={'black'}
          />
        </View>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  methodContainer: {
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  methodButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeMethodButton: {
    backgroundColor: '#3b82f6',
  },
  methodText: {
    color: '#333',
  },
  activeMethodText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  amountContainer: {
    flexDirection: 'row',
    backgroundColor: '#dfe4ea',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  amountInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
    width: '100%',
    textAlign: 'center',
    padding: 5,
    backgroundColor: '#dfe4ea',
    borderRadius: 10,
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  presetButton: {
    backgroundColor: '#f0f1f6',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  presetText: {
    fontSize: 16,
    color: '#555',
  },
  whiteContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff3f3',
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
  },
  confirmButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  confirmAmount: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  arrowIcon: {
    marginLeft: 8,
  },
});

export default TopUpScreen;

