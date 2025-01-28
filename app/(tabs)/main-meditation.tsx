import { MEDITATION_DATA } from "@/constants/MeditationData";
import { Text, SafeAreaView, FlatList } from "react-native";
import { useRouter } from "expo-router";
import meditationImages from "@/constants/meditation-images";
import Card from "@/components/card";

export default function MainMeditation() {
  const router = useRouter();
  return (
    <SafeAreaView className="flex-1 bg-[#212122]">
      <Text className="text-white text-3xl font-bold mb-3 px-4">
        Feature meditations
      </Text>
      <FlatList
        data={MEDITATION_DATA}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            image={meditationImages[item.id - 1]}
            onPress={() => router.push(`/meditate/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </SafeAreaView>
  );
}
