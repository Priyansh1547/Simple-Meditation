import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

const Page = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#917DF0",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#121214",
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="main-meditation"
        options={{
          tabBarLabel: "home",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="home-variant"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          tabBarLabel: "setting",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="cog" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Page;
