import { Stack } from "expo-router"

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="notifikasi" options={{
        title: 'Notifikasi',
        headerShown: true,
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
        headerShown: true,
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
      <Stack.Screen name="transfer" options={{
        title: 'Transfer',
        headerShown: true,
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
    </Stack>
  )
}

export default _layout
