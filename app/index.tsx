import { View, Text, ImageBackground } from "react-native";
import Button from "@/components/ui/button";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("@/assets/images/desert.jpg")}
      resizeMode="cover"
      className="flex-1 border-md h-screen"
    >
      <View className="flex-1 justify-end items-center">
        <View className="bg-black w-full h-64 rounded-[40px] flex flex-col items-center p-4">
          <View className="flex flex-col items-center justify-center">
            <Text className="text-white text-3xl font-bold mb-10">
              Simple Meditation
            </Text>
          </View>
          <Button
            className="rounded-xl px-4 w-full text-center shadow-lg h-12"
            onPress={() => router.push("/(tabs)/main-meditation")}
          >
            Get Started
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
}
