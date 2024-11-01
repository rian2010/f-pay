import React from 'react';
import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
            elevation: 0,
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
                name="home"
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
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="view-grid"
                size={30}
                color={color}
              />
            ),

          }}
        />
        <Tabs.Screen
          name="pengaturan"
          options={{
            title: "Akun",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="account"
                size={30}
                color={color}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default TabLayout;
