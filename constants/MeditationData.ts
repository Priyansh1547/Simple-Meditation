export interface MeditationType {
  id: number;
  title: string;
  image: string;
  audio: string;
}

export const MEDITATION_DATA: MeditationType[] = [
  {
    id: 1,
    title: "Mountains",
    image: "mountain.png",
    audio: "mountain.mp3",
  },
  {
    id: 2,
    title: "River",
    image: "river.jpg",
    audio: "river.mp3",
  },
  {
    id: 3,
    title: "Night Sky",
    image: "Night-sky.jpg",
    audio: "night-sky.mp3",
  },
  {
    id: 4,
    title: "Sunrise",
    image: "sunrise.jpg",
    audio: "sunrise.mp3",
  },
];

export const AUDIO_FILES: { [key: string]: any } = {
  "mountain.mp3": require("@/assets/audio/mountain.mp3"),
  "river.mp3": require("@/assets/audio/river.mp3"),
  "night-sky.mp3": require("@/assets/audio/night-sky.mp3"),
  "sunrise.mp3": require("@/assets/audio/sunrise.mp3"),
};
