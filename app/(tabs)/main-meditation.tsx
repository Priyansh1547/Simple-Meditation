import React from "react";
import { MEDITATION_DATA } from "@/constants/MeditationData";
import { Text, SafeAreaView, FlatList, View, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import meditationImages from "@/constants/meditation-images";
import Card from "@/components/card";

const RecommendedCard = ({
  title,
  image,
  duration,
  onPress,
}: {
  title: string;
  image: string;
  duration: number;
  onPress: () => void;
}) => (
  <View
    className="mr-4 w-72 rounded-3xl overflow-hidden bg-white/5"
    style={{
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    }}
  >
    <View className="h-40 overflow-hidden">{image}</View>
    <View className="p-4">
      <Text className="text-white text-xl font-semibold mb-2">{title}</Text>
      <View className="flex-row items-center">
        <Text className="text-gray-400 ml-2">{duration} min</Text>
      </View>
    </View>
  </View>
);

export default function MainMeditation() {
  const router = useRouter();

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <SafeAreaView className="flex-1 bg-[#121214]">
      <View className="px-6 pt-2 pb-6">
        <Text className="text-white text-3xl font-bold">
          Good {getTimeOfDay()}
        </Text>
        <View className="flex-row items-center">
          <Text className="text-gray-400 text-sm">{formattedDate}</Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="px-2">
          <View className="space-y-4">
            {MEDITATION_DATA.map((item) => (
              <Card
                key={item.id}
                title={item.title}
                image={meditationImages[item.id - 1]}
                onPress={() => router.push(`/meditate/${item.id}`)}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 17) return "afternoon";
  return "evening";
}
