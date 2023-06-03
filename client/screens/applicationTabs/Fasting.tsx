import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List } from "react-native-paper";
import { format, add, getDay } from "date-fns";
import FastingTimer from "./FastingDonutGraph";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	setElapsedPercentage,
	setMaxTime,
	setTimerStates,
} from "../../features/user/fasting-slice";
const Fasting = () => {
	//Top left nav button - removed top nav
	const navigation = useNavigation();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

	//initiate fasting redux states
	const { startDate, endDate, maxTime } = useAppSelector(
		(state) => state.fasting
	);
	const dispatch = useAppDispatch();

	//fasting component states
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [clicked, setClicked] = useState(false);

	//handle fasting mode selector
	const [fasting, setFasting] = useState<String>("16/8 intermittent fast");
	const [expandList, setExpandList] = useState<boolean>(false);
	const handleExplandList = () => setExpandList(!expandList);

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

		//update redux startDade and endDate
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
	};

	//Get day for start and end time for timer
	const getDate = (event) => {
		const getWeekday = (date) => {
			const weekday = getDay(date);
			const weekdays = ["Sund", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
			return weekdays[weekday];
		};
		const getTimeStringWithoutSeconds = (time) => {
			return format(time, "h:mm a").replace(/^0/, "");
		};
		return getWeekday(event) + " " + getTimeStringWithoutSeconds(event);
	};

	//updates elapsed
	useEffect(() => {
		const updateElapsedTime = () => {
			if (startTime && endTime) {
				const currentTime = new Date();
				const elapsedTime = currentTime - startTime;
				const totalTime = endTime - startTime;
				const percentage = (elapsedTime / totalTime) * 100;
				const roundedPercentage = percentage.toFixed(0);
				dispatch(setElapsedPercentage(roundedPercentage));
			}
		};
		// Update elapsed time periodically (every second)
		const intervalId = setInterval(updateElapsedTime, 1000);
		return () => clearInterval(intervalId);
	}, [startTime, endTime]);

	return (
		<View className="flex-1 justify-center bg-white">
			<View className="mt-4">
				<List.Accordion
					style={accordionStyle}
					title={fasting}
					left={(props) => <List.Icon {...props} icon="pencil" />}
					expanded={expandList}
					onPress={handleExplandList}>
					<List.Item
						title="16/8 intermittent fast"
						onPress={() => {
							setFasting("16/8 intermittent fast");
							setMaxTime(16);
							setExpandList(false);
						}}
					/>
					<List.Item
						title="18/4 intermittent fast"
						onPress={() => {
							setFasting("18/4 intermittent fast");
							setMaxTime(18);
							setExpandList(false);
						}}
					/>
					<List.Item
						title="24hr fast"
						onPress={() => {
							setFasting("24hr fast");
							setMaxTime(24);
							setExpandList(false);
						}}
					/>
				</List.Accordion>
			</View>
			<View className="ml-auto mr-10 -mb-8 flex items-center justify-center w-10 h-10 rounded-full bg-gray-500">
				<Text>{maxTime}h</Text>
			</View>
			<View className="mt-10">
				<FastingTimer />
			</View>

			<View className="flex flex-row gap-8 justify-center mt-4">
				<View>
					<Text className="text-xs">STARTED TIME </Text>
					{startTime && <Text>{getDate(startTime)}</Text>}
				</View>
				<View>
					<Text className="text-xs">FAST ENDING </Text>
					{endTime && <Text>{getDate(endTime)}</Text>}
				</View>
			</View>
			<Button
				className="my-4 w-60 mx-auto"
				icon="clock"
				mode="contained"
				onPress={clicked === false ? handleStartFast : handleEndFast}>
				{clicked === false ? "Start fast" : "End fast now"}
			</Button>
		</View>
	);
};

export default Fasting;

const accordionStyle = {
	backgroundColor: "white",
	marginVertical: 10,
	borderRadius: 8,
	elevation: 2,
	width: 300,
	alignSelf: "center",
};
