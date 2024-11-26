/* eslint-disable react-native/no-inline-styles */
import { Button, StyleSheet } from 'react-native';
import React, { useCallback, useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetMethods } from '@/components/topupMethod';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const BottomSheetScreenScroll = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const pressHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaView style={styles.container}>
          <Button title="Blank" onPress={() => pressHandler()} />
          <BottomSheet
            ref={bottomSheetRef}
            snapTo={'75%'}
            backgroundColor={'white'}
            backDropColor={'black'}
          />
        </SafeAreaView>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

export default BottomSheetScreenScroll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
