import {
  View,
  Text,
  Pressable,
  ImageBackground,
  ImageSourcePropType,
} from "react-native";
import Button from "./ui/button";

export default function Card({
  title,
  image,
  onPress,
}: {
  title: string;
  image: ImageSourcePropType;
  onPress: () => void;
}) {
  return (
    <View className="px-4 py-2">
      <Pressable
        onPress={onPress}
        className="h-64 rounded-3xl bg-[#2A2B31] overflow-hidden shadow-md"
      >
        <ImageBackground
          source={image}
          resizeMode="cover"
          className="flex-1 border-md"
        >
          <View className="bg-black/30 flex-1 justify-end items-center">
            <Text className="text-white text-lg font-bold mb-3">{title}</Text>
          </View>
        </ImageBackground>
        <View className="flex flex-col items-center justify-center p-3 bg-[#32333a]">
          <Button
            className="rounded-2xl py-2 px-4 w-full text-center shadow-lg items-center justify-center h-12"
            onPress={onPress}
          >
            <Text className="text-base font-semibold">Start Meditation</Text>
          </Button>
        </View>
      </Pressable>
    </View>
  );
}
