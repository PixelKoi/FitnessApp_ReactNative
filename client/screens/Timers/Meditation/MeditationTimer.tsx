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
import FontAwesome from "react-native-vector-icons/FontAwesome5";
//Todo: Add lotus icon above start meditating button
const MeditationTimer = () => {
	//Top left nav button - removed top nav
	const navigation = useNavigation();

	const dayOfWeekMap = {
		0: "Sun",
		1: "Mon",
		2: "Tue",
		3: "Wed",
		4: "Thu",
		5: "Fri",
		6: "Sat",
	};

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

			<Button
				style={{ backgroundColor: "#fff" }}
				className="mt-32 w-60 mx-auto "
				icon="brain"
				mode="contained"
				onPress={clicked === false ? handleStartFast : handleEndFast}>
				<Text style={{ color: "black" }}>
					{clicked === false ? "Start Meditating" : "End Meditating"}
				</Text>
			</Button>
		</View>
	);
};

export default MeditationTimer;