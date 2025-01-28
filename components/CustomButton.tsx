import React from "react";
import { View, Text, Pressable, TouchableOpacity } from "react-native";

interface CustomButtonProps {
  onPress?: () => void;
  title: string;
  textStyles?: string;
  className?: string;
}

const CustomButton = ({
  onPress,
  title,
  textStyles,
  className,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className={`bg-white rounded-md p-2 ${className} justify-center items-center h-12`}
      onPress={onPress}
    >
      <Text className={`text-primary font-semibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
