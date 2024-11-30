import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import * as Contacts from 'expo-contacts';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function Kontak() {
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers],
        });

        if (data.length > 0) {
          setContacts(data);
        }
      }
      setLoading(false);
    })();
  }, []);

  const filteredContacts = contacts.filter((contact) =>
    contact.name?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#23f2d2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={{ position: 'absolute', left: 2 }}>
            <Ionicons name="arrow-back" size={21} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Kontak</Text>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#aaa"
            onChangeText={setSearch}
            value={search}
          />
          <MaterialCommunityIcons name='magnify' size={24} />
        </View>


        {/* Section Title */}
        <Text style={styles.sectionTitle}>Kontak</Text>

        {/* Contacts */}
        {filteredContacts.map((contact) => (
          <View style={styles.contactItem} key={contact.id}>
            {/* User Icon */}
            <View style={styles.iconContainer}>
              <Icon name="person" size={30} color="#666" />
            </View>

            {/* Contact Info */}
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{contact.name || 'No Name'}</Text>
              <Text style={styles.contactDetail}>
                No Hp {' '}
                {contact.phoneNumbers?.[0]?.number || 'No Phone Number'}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
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
  searchContainer: {
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingLeft: 10,
    color: '#333',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center', // Ensures everything in the row is vertically aligned
    marginBottom: 10,
    paddingVertical: 12,
    borderRadius: 10,
    shadowColor: '#000',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25, // Ensures the container is circular
    backgroundColor: '#e0e0e0', // Light gray background for the icon
    alignItems: 'center',
    justifyContent: 'center', // Center the icon
    marginRight: 15, // Spacing between the icon and text
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#444',
    fontFamily: 'PoppinsRegular'
  },
  contactDetail: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

