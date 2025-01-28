import React from "react";
import { Text, Pressable } from "react-native";

export default function Button({
  children,
  className,
  onPress,
}: {
  children?: React.ReactNode;
  className?: string;
  onPress?: () => void;
}) {
  return (
    <Pressable
      className={`bg-white rounded-md p-2 ${className} justify-center items-center`}
      onPress={onPress}
    >
      <Text className="font-semibold">{children}</Text>
    </Pressable>
  );
}
