import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Surface } from "react-native-paper";
import { format, add, getDay } from "date-fns";
import FastingTimer from "./components/FastingDonutGraph";
//Redux imports
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import {
	setMaxTime,
	setTimerStates,
} from "../../redux-manager/redux-slice/fasting-slice";
//import icons
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";

const Fasting = () => {
	//initiate fasting redux states
	const { startDate, endDate, maxTime, elapsedPercentage } = useAppSelector(
		(state) => state.fasting
	);
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	//fasting component states
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);
	const [clicked, setClicked] = useState(false);

	//handle fasting mode selector
	const [fasting, setFasting] = useState<String>("16/8 Intermittent Fast");
	const [showTimerList, setShowTimerList] = useState(false);

	//Check if fasting redux for startDate. If there is a startDate update local start and end states
	//ToDo: Check if end date has passed and then reset start and end date to ""
	useEffect(() => {
		if (startDate !== "") {
			setStartTime(new Date(startDate));
			setEndTime(new Date(endDate));
		}
	}, []);

	//Start fast
	const handleStartFast = () => {
		const currentDate = new Date();
		const duration = maxTime; // in hours
		const endTime = add(currentDate, { hours: duration });
		setStartTime(currentDate);
		setEndTime(endTime);

		//Update redux startDade and endDate
		dispatch(
			setTimerStates({
				startDate: currentDate.toString(),
				endDate: endTime.toString(),
			})
		);
		setClicked((prevClick) => !prevClick);
	};

	//End fast
	const handleEndFast = () => {
		setClicked((prevClick) => !prevClick);
		setStartTime(null);
		setEndTime(null);
		dispatch(
			setTimerStates({
				startDate: null,
				endDate: null,
				countdown: "00:00:00",
				elapsedPercentage: 0,
			})
		);
	};

	//Get day for start and end time for timer
	const getDate = (event: Date) => {
		const getWeekday = (date: Date) => {
			const weekday = getDay(date);
			const weekdays = ["Sund", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
			return weekdays[weekday];
		};
		const getTimeStringWithoutSeconds = (time: Date) => {
			return format(time, "h:mm a").replace(/^0/, "");
		};
		return getWeekday(event) + " " + getTimeStringWithoutSeconds(event);
	};

	//Top left nav button - removed top nav
	const navigation = useNavigation();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

	//Todo: put tailwind css in state and update icon fonts + checkmark fonts
	return (
		<View
			style={{ backgroundColor: colors.background }}
			className="mt-auto flex flex-col justify-center">
			{/* Clock section */}
			<View className="mt-auto mb-14">
				<View className="z-10">
					<TouchableOpacity
						style={{
							backgroundColor: colors.secondary,
							borderRadius: 10,
							height: 40,
						}}
						className="flex-row w-52 mx-auto"
						onPress={() =>
							showTimerList === false
								? setShowTimerList(true)
								: setShowTimerList(false)
						}>
						<Text
							style={{ color: colors.primary }}
							className="ml-4 text-center my-auto">
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

					{showTimerList === true && (
						<Surface
							style={{ backgroundColor: colors.background }}
							className="w-52 rounded-xl self-center mt-12 absolute z-10">
							<TouchableOpacity
								className="flex-row h-8 w-52"
								onPress={() => {
									setFasting("16/8 Intermittent Fast");
									dispatch(setMaxTime(16));
									setShowTimerList(false);
								}}>
								<Text
									style={{ color: colors.primary }}
									className="my-auto text-xs ml-4">
									16/8 Intermittent Fast
								</Text>
								{maxTime === 16 && (
									<Text className="ml-auto my-auto mr-2">
										<Ionicons
											color={colors.primary}
											size={15}
											name={"ios-checkmark-circle-outline"}
										/>
									</Text>
								)}
							</TouchableOpacity>
							<TouchableOpacity
								className="flex-row h-8 w-52"
								onPress={() => {
									setFasting("18/6 Intermittent Fast");
									dispatch(setMaxTime(18));
									setShowTimerList(false);
								}}>
								<Text
									style={{ color: colors.primary }}
									className="my-auto text-xs ml-4">
									18/6 Intermittent Fast
								</Text>
								{maxTime === 18 && (
									<Text className="ml-auto my-auto mr-2">
										<Ionicons
											color={colors.primary}
											size={15}
											name={"ios-checkmark-circle-outline"}
										/>
									</Text>
								)}
							</TouchableOpacity>
							<TouchableOpacity
								className="flex-row h-8 w-52"
								onPress={() => {
									setFasting("24hr Fast");
									dispatch(setMaxTime(24));
									setShowTimerList(false);
								}}>
								<Text
									style={{ color: colors.primary }}
									className="my-auto text-xs ml-4">
									24/hr Fast
								</Text>
								{maxTime === 24 && (
									<Text className="ml-auto my-auto mr-2">
										<Ionicons
											color={colors.primary}
											size={15}
											name={"ios-checkmark-circle-outline"}
										/>
									</Text>
								)}
							</TouchableOpacity>
						</Surface>
					)}
				</View>

				<View className="mt-6 z-0">
					<FastingTimer />
				</View>

				<Text
					style={{ color: colors.primary }}
					className="text-SM text-center mt-4 font-bold">
					Elapsed: [{elapsedPercentage}]%
				</Text>
			</View>

			{/* Timer Start */}
			<View className="mb-8">
				<View className="flex flex-row justify-center mb-2">
					<View className="w-32">
						<Text
							style={{ color: colors.primary }}
							className="text-xs text-center mb-2 font-bold">
							START
						</Text>
						{startTime !== null ? (
							<Text
								style={{ color: colors.primary }}
								className="text-sm text-center  opacity-60	">
								{getDate(startTime)}
							</Text>
						) : (
							<Text
								style={{ color: colors.primary }}
								className="text-sm text-center opacity-60	">
								.........
							</Text>
						)}
					</View>

					<View className="w-32">
						<Text
							style={{ color: colors.primary }}
							className="text-xs text-center  mb-2 font-bold">
							END
						</Text>
						{endTime !== null ? (
							<Text
								style={{ color: colors.primary }}
								className="text-sm text-center opacity-60	">
								{getDate(endTime)}
							</Text>
						) : (
							<Text
								style={{ color: colors.primary }}
								className="text-sm text-center opacity-60	">
								.........
							</Text>
						)}
					</View>
				</View>
				<Button
					style={{ backgroundColor: colors.primary }}
					className="my-4 w-60 mx-auto  "
					icon="clock"
					mode="contained"
					onPress={clicked === false ? handleStartFast : handleEndFast}>
					{clicked === false ? "Start Fast" : "End Fast Now"}
				</Button>
			</View>
		</View>
	);
};

export default Fasting;
