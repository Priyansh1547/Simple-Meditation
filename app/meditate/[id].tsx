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
import Ionicons from "@expo/vector-icons/Ionicons";
import { useState, useEffect, useContext } from "react";
import { Audio } from "expo-av";
import CustomButton from "@/components/CustomButton";

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

      if (audioSound) {
        audioSound.getStatusAsync().then((status) => {
          if (status.isLoaded && status.didJustFinish) {
            audioSound.replayAsync();
          }
        });
      }
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [secondsRemaining, isMeditating]);

  useEffect(() => {
    return () => {
      audioSound?.unloadAsync();
    };
  }, [audioSound]);

  const initializeSound = async () => {
    const audioFileName = MEDITATION_DATA[Number(id) - 1].audio;

    const { sound } = await Audio.Sound.createAsync(
      AUDIO_FILES[audioFileName],
      { isLooping: true }
    );
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
    <SafeAreaView className="flex-1 bg-[#121214]">
      <Pressable onPress={() => router.back()} className="p-6">
        <Ionicons name="arrow-back" size={24} color="white" />
      </Pressable>
      <View className="flex-1 px-6 py-2">
        <View className="h-[55%] rounded-3xl overflow-hidden mb-8">
          <ImageBackground
            source={meditationImages[Number(id) - 1]}
            resizeMode="cover"
            className="flex-1"
          >
            <View className="flex-1 bg-black/30 justify-end items-center pb-8">
              <Text className="text-white/90 text-4xl font-semibold mb-2">
                {formattedTimeMinutes}:{formattedTimeSeconds}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View className="flex-1 pb-8 space-y-3">
          <CustomButton
            onPress={handleAdjustDuration}
            className="h-12 rounded-full mb-3"
            title="Adjust duration"
          />

          <CustomButton
            onPress={toggleMeditationSessionStatus}
            className="h-12 rounded-full mb-3"
            title={isMeditating ? "Pause" : "Play"}
          />

          <CustomButton
            onPress={handleReset}
            className="h-12 rounded-full mb-3"
            title="Reset Timer"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
