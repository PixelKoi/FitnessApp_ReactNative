import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
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
	const { maxTime, medStreak, percentageComplete } = useAppSelector(
		(state) => state.meditation
	);
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

		dispatch(
			setTimerStates({
				startDate: currentDate.toString(),
				endDate: endTime.toString(),
			})
		);
		setStartTime(currentDate);
		setEndTime(endTime);
		setClicked((prevClicked) => !prevClicked);
	};

	const handleEndFast = () => {
		setClicked((prevClicked) => !prevClicked);
	};

	return (
		<View className="mt-auto flex flex-col justify-center bg-background ">
			{/* Clock section */}
			<View className="mt-auto mb-4 -top-2">
				<View className="z-10">
					<View className="bg-secondary h-8 w-52 self-center rounded-xl">
						<TouchableOpacity
							className="flex-row h-8 w-52"
							onPress={() =>
								showTimerList === false
									? setShowTimerList(true)
									: setShowTimerList(false)
							}>
							<Text className="ml-4 text-center my-auto text-primary">
								{fasting}
							</Text>
							<Icon
								style={{
									color: "#E07594",
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
						<Surface className="w-52 bg-background rounded-xl self-center mt-12 absolute z-10">
							<TouchableOpacity
								className="flex-row h-8 w-52"
								onPress={() => {
									setFasting("5 minutes");
									dispatch(setMaxTime(5));
									setShowTimerList(false);
								}}>
								<Text className="my-auto text-xs ml-2 text-primary">
									5 minutes
								</Text>
								{maxTime === 5 && (
									<CheckMark
										style={{
											color: "#E07594",
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
								<Text className="my-auto text-xs ml-2 text-primary">
									10 minutes
								</Text>
								{maxTime === 10 && (
									<CheckMark
										style={{
											color: "#E07594",
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
								<Text className="my-auto text-xs ml-2 text-primary">
									15 minutes
								</Text>
								{maxTime === 15 && (
									<CheckMark
										style={{
											color: "#E07594",
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
								<Text className="my-auto text-xs ml-2 text-primary">
									20 minutes
								</Text>
								{maxTime === 20 && (
									<CheckMark
										style={{
											color: "#E07594",
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
								<Text className="my-auto text-xs ml-2 text-primary">
									30 minutes
								</Text>
								{maxTime === 30 && (
									<CheckMark
										style={{
											color: "#E07594",
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
				</View>

				<View className="mt-6 z-0">
					<MedTimer />
				</View>

				<Text className="text-SM text-center mt-4 text-primary font-bold">
					Elapsed: [{percentageComplete}]%
				</Text>
			</View>
			<View className="mx-auto mb-10">
				<MaterialCommunityIcons name="meditation" size={60} color="#E07594" />
			</View>
			<Button
				className="mt-auto mb-12 w-60 mx-auto bg-primary"
				icon="brain"
				mode="contained"
				onPress={clicked === false ? handleStartFast : handleEndFast}>
				{clicked === false ? "Start Meditating" : "End Meditating"}
			</Button>
		</View>
	);
};

export default Meditation;
