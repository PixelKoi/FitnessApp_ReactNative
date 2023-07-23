import { Track } from "react-native-track-player";
import PineForest from "../../assets/audio/NatureSounds/PineForest.mp3";
import SleepWell from "../../assets/meditation_timer/sleepWell.jpg";

export const collectionTracks: Track[] = [
	{
		id: "1",
		title: "Pine Forest",
		artist: "Big Sexy",
		artwork: require("../../assets/meditation_timer/sleepWell.jpg"),
		url: require("../../assets/audio/NatureSounds/PineForest.mp3"),
	},
	{
		id: "2",
		title: "Relaxing Gamma",
		artist: "Big Sexy",
		artwork: require("../../assets/meditation_timer/sleepWell.jpg"),
		url: require("../../assets/audio/Binaural/Gamma/GammaWaves-SoothingRainBreathe_40.mp3"),
	},
];
