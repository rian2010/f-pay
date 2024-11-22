import React from 'react';
import { Stack } from 'expo-router';


const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{
            title: 'Masuk',
            headerTitleStyle: {
              fontFamily: 'PoppinsRegular',
              color: "#082431"
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
            headerBackVisible: false,
            headerShown: false
          }}

        />

        <Stack.Screen
          name="sign-up"
          options={{
            title: 'Daftar',
            headerTitleStyle: {
              fontFamily: 'PoppinsRegular',
              color: "#082431"
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,

          }}
        />

        <Stack.Screen
          name="pin"
          options={{
            title: 'Masukkan Pin',
            headerTitleStyle: {
              fontFamily: 'PoppinsRegular',
              color: "#082431"
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name='forgotPassword'
          options={{
            title: 'Lupa Pin',
            headerTitleStyle: {
              fontFamily: 'PoppinsRegular',
              color: '#082431'
            },
            headerTitleAlign: 'center',
            headerShadowVisible: false
          }}
        />

      </Stack>
    </>
  );
}



export default AuthLayout;

