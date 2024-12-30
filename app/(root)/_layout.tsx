import { Stack } from "expo-router"

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(profile)" options={{ headerShown: false }} />
      <Stack.Screen name="notifikasi" options={{
        title: 'Notifikasi',
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'PoppinsRegular',
          fontSize: 18
        },
        headerStyle: {
          backgroundColor: '#f3f3f8'
        },

      }} />
      <Stack.Screen name="history" options={{
        title: 'History Transaksi',
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'PoppinsRegular',
          fontSize: 18
        },
        headerStyle: {
          backgroundColor: '#f3f3f8'
        },

      }} />
      <Stack.Screen name="topup" options={{
        title: 'Top-Up',
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'PoppinsRegular',
          fontSize: 18
        },
        headerStyle: {
          backgroundColor: '#f3f3f8'
        },

      }} />
      <Stack.Screen name="actionTransfer" options={{
        title: 'Transfer',
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'PoppinsRegular',
          fontSize: 18
        },
        headerStyle: {
          backgroundColor: '#f5f5f5'
        },
      }} />
      <Stack.Screen name="contacts" options={{
        title: 'Contacts',
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'PoppinsRegular',
          fontSize: 18
        },
        headerStyle: {
          backgroundColor: '#fff'
        }
      }}
      />
      <Stack.Screen name="transferPage" options={{
        title: 'Transfer',
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontFamily: 'PoppinsRegular',
          fontSize: 18
        },
        headerStyle: {
          backgroundColor: '#32A7E2'
        },
        headerTintColor: '#fff'
      }}
      />

    </Stack>

  )
}

export default _layout
