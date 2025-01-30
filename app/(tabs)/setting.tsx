import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { HelpCircle, Mail, LucideIcon } from "lucide-react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";

export default function Setting() {
  return (
    <SafeAreaView className="flex-1 bg-[#121214]">
      <Text className="text-white text-3xl font-bold mb-5 px-4">Settings</Text>
      <ScrollView>
        <View className="flex-col px-1 justify-between">
          <SettingsItem
            Icon={HelpCircle}
            title="FAQ"
            link={
              "https://cerulean-exhaust-41f.notion.site/Simple-Meditation-18b807de3a7080989600feb405008de4?pvs=73"
            }
          />
          <SettingsItem
            Icon={Mail}
            title="Contact Us"
            link={
              "https://cerulean-exhaust-41f.notion.site/Simple-Meditation-18b807de3a7080989600feb405008de4?pvs=73"
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SettingsItem = ({
  Icon,
  title,
  link,
}: {
  Icon: LucideIcon;
  title: string;
  link?: any;
}) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between px-4 py-3">
      <Link href={link}>
        <View className="flex-row items-center">
          <Icon color="white" size={24} />
          <Text className="text-white text-lg ml-4">{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={24} color="white" />
      </Link>
    </TouchableOpacity>
  );
};
