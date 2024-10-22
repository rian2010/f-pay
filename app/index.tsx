import React, { useRef, useState } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import images from "@/constants/images"; // Replace with actual image paths
import { router, useNavigation } from "expo-router";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Dipercayai Oleh Jutaan Orang, Dari Satu Bagian",
    image: images.shield,
    buttonText: "Selanjutnya",
  },
  {
    id: "2",
    title: "Gunakan Uang mu, dan Lacak Pengeluaran",
    image: images.clip,
    buttonText: "Masuk",
  },
];

const Onboarding = () => {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.push("/(auth)/sign-in");
    }
  };

  const renderItem = ({ item }: any) => (
    <View style={{ width, alignItems: "center", justifyContent: "center", padding: 20 }}>
      <Image source={item.image} style={{ width: 250, height: 250 }} resizeMode="contain" />
      <Text style={{ fontSize: 25, textAlign: "center", marginTop: 30, fontFamily: "PoppinsSemiBold", color: "#333" }}>
        {item.title}
      </Text>
      {/* Pagination Indicator */}
      <View style={{ flexDirection: "row", marginTop: 30 }}>
        {slides.map((_, i) => (
          <View
            key={i}
            style={{
              width: currentIndex === i ? 12 : 30,  // Larger size for active dot
              height: currentIndex === i ? 8 : 8, // Larger size for active dot
              borderRadius: 6, // Keep the circle shape
              marginHorizontal: 2,
              backgroundColor: currentIndex === i ? "#01ADEF" : "#D0D0D0", // Active dot is filled
              borderColor: currentIndex === i ? "#01ADEF" : "#D0D0D0", // Border color for inactive dots
              borderWidth: 1, // Outline for inactive dots
            }}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#01ADEF",
          padding: 15,
          width: "85%",
          borderRadius: 12,
          alignItems: "center",
          justifyContent: "center",
          marginVertical: 20,
          marginTop: 50,
        }}
        onPress={handleNext}
      >
        <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>{item.buttonText}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#F6F6F6" }}>
        <FlatList
          data={slides}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false} // Disable manual scroll to control it with the button
          ref={flatListRef}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Onboarding;


