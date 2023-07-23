import { Track } from "react-native-track-player";
import PineForest from "../../assets/audio/NatureSounds/PineForest.mp3";
import RainThunder from "../../assets/audio/NatureSounds/RainThunder.mp3";
import RelaxingWind from "../../assets/audio/NatureSounds/RelaxingWind.mp3";

export const natureTracks: Track[] = [
	{
		id: 1,
		title: "Pine Forest",
		url: require(PineForest),
	},
	{
		id: 2,
		title: "Rain and Thunder",
		url: require(RainThunder),
	},
	{
		id: 3,
		title: "Relaxing Wind",
		url: require(RelaxingWind),
	},
];
