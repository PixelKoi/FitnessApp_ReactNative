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

	const navigation = useNavigation();

	const { colors } = useAppSelector((state) => state.theme);

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
				{/* <View className="items-center">
					<Image source={GirlMeditating} />
				</View> */}

				<View style={{ width: 126 }} className=" mx-auto ">
					<Text style={{ color: "#fff" }} className="text-3xl"></Text>
				</View>
			</View>
			<View className="mt-auto mb-20">
				<Text style={{ color: "#ffff" }} className="text-center">
					{track[0].title}
				</Text>
				<MusicPlayer />
			</View>
		</View>
	);
};

export default MeditationTimer;
