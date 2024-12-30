import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';

export default function Kontak() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [recentTransfers, setRecentTransfers] = useState([]); // Track recent transfers
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Image],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
      setLoading(false);
    })();
  }, []);

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredContacts(filtered.slice(0, 4));
  };

  const handleAddRecentTransfer = (contact) => {
    setRecentTransfers((prev) => [contact, ...prev].slice(0, 5)); // Add contact to recent transfers, max 5
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#065ea8" />
      </View>
    );
  }

  const showDropdown = query && filteredContacts.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.blueContainer}>
        <View style={styles.whiteContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Cari Kontak"
            value={query}
            onChangeText={handleSearch}
          />

          {/* Render recent transfers if available */}
          {recentTransfers.length > 0 ? (
            <View style={styles.recentTransfersContainer}>
              <Text style={styles.recentTitle}>Recent Transfers</Text>
              {recentTransfers.map((contact, index) => (
                <View key={index} style={styles.recentTransferItem}>
                  <Icon
                    name="person"
                    size={40}
                    color="#065ea8"
                    style={styles.avatar}
                  />
                  <Text style={styles.contactText}>{contact.name}</Text>
                </View>
              ))}
            </View>
          ) : (
            !showDropdown && (
              <>
                <LottieView
                  source={require('../../assets/images/notranscation.json')}
                  autoPlay
                  loop
                  style={styles.lottieAnimation}
                />
                <Text style={styles.noTransactionText}>
                  Tidak ada transaksi yang ditemukan
                </Text>
              </>
            )
          )}

          {/* Dropdown for search results */}
          {showDropdown && (
            <FlatList
              data={filteredContacts}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.contactItem}
                  onPress={() =>
                    navigation.navigate('actionTransfer', {
                      contact: {
                        name: item.name,
                        phoneNumbers: item.phoneNumbers,
                        imageUri:
                          item.imageAvailable && item.image
                            ? item.image.uri
                            : 'https://via.placeholder.com/150',
                      },
                      onTransferComplete: () => handleAddRecentTransfer(item),
                    })
                  }
                >
                  <Icon name="person" size={40} color="#065ea8" style={styles.avatar} />
                  <Text style={styles.contactText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={(item) => item.id}
              style={styles.dropdown}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7fb' },
  blueContainer: { backgroundColor: '#32A7E2', height: 170, justifyContent: 'center', alignItems: 'center' },
  whiteContainer: { position: 'absolute', top: 30, left: 20, right: 20, backgroundColor: '#FFFFFF', padding: 20, borderRadius: 10, zIndex: 1 },
  searchBar: { height: 40, borderColor: '#ccc', borderWidth: 1, borderRadius: 5, paddingLeft: 10, fontSize: 16, width: '100%' },
  noResultsText: { marginTop: 5, color: 'red', textAlign: 'center', paddingVertical: 10 },
  dropdown: { maxHeight: 150, marginTop: 10, width: '100%', backgroundColor: '#f0f0f0', borderRadius: 5 },
  contactItem: { flexDirection: 'row', alignItems: 'center', paddingTop: 15, paddingHorizontal: 15, paddingBottom: 15, marginBottom: 5, borderRadius: 5 },
  avatar: { marginRight: 10 },
  contactText: { fontSize: 16 },
  lottieAnimation: { width: 180, height: 150, alignSelf: 'center' },
  noTransactionText: { fontSize: 16, color: '#333', textAlign: 'center', fontFamily: 'PoppinsMedium' },
  recentTransfersContainer: { marginTop: 10 },
  recentTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  recentTransferItem: { flexDirection: 'row', alignItems: 'center', marginVertical: 5 },
});

