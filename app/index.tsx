import React from "react";
import { View, Text, ImageBackground } from "react-native";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("@/assets/images/onboarding-page.jpg")}
      resizeMode="cover"
      className="flex-1 h-screen"
    >
      <View className="flex-1 justify-end items-center">
        <View className="bg-black/80 w-full rounded-t-[40px] flex flex-col items-center px-8 pt-10 pb-12">
          <View className="flex flex-col items-center justify-center space-y-4">
            <Text className="text-white text-4xl font-bold">
              Simple Meditation
            </Text>
            <Text className="text-gray-300 text-lg text-center mb-8">
              Find peace in just a few minutes a day
            </Text>
          </View>

          <Button
            className="rounded-full px-8 w-full h-14 bg-white/90"
            onPress={() => router.push("/(tabs)/main-meditation")}
          >
            <Text className="text-black text-lg font-semibold">
              Get Started
            </Text>
          </Button>

          <Text className="text-gray-400 text-sm mt-4">No account needed</Text>
        </View>
      </View>
    </ImageBackground>
  );
}
