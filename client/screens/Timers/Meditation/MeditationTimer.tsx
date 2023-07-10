import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { add } from "date-fns";
//Graph import
import MedTimer from "../components/MedDonutGraph";
//Redux imports
import {
	setPLayAudio,
	setTimerStates,
	updateMedStreak,
	setSound,
} from "../../../redux-manager/redux-slice/meditation-slice";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
//import icons
import GirlMeditating from "../../../assets/meditation_timer/GirlMeditating.png";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Audio
import { Audio } from "expo-av";
import hourStrom from "../../../assets/audio/hourStorm.mp3";
//Music Player
import { setupPlayer, addTrack } from "../../../musicPlayerServices";
import { SafeAreaView } from "react-native-safe-area-context";
import DefaultSpinner from "../../../components/Loaders/DefaultSpinner";
import TrackPlayer, {
	Event,
	Track,
	useTrackPlayerEvents,
	State,
} from "react-native-track-player";
import MusicPlayer from "./components/MusicPlayer";

//Todo: Add lotus icon above start meditating button
const MeditationTimer = ({ route }) => {
	const { track } = route.params;
	//Track states
	const [isPlayerReady, setIsPlayerReady] = useState(false);

	//Doesn't reload existing track
	//Removes last track and plays next course
	async function setup() {
		let isSetup = await setupPlayer();

		if (isSetup === true) {
			const queue = await TrackPlayer.getQueue();
			const isEmpty = queue.length === 0;

			if (isEmpty) {
				await addTrack(track);
			} else {
				const track2 = await TrackPlayer.getTrack(0);
				if (track[0].title === track2.title) {
					return;
				} else {
					await addTrack(track);
					await TrackPlayer.skipToNext();
					await TrackPlayer.remove(0);
				}
			}
		}

		setIsPlayerReady(isSetup);
	}

	useEffect(() => {
		setup();
	}, []);

	// if (!isPlayerReady) {
	// 	return (
	// 		<SafeAreaView>
	// 			<DefaultSpinner />
	// 		</SafeAreaView>
	// 	);
	// }

	//Top left nav button - removed top nav
	const navigation = useNavigation();

	// //Call to fasting redux
	// const { maxTime, countdown, playAudio } = useAppSelector(
	// 	(state) => state.meditation
	// );
	const { colors } = useAppSelector((state) => state.theme);
	// const dispatch = useAppDispatch();

	// //Meditation states
	// const [startTime, setStartTime] = useState(null);
	// const [endTime, setEndTime] = useState(null);

	// //Keep track of starting / ending fast button
	// const [clicked, setClicked] = useState(false);

	//This sets the audio mode for ios and andoird
	//Without this you will hear no audio (especially if playInSilentModeIos isn't set to true)
	// useEffect(() => {
	// 	Audio.setAudioModeAsync({
	// 		staysActiveInBackground: true,
	// 		shouldDuckAndroid: false,
	// 		playThroughEarpieceAndroid: false,
	// 		allowsRecordingIOS: false,
	// 		playsInSilentModeIOS: true,
	// 	});
	// }, []);

	// async function playSound() {
	// 	console.log("Loading Sound");
	// 	const { sound } = await Audio.Sound.createAsync(
	// 		require("../../../assets/audio/hourStorm.mp3")
	// 	);
	// 	// dispatch(setSound(sound));
	// 	console.log("Playing Sound");
	// 	await sound.playAsync();
	// }

	// async function stopSound() {
	// 	console.log("Unloading Sound");
	// 	dispatch(setSound(null));
	// 	sound.unloadAsync();
	// }

	// React.useEffect(() => {
	// return sound
	// 	? () => {
	// 			console.log("Unloading Sound");
	// 			sound.unloadAsync();
	// 	  }
	// 	: undefined;
	// }, [sound]);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "",
			headerStyle: {
				shadowColor: "transparent",
				backgroundColor: "#03174C",
			},
			headerTintColor: colors.primary,
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerLeft: () => (
				<View>
					<TouchableOpacity
						className="ml-4  rounded-full"
						onPress={() => {
							navigation.goBack();
						}}>
						<FontAwesome name="angle-left" size={30} color={"#ffff"} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<View
			style={{ backgroundColor: "#03174C" }}
			className="flex-1 justify-center">
			{/* Clock section */}
			<View className="">
				<View className="items-center">
					<Image source={GirlMeditating} />
				</View>

				<View style={{ width: 126 }} className=" mx-auto ">
					<Text style={{ color: "#fff" }} className="text-3xl"></Text>
				</View>
			</View>
			<View className="top-20">
				<Text style={{ color: "#ffff" }} className="text-center">
					{track[0].title}
				</Text>
				<MusicPlayer />
			</View>
		</View>
	);
};

export default MeditationTimer;

//start fast function
// const handleStartFast = () => {
// 	const currentDate = new Date();
// 	const duration = maxTime; // in hours
// 	const endTime = add(currentDate, { minutes: duration });

// 	const dayOfWeek = new Date().getDay();
// 	const currentDay = dayOfWeekMap[dayOfWeek];
// 	dispatch(updateMedStreak({ day: currentDay, completed: true }));

// 	setStartTime(currentDate);
// 	setEndTime(endTime);
// 	setClicked((prevClicked) => !prevClicked);

// 	dispatch(
// 		setTimerStates({
// 			startDate: currentDate.toString(),
// 			endDate: endTime.toString(),
// 		})
// 	);
// };

// const handleEndFast = () => {
// 	setClicked((prevClicked) => !prevClicked);
// 	setStartTime(null);
// 	setEndTime(null);
// 	dispatch(
// 		setTimerStates({
// 			startDate: null,
// 			endDate: null,
// 			countdown: "00:00:00",
// 			percentageComplete: 0,
// 		})
// 	);
// };
