import { USDA_API_KEY } from "./config";
import { Track } from "react-native-track-player";

export const COUNT_INCREASE = "COUNT_INCREASE";
export const COUNT_DECREASE = "COUNT_DECREASE";

export const REQUEST_USDA_API_PENDING = "REQUEST_USDA_API_PENDING";
export const REQUEST_USDA_API_SUCCESS = "REQUEST_USDA_API_SUCCESS";
export const REQUEST_USDA_API_FAILED = "REQUEST_USDA_API_FAILED";

export const params = {
	api_key: USDA_API_KEY,
	dataType: ["Survey (FNDDS)", "Branded"],
	pageSize: 5,
	pageNumber: 5,
};

//Audio Tracks

export const playListData: Track[] = [
	{
		id: 1,
		title: "hour storm",
		artist: "King",
		url: require("./assets/audio/hourStorm.mp3"),
	},
];

export const sleepTracks: Track[] = [
	{
		id: 1,
		title: "Ambient Oceans",
		artist: "King",
		url: require("./assets/audio/hourStorm.mp3"),
	},
];

export const pureToneTracks: Track[] = [
	{
		id: 1,
		title: "Delta Wave - Pure Tone (0.5hz)",
		url: require("./assets/audio/Binaural/PureTone/DeltaWave_PureTone_0.5.mp3"),
		tag: ["delta", "sleep", "pureTone"],
	},
	{
		id: 2,
		title: "Theta Wave - Pure Tone (7hz)",
		url: require("./assets/audio/Binaural/PureTone/ThetaWave_PureTone_7.mp3"),
		tag: ["theta", "relax", "pureTone"],
	},
	{
		id: 3,
		title: "Alpha Wave - Pure Tone (10hz)",
		url: require("./assets/audio/Binaural/PureTone/AlphaWave_PureTone_10.mp3"),
		tag: ["alpha", "focus", "pureTone"],
	},
	{
		id: 4,
		title: "Beta Wave - Pure Tone (20hz)",
		url: require("./assets/audio/Binaural/PureTone/BetaWave_PureTone_20.mp3"),
		tag: ["beta", "alertness", "pureTone"],
	},
];
