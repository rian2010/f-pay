import React, { useState, useCallback, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetMethods } from '@/components/topupMethod';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import Card from '@/components/card';

const TopUpScreen = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const pressHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const [amount, setAmount] = useState(0);
  const [selectedMethod, setSelectedMethod] = useState('Instan');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleAmountPress = (value: number) => {
    setAmount(value);
  };

  const cards = [
    { id: '1', name: 'Visa', image: 'https://www.pngall.com/wp-content/uploads/2017/05/Visa-Logo-PNG-Pic.png' },
    { id: '2', name: 'Indomaret', image: 'https://iconlogovector.com/uploads/images/2024/03/lg-65e77e076d60d-Indomaret.webp' },
  ];

  const onSelectCard = (cardId: string) => {
    // Toggle card selection (deselect if already selected)
    setSelectedCard((prevSelectedCard) => (prevSelectedCard === cardId ? null : cardId));
    if (bottomSheetRef.current) {
      bottomSheetRef.current.close(); // Close bottom sheet after selection
    }
  };

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 2 }}>
              <Ionicons name="arrow-back" size={21} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerText}>Top Up</Text>
          </View>

          {/* Top Up Methods */}
          <View style={styles.methodContainer}>
            <TouchableOpacity
              style={[styles.methodButton, selectedMethod === 'Instan' && styles.activeMethodButton]}
              onPress={() => setSelectedMethod('Instan')}
            >
              <Text style={selectedMethod === 'Instan' ? styles.activeMethodText : styles.methodText}>
                Instan
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.methodButton, selectedMethod === 'Metode lain' && styles.activeMethodButton]}
              onPress={() => setSelectedMethod('Metode lain')}
            >
              <Text style={selectedMethod === 'Metode lain' ? styles.activeMethodText : styles.methodText}>
                Metode lain
              </Text>
            </TouchableOpacity>
          </View>

          {/* Top Up Amount Section */}
          <View style={styles.amountContainer}>
            <View style={styles.amountWrapper}>
              <Text style={styles.currency}>Rp.</Text>
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
            <TouchableOpacity
              style={[styles.warningContainer, selectedCard && styles.selectedCardBackground]}
              onPress={() => pressHandler()}
            >
              {!selectedCard && (
                <View style={styles.ellipsisContainer}>
                  <Ionicons name="ellipsis-horizontal-sharp" size={20} color="white" />
                </View>
              )}
              <View style={styles.cardInfoContainer}>
                {selectedCard ? (
                  <>
                    <Image
                      source={{ uri: cards.find((c) => c.id === selectedCard)?.image }}
                      style={styles.cardImage}
                    />
                    <Text style={styles.cardName}>
                      {cards.find((c) => c.id === selectedCard)?.name}
                    </Text>
                  </>
                ) : (
                  <Text style={styles.selectMethodText}>Pilih metode top up</Text>
                )}
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.confirmAmount}>Rp. {amount}</Text>
              <Ionicons name="arrow-forward-outline" size={18} color="#fff" style={styles.arrowIcon} />
            </TouchableOpacity>
          </View>

          <BottomSheet ref={bottomSheetRef} snapTo="70%" backgroundColor="#ffffff" backDropColor="rgba(0, 0, 0, 0.5)">
            <View style={{ padding: 16 }}>
              <Text style={styles.bottomSheetTitle}>Pilih Metode Pembayaran</Text>
              {cards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  image={card.image}
                  isSelected={selectedCard === card.id}
                  onSelect={onSelectCard}
                />
              ))}
            </View>
          </BottomSheet>
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
    paddingVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  amountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currency: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
  },
  amountInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    width: 120,
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
  selectedCardBackground: {
    backgroundColor: '#D8E1F8',
  },
  ellipsisContainer: {
    backgroundColor: '#ff5c5c',
    borderRadius: 25,
    height: 28,
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    resizeMode: 'contain',
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  selectMethodText: {
    fontSize: 16,
    color: '#555',
    fontFamily: "PoppinsMedium"
  },
  confirmButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
  },
  confirmAmount: {
    fontSize: 18,
    color: '#fff',
  },
  arrowIcon: {
    marginLeft: 10,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: "PoppinsMedium",
    marginLeft: 7
  },
});

export default TopUpScreen;

