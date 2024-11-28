import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentSummaryScreen = () => {
  return (
    <View style={styles.container}>
      {/* Icon with Background */}
      <View style={styles.iconContainer}>
        <View style={styles.iconBackground}>
          <Ionicons name="star" size={30} color="#fff" />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.storeInfo}>
          <View style={styles.storeNameRow}>
            <View className="bg-orange-500 p-2 rounded-xl justify-center items-center mr-[8px]">
              <Ionicons name="storefront" size={25} color="#fff" />
            </View>

            <Text style={styles.storeName}>Minimarket Anugrah</Text>
          </View>
          <Text style={styles.dateText}>Nov 17, 2024</Text>
        </View>

        {/* Transaction Code */}
        <View style={styles.transactionCodeContainer}>
          <TextInput
            style={styles.transactionCode}
            placeholder="Kode Transaksi"
            editable={false}
          />
          <Ionicons name="copy-outline" size={20} color="#aaa" />
        </View>

        {/* Transaction Details */}
        <View style={styles.transactionDetails}>
          <Text style={styles.detailLabel}>No. Referensi</Text>
          <Text style={styles.detailValue}>REF8473VJQ20</Text>
          <Text style={styles.detailLabel}>Tipe Transaksi</Text>
          <Text style={styles.detailValue}>Pembayaran</Text>

          {/* Amount Details */}
          <View style={styles.amountDetails}>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Nominal</Text>
              <Text style={styles.amountValue}>Rp 50.000</Text>
            </View>
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel}>Biaya admin</Text>
              <Text style={styles.amountValue}>Rp 1.000</Text>
            </View>
          </View>

          {/* Promo Code */}
          <View style={styles.promoCodeContainer}>
            <Ionicons name="pricetags-outline" size={20} color="#aaa" />
            <Text style={styles.promoCodeText}>Promo Code</Text>
            <TouchableOpacity>
              <Text style={styles.applyButton}>APPLY</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Total Amount */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>Rp 51.000</Text>
      </View>

      {/* Pay Button */}
      <TouchableOpacity style={styles.payButton}>
        <Text style={styles.payButtonText}>Geser Untuk Bayar</Text>
        <Ionicons name="arrow-forward-outline" size={18} color="#fff" style={styles.arrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: -40,
    zIndex: 10,
  },
  iconBackground: {
    backgroundColor: '#22B07D',
    padding: 10,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 30,
    marginTop: 20,
    elevation: 3,
  },
  storeInfo: {
    marginBottom: 16,
  },
  storeNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  storeIcon: {
    marginRight: 8,
  },
  storeName: {
    fontSize: 21,
    fontFamily: 'PoppinsRegular',
    textAlign: 'justify',
    color: '#333',
  },
  dateText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 'auto'
  },
  transactionCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  transactionCode: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  transactionDetails: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 12,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  amountDetails: {
    marginTop: 8,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amountLabel: {
    fontSize: 14,
    color: '#666',
  },
  amountValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
    marginTop: 8,
  },
  promoCodeText: {
    flex: 1,
    fontSize: 14,
    color: '#aaa',
  },
  applyButton: {
    color: '#3b82f6',
    fontWeight: 'bold',
  },
  totalContainer: {
    backgroundColor: '#e6e6fa',
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  payButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  payButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  arrowIcon: {
    marginLeft: 8,
  },
})

export default PaymentSummaryScreen;
