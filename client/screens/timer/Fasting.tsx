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
import CheckMark from "react-native-vector-icons/Ionicons";

const Fasting = () => {
	//initiate fasting redux states
	const { startDate, endDate, maxTime, elapsedPercentage } = useAppSelector(
		(state) => state.fasting
	);
	const dispatch = useAppDispatch();

	//fasting component states
	const [startTime, setStartTime] = useState<Date | null>(null);
	const [endTime, setEndTime] = useState<Date | null>(null);
	const [clicked, setClicked] = useState(false);

	//handle fasting mode selector
	const [fasting, setFasting] = useState<String>("16/8 Intermittent Fast");
	const [expandList, setExpandList] = useState<boolean>(false);
	const handleExplandList = () => setExpandList(!expandList);

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
		setStartTime("");
		setEndTime("");
		// dispatch(
		// 	setTimerStates({
		// 		startDate: "",
		// 		endDate: "",
		// 	})
		// );
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

	return (
		<View className="mt-auto flex flex-col justify-center bg-background ">
			{/* Clock section */}
			<View className="mt-auto mb-14">
				<View className="z-10">
					<Surface className="bg-secondary h-8 w-52 self-center rounded-xl">
						<TouchableOpacity
							className="flex-row h-8 w-52"
							onPress={() =>
								showTimerList === false
									? setShowTimerList(true)
									: setShowTimerList(false)
							}>
							<Text className="ml-4 text-center my-auto">{fasting}</Text>
							<Icon
								style={{
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
					</Surface>

					{showTimerList === true && (
						<Surface className="w-52 bg-background rounded-xl self-center mt-12 absolute z-10">
							<TouchableOpacity
								className="flex-row h-8 w-52"
								onPress={() => {
									setFasting("16/8 Intermittent Fast");
									dispatch(setMaxTime(16));
									setShowTimerList(false);
								}}>
								<Text className="my-auto text-xs ml-2">
									16/8 Intermittent Fast
								</Text>
								{maxTime === 16 && (
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
									setFasting("18/6 intermittent fast");
									dispatch(setMaxTime(18));
									setShowTimerList(false);
								}}>
								<Text className="my-auto text-xs ml-2">
									18/6 Intermittent Fast
								</Text>
								{maxTime === 18 && (
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
									setFasting("24hr fast");
									dispatch(setMaxTime(24));
									setShowTimerList(false);
								}}>
								<Text className="my-auto text-xs ml-2">24/hr Fast</Text>
								{maxTime === 24 && (
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
					<FastingTimer />
				</View>

				<Text className="text-SM text-center mt-4">
					Elapsed: [{elapsedPercentage}]%
				</Text>
			</View>

			{/* Timer Start */}
			<View className="mb-8">
				<View className="flex flex-row  justify-center">
					<View className="w-32">
						<Text className="text-xs text-center text-primary">START</Text>
						{startTime !== null ? (
							<Text className="text-sm text-center">{getDate(startTime)}</Text>
						) : (
							<Text className="text-sm text-center">.........</Text>
						)}
					</View>

					<View className=" w-32">
						<Text className="text-xs text-center text-primary">END</Text>
						{endTime !== null ? (
							<Text className="text-sm text-center">{getDate(endTime)}</Text>
						) : (
							<Text className="text-sm text-center">.........</Text>
						)}
					</View>
				</View>
				<Button
					className="my-4 w-60 mx-auto bg-button-focus "
					icon="clock"
					mode="contained"
					onPress={clicked === false ? handleStartFast : handleEndFast}>
					{clicked === false ? "Start fast" : "End fast now"}
				</Button>
			</View>
		</View>
	);
};

export default Fasting;
