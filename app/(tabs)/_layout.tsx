import React from 'react';
import { View } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import Icon from 'react-native-vector-icons/FontAwesome'; // Import FontAwesome icons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Import MaterialCommunityIcons

// TabIcon component for FontAwesome icons
const TabIcon = ({ icon, color }) => {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Icon
        name={icon} // Use the icon name directly
        size={24} // Adjust size as needed
        color={color} // Use the color prop
      />
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#32A7E2",
          tabBarInactiveTintColor: "#D5D5E1",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            height: 67,
            elevation: 0
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="home" // Use the FontAwesome icon name for home
                color={color}
                size={30}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="menu"
          options={{
            title: "Menu",
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="view-grid" // Corrected prop: Use `name` for MaterialCommunityIcons
                size={30} // Set the size for the icon
                color={color}
              />
            ),
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: 'PoppinsRegular',
              fontSize: 18
            }
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Akun",
            headerShown: true,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account" // Corrected prop: Use `name` for MaterialCommunityIcons
                size={30} // Set the size for the icon
                color={color}
              />
            ),
            headerShadowVisible: false,
            headerTitleStyle: {
              fontFamily: 'PoppinsRegular',
              color: "white",
            },
            headerStyle: {
              backgroundColor: '#32A7E2'
            },
            headerTitleAlign: 'center'
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;

