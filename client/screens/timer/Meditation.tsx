import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Surface } from "react-native-paper";
import { add } from "date-fns";
//Graph import
import MedTimer from "./components/MedDonutGraph";
//Redux imports
import {
	setTimerStates,
	setMaxTime,
	updateMedStreak,
} from "../../redux-manager/redux-slice/meditation-slice";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
//import icons
import Icon from "react-native-vector-icons/FontAwesome";
import CheckMark from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import GirlMeditating from "../../assets/meditation_timer/GirlMeditating.png";
//Todo: Add lotus icon above start meditating button
const Meditation = () => {
	//Top left nav button - removed top nav
	const navigation = useNavigation();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

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
	const { maxTime, medStreak, percentageComplete, countdown } = useAppSelector(
		(state) => state.meditation
	);
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	//fasting states
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [fasting, setFasting] = useState<String>("5 minutes");
	const [elapsedTimePercentage, setElapsedTimePercentage] = useState(0);

	//Keep track of starting / ending fast button
	const [clicked, setClicked] = useState(false);

	//handle Meditation mode selector
	const [showTimerList, setShowTimerList] = useState(false);

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

	return (
		<View
			style={{ backgroundColor: colors.background }}
			className="flex-1  justify-center">
			{/* Clock section */}
			<View className="my-auto">
				<View className="items-center">
					<Image source={GirlMeditating} />
				</View>

				{/* <View className="mt-6 z-0">
					<MedTimer />
				</View> */}
				<View style={{ width: 126 }} className=" mx-auto ">
					<Text style={{ color: colors.primary }} className="text-3xl">
						{countdown}
					</Text>
				</View>
				<Text
					style={{ color: colors.primary }}
					className="text-SM text-center mt-4 font-bold">
					Elapsed: [{percentageComplete}]%
				</Text>
			</View>
			{/* <View className="mx-auto mb-10">
				<MaterialCommunityIcons
					name="meditation"
					size={60}
					color={colors.primary}
				/>
			</View> */}
			<Button
				style={{ backgroundColor: colors.primary }}
				className="mt-auto mb-12 w-60 mx-auto "
				icon="brain"
				mode="contained"
				onPress={clicked === false ? handleStartFast : handleEndFast}>
				{clicked === false ? "Start Meditating" : "End Meditating"}
			</Button>
		</View>
	);
};

export default Meditation;

{
	/* <View className="z-10">
					<View
						style={{ backgroundColor: colors.secondary }}
						className="h-8 w-52 self-center rounded-xl">
						<TouchableOpacity
							className="flex-row h-8 w-52"
							onPress={() =>
								showTimerList === false
									? setShowTimerList(true)
									: setShowTimerList(false)
							}>
							<Text
								style={{ color: colors.primary }}
								className="ml-4 text-center my-auto ">
								{fasting}
							</Text>
							<Icon
								style={{
									color: colors.primary,
									marginLeft: "auto",
									marginRight: 20,
									marginTop: "auto",
									marginBottom: "auto",
								}}
								name={showTimerList === true ? "caret-up" : "caret-down"}
								size={15}
								color="black"
							/>
						</TouchableOpacity>
					</View>

					{showTimerList === true && (
						<Surface
							style={{ backgroundColor: colors.background }}
							className="w-52 rounded-xl self-center mt-12 absolute z-10">
							<TouchableOpacity
								className="flex-row h-8 w-52"
								onPress={() => {
									setFasting("5 minutes");
									dispatch(setMaxTime(5));
									setShowTimerList(false);
								}}>
								<Text
									style={{ color: colors.primary }}
									className="my-auto text-xs ml-2">
									5 minutes
								</Text>
								{maxTime === 5 && (
									<CheckMark
										style={{
											color: colors.primary,
											marginLeft: "auto",
											marginTop: "auto",
											marginBottom: "auto",
											marginRight: 10,
										}}
										size={15}
										name={"ios-checkmark-circle-outline"}
									/>
								)}
							</TouchableOpacity>
							<TouchableOpacity
								className="flex-row h-8 w-52"
								onPress={() => {
									setFasting("10 minutes");
									dispatch(setMaxTime(10));
									setShowTimerList(false);
								}}>
								<Text
									style={{ color: colors.primary }}
									className="my-auto text-xs ml-2 ">
									10 minutes
								</Text>
								{maxTime === 10 && (
									<CheckMark
										style={{
											color: colors.primary,
											marginLeft: "auto",
											marginTop: "auto",
											marginBottom: "auto",
											marginRight: 10,
										}}
										size={15}
										name={"ios-checkmark-circle-outline"}
									/>
								)}
							</TouchableOpacity>
							<TouchableOpacity
								className="flex-row h-8 w-52"
								onPress={() => {
									setFasting("15 minutes");
									dispatch(setMaxTime(15));
									setShowTimerList(false);
								}}>
								<Text
									style={{ color: colors.primary }}
									className="my-auto text-xs ml-2 ">
									15 minutes
								</Text>
								{maxTime === 15 && (
									<CheckMark
										style={{
											color: colors.primary,
											marginLeft: "auto",
											marginTop: "auto",
											marginBottom: "auto",
											marginRight: 10,
										}}
										size={15}
										name={"ios-checkmark-circle-outline"}
									/>
								)}
							</TouchableOpacity>
							<TouchableOpacity
								className="flex-row h-8 w-52"
								onPress={() => {
									setFasting("20 minutes");
									dispatch(setMaxTime(20));
									setShowTimerList(false);
								}}>
								<Text
									style={{ color: colors.primary }}
									className="my-auto text-xs ml-2 ">
									20 minutes
								</Text>
								{maxTime === 20 && (
									<CheckMark
										style={{
											color: colors.primary,
											marginLeft: "auto",
											marginTop: "auto",
											marginBottom: "auto",
											marginRight: 10,
										}}
										size={15}
										name={"ios-checkmark-circle-outline"}
									/>
								)}
							</TouchableOpacity>
							<TouchableOpacity
								className="flex-row h-8 w-52"
								onPress={() => {
									setFasting("30 minutes");
									dispatch(setMaxTime(30));
									setShowTimerList(false);
								}}>
								<Text
									style={{ color: colors.primary }}
									className="my-auto text-xs ml-2 ">
									30 minutes
								</Text>
								{maxTime === 30 && (
									<CheckMark
										style={{
											color: colors.primary,
											marginLeft: "auto",
											marginTop: "auto",
											marginBottom: "auto",
											marginRight: 10,
										}}
										size={15}
										name={"ios-checkmark-circle-outline"}
									/>
								)}
							</TouchableOpacity>
						</Surface>
					)}
				</View> */
}
