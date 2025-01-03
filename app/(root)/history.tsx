import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const TransactionCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <MaterialCommunityIcons name="store" size={30} color="#FFA726" />
      <View style={styles.cardTextContainer}>
        <Text style={styles.storeName}>{item.store}</Text>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <Text style={styles.amount}>{item.amount}</Text>
    </View>
    <Text style={styles.storeLocation}>{item.location}</Text>
  </View>
);

const data = [
  { store: "Minimarket Anugrah", amount: "Rp 326.800", date: "Nov 17, 2024", location: "Minimarket Anugrah" },
  { store: "Minimarket Anugrah", amount: "Rp 326.800", date: "Nov 17, 2024", location: "Minimarket Anugrah" },
  { store: "Minimarket Anugrah", amount: "Rp 326.800", date: "Nov 17, 2024", location: "Minimarket Anugrah" },
];

const DikirimRoute = () => (
  <FlatList
    data={data}
    renderItem={({ item }) => <TransactionCard item={item} />}
    keyExtractor={(item, index) => index.toString()}
    contentContainerStyle={styles.list}
  />
);

const DiterimaRoute = () => (
  <View style={styles.centeredView}>
    <Text>No transactions received</Text>
  </View>
);

const TransactionHistory = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'dikirim', title: 'Dikirim' },
    { key: 'diterima', title: 'Diterima' },
  ]);

  const renderScene = SceneMap({
    dikirim: DikirimRoute,
    diterima: DiterimaRoute,
  });

  return (
    <View style={styles.container}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: '100%' }}
        style={styles.tabView}
        renderTabBar={props => (
          <View style={styles.tabBar}>
            {props.navigationState.routes.map((route, i) => (
              <TouchableOpacity
                key={route.key}
                style={[styles.tabItem, index === i && styles.activeTab]}
                onPress={() => setIndex(i)}
              >
                <Text style={index === i ? styles.activeTabText : styles.tabText}>{route.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
  tabView: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    overflow: 'hidden',
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    backgroundColor: '#32A7E2',
    borderRadius: 20,
  },
  tabText: {
    color: '#B0B0B0',
    fontSize: 16,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  storeName: {
    fontSize: 16,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3B82F6',
  },
  storeLocation: {
    fontSize: 14,
    color: '#A0A0A0',
    marginTop: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransactionHistory;

