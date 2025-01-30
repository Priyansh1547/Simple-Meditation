import CustomButton from "@/components/CustomButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Pressable, Text, View } from "react-native";
import { TimerContext } from "@/context/TimerContext";

const AdjustMeditationDuration = () => {
  const { setDuration, duration } = useContext(TimerContext);
  const handlePress = (duration: number) => {
    setDuration(duration);
    router.back();
  };

  return (
    <View className="flex-1 relative bg-[#121214] px-4">
      <Pressable onPress={() => router.back()} className="p-3">
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>
      <View className="flex-1 justify-center items-center">
        <View className="justify-center h-4/5">
          <View className="p-3">
            <Text className="text-center font-bold text-3xl text-white mb-10">
              Adjust your meditation duration
            </Text>
          </View>
          <View className="flex flex-col items-center justify-center px-2">
            <CustomButton
              title="3 minutes"
              className="mb-3 w-full rounded-full"
              onPress={() => handlePress(3 * 60)}
            />
            <CustomButton
              title="5 minutes"
              className="mb-3 w-full rounded-full"
              onPress={() => handlePress(5 * 60)}
            />
            <CustomButton
              title="10 minutes"
              className="mb-3 w-full rounded-full"
              onPress={() => handlePress(10 * 60)}
            />
            <CustomButton
              title="15 minutes"
              className="mb-3 w-full rounded-full"
              onPress={() => {
                handlePress(15 * 60);
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdjustMeditationDuration;
