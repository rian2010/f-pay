import { Stack } from 'expo-router'

const ProfileLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="profil" options={{
          title: 'Profile',
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PoppisRegular',
            fontSize: 18
          },
          headerStyle: {
            backgroundColor: '#F8F8F8'
          }
        }} />
        <Stack.Screen name="pengaturanAkun" options={{
          title: 'Pengaturan',
          headerShown: true,
          headerShadowVisible: false,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: 'PoppisRegular',
            fontSize: 18
          },
          headerStyle: {
            backgroundColor: '#F8F8F8'
          }
        }} />

      </Stack>

    </>
  )
}

export default ProfileLayout
