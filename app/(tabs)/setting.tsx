import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { HelpCircle, Mail, LucideIcon } from "lucide-react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function Setting() {
  return (
    <SafeAreaView className="flex-1 bg-[#212122]">
      <Text className="text-white text-3xl font-bold mb-5 px-4">Settings</Text>
      <ScrollView>
        <View className="flex-col px-4 justify-between">
          <SettingsItem Icon={HelpCircle} title="FAQ" />
          <SettingsItem Icon={Mail} title="Contact Us" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const SettingsItem = ({ Icon, title }: { Icon: LucideIcon; title: string }) => {
  return (
    <TouchableOpacity className="flex-row items-center justify-between px-4 py-3">
      <View className="flex-row items-center">
        <Icon color="white" size={24} />
        <Text className="text-white text-lg ml-4">{title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="white" />
    </TouchableOpacity>
  );
};
