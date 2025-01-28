import meditationImages from "@/constants/meditation-images";
import { MEDITATION_DATA, AUDIO_FILES } from "@/constants/MeditationData";
import { TimerContext } from "@/context/TimerContext";
import { router, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  ImageBackground,
  SafeAreaView,
  Pressable,
} from "react-native";
import Button from "@/components/ui/button";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";

export default function Page() {
  const { id } = useLocalSearchParams();

  const {
    duration: secondsRemaining,
    setDuration,
    duration,
  } = useContext(TimerContext);

  const [isMeditating, setMeditating] = useState(false);
  const [audioSound, setSound] = useState<Audio.Sound>();
  const [isPlayingAudio, setPlayingAudio] = useState(false);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (secondsRemaining === 0) {
      if (isPlayingAudio) audioSound?.pauseAsync();
      setMeditating(false);
      setPlayingAudio(false);
      return;
    }

    if (isMeditating) {
      timerId = setTimeout(() => {
        setDuration(secondsRemaining - 1);
      }, 1000);
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      setDuration(5 * 60);
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(AUDIO_FILES[audioFileName]);
    setSound(sound);
    return sound;
  };

  const togglePlayPause = async () => {
    let sound = audioSound;

    if (!sound) {
      sound = await initializeSound();
    }

    const status = await sound.getStatusAsync();
    if (status?.isLoaded && !isPlayingAudio) {
      await sound.playAsync();
      setPlayingAudio(true);
    } else {
      await sound.pauseAsync();
      setPlayingAudio(false);
    }
  };

  async function toggleMeditationSessionStatus() {
    if (secondsRemaining === 0) setDuration(duration);

    setMeditating(!isMeditating);

    await togglePlayPause();
  }
  async function handleReset() {
    if (audioSound) {
      await audioSound.stopAsync();
      await audioSound.unloadAsync();
      setSound(undefined);
    }
    setDuration(5 * 60);
    setMeditating(false);
    setPlayingAudio(false);
  }

  const handleAdjustDuration = () => {
    if (isMeditating) toggleMeditationSessionStatus();

    router.push("/(modal)/modal");
  };

  const formattedTimeMinutes = String(
    Math.floor(secondsRemaining / 60)
  ).padStart(2, "0");
  const formattedTimeSeconds = String(secondsRemaining % 60).padStart(2, "0");

  return (
    <SafeAreaView className="flex-1 bg-[#212122] px-4">
      <Pressable onPress={() => router.back()} className="px-4 pt-2">
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>
      <View className="flex-1 justify-center rounded-xl px-4">
        <View className="h-[70%] rounded-3xl bg-[#2A2B31] overflow-hidden shadow-md">
          <ImageBackground
            source={meditationImages[Number(id) - 1]}
            resizeMode="cover"
            className="flex-1 border-md mb-2"
          >
            <View className="bg-black/30 flex-1 justify-end items-center">
              <Text className="text-white text-2xl font-bold mb-10">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </ImageBackground>
          <View className="flex flex-col items-center justify-center p-4">
            <Button
              className="rounded-2xl py-2 px-4 w-full text-center shadow-lg items-center justify-center h-12 mb-3"
              onPress={handleAdjustDuration}
            >
              <Text className="text-base font-semibold">Adjust duration</Text>
            </Button>
            <Button
              className="rounded-2xl py-2 px-4 w-full text-center shadow-lg items-center justify-center h-12 mb-3"
              onPress={toggleMeditationSessionStatus}
            >
              <Text className="text-base font-semibold">
                {isMeditating ? "Stop" : "Start Meditation"}
              </Text>
            </Button>
            {isMeditating && (
              <Button
                className="rounded-2xl py-2 px-4 w-full text-center shadow-lg items-center justify-center h-12"
                onPress={handleReset}
              >
                <Text className="text-base font-semibold">Reset</Text>
              </Button>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
