import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { add } from "date-fns";
//Graph import
import MedTimer from "../components/MedDonutGraph";
//Redux imports
import {
	setTimerStates,
	updateMedStreak,
} from "../../../redux-manager/redux-slice/meditation-slice";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
//import icons
import GirlMeditating from "../../../assets/meditation_timer/GirlMeditating.png";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";
// Audio
import { Audio } from "expo-av";
import hourStrom from "../../../assets/audio/hourStorm.mp3";

//Todo: Add lotus icon above start meditating button
const MeditationTimer = () => {
	//Top left nav button - removed top nav
	const navigation = useNavigation();

	//Call to fasting redux
	const { maxTime, countdown } = useAppSelector((state) => state.meditation);
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	//Meditation states
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);

	//Keep track of starting / ending fast button
	const [clicked, setClicked] = useState(false);

	//start fast function
	const handleStartFast = () => {
		const currentDate = new Date();
		const duration = maxTime; // in hours
		const endTime = add(currentDate, { minutes: duration });

		const dayOfWeek = new Date().getDay();
		const currentDay = dayOfWeekMap[dayOfWeek];
		dispatch(updateMedStreak({ day: currentDay, completed: true }));

		setStartTime(currentDate);
		setEndTime(endTime);
		setClicked((prevClicked) => !prevClicked);

		dispatch(
			setTimerStates({
				startDate: currentDate.toString(),
				endDate: endTime.toString(),
			})
		);
	};

	const handleEndFast = () => {
		setClicked((prevClicked) => !prevClicked);
		setStartTime(null);
		setEndTime(null);
		dispatch(
			setTimerStates({
				startDate: null,
				endDate: null,
				countdown: "00:00:00",
				percentageComplete: 0,
			})
		);
	};

	//play music
	// const [sound, setSound] = React.useState<Audio.Sound | null>(null);

	const [sound, setSound] = React.useState<Audio.Sound>();

	async function playSound() {
		await Audio.setAudioModeAsync({
			staysActiveInBackground: true,
			shouldDuckAndroid: false,
			playThroughEarpieceAndroid: false,
			allowsRecordingIOS: false,
			playsInSilentModeIOS: true,
		});
		console.log("Loading Sound");
		const { sound } = await Audio.Sound.createAsync(
			require("../../../assets/audio/hourStorm.mp3")
		);
		setSound(sound);
		console.log("Playing Sound");
		await sound.playAsync();
	}

	async function stopSound() {
		console.log("Unloading Sound");
		sound.unloadAsync();
	}

	React.useEffect(() => {
		return sound
			? () => {
					console.log("Unloading Sound");
					sound.unloadAsync();
			  }
			: undefined;
	}, [sound]);

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
		<View style={{ backgroundColor: "#03174C" }} className="flex-1">
			{/* Clock section */}
			<View className="mt-24">
				<View className="items-center">
					<Image source={GirlMeditating} />
				</View>

				<View style={{ width: 126 }} className=" mx-auto ">
					<Text style={{ color: "#fff" }} className="text-3xl">
						{countdown}
					</Text>
				</View>
			</View>

			{/* <Button
				style={{ backgroundColor: "#fff" }}
				className="mt-32 w-60 mx-auto "
				icon="brain"
				mode="contained"
				onPress={clicked === false ? handleStartFast : handleEndFast}>
				<Text style={{ color: "black" }}>
					{clicked === false ? "Start Meditating" : "End Meditating"}
				</Text>
			</Button> */}

			<TouchableOpacity
				className="items-center justify-center mt-10"
				onPress={() => {
					if (clicked === false) {
						playSound();
						setClicked(true);
					} else {
						stopSound();
						setClicked(false);
					}
				}}>
				<View className="self-center my-auto">
					<Icon
						name={
							clicked === false ? "play-circle-outline" : "stop-circle-outline"
						}
						color={"white"}
						size={80}
					/>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default MeditationTimer;
