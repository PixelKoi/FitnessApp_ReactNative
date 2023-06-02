import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List } from "react-native-paper";
import { format, add, getDay, addSeconds, differenceInSeconds } from "date-fns";
import FastingTimer from "./FastingDonutGraph";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	setElapsedPercentage,
	setMaxTime,
	setStartDate,
	setEndDate,
} from "../../features/user/fasting-slice";
const Fasting = () => {
	//Top left nav button - removed top nav
	const navigation = useNavigation();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

	const countdownInterval = useRef(null);

	//Call to fasting redux
	const fastingInfo = useAppSelector((state) => state.fasting);
	const dispatch = useAppDispatch();

	//fasting states
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [fasting, setFasting] = useState<String>("16/8 intermittent fast");
	const [fastingDuration, setFastingDuration] = useState(null);

	//Keep track of starting / ending fast button
	const [clicked, setClicked] = useState(false);

	//handle fasting mode selector
	const [expandList, setExpandList] = useState<boolean>(false);
	const handleExplandList = () => setExpandList(!expandList);

	//process time displayed - remove seconds and leading zero
	const getTimeStringWithoutSeconds = (time) => {
		return format(time, "h:mm a").replace(/^0/, "");
	};

	//Get day for start and end time
	const getWeekday = (date) => {
		const weekday = getDay(date);
		const weekdays = ["Sund", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
		return weekdays[weekday];
	};

	//Check if fasting redux for startDate. If there is a startDate update local start and end states
	//ToDo: Check if end date has passed and then reset start and end date to ""
	useEffect(() => {
		if (fastingInfo.startDate !== "") {
			setStartTime(new Date(fastingInfo.startDate));
			setEndTime(new Date(fastingInfo.endDate));
		}
	}, []);

	const [countdown, setCountdown] = useState(null);

	//start fast function
	const handleStartFast = () => {
		const currentDate = new Date();

		// fastTime state updates fasting duration
		const duration = fastingInfo.maxTime; // in hours
		const endTime = add(currentDate, { hours: duration });

		//update redux time stampe string
		dispatch(setStartDate(currentDate.toString()));
		dispatch(setEndDate(endTime.toString()));

		setStartTime(currentDate);
		setEndTime(endTime);
		setClicked(true);
		setFastingDuration(null);
	};

	const handleEndFast = () => {
		if (startTime && endTime) {
			const duration = (endTime - startTime) / (60 * 1000); // Convert to minutes
			setFastingDuration(duration);
			setClicked(false);
			clearInterval(countdownInterval.current); // Clear the countdown interval
			setCountdown(null); // Reset the countdown state
		}
		dispatch(setStartDate(""));
		dispatch(setEndDate(""));
	};

	//updates countdown once fasting starts
	useEffect(() => {
		if (startTime && endTime) {
			countdownInterval.current = setInterval(() => {
				const remainingTime = endTime - new Date();
				if (remainingTime > 0) {
					const countdownHours = Math.floor(remainingTime / (60 * 60 * 1000));
					const countdownMinutes = Math.floor(
						(remainingTime % (60 * 60 * 1000)) / (60 * 1000)
					);
					const countdownSeconds = Math.floor(
						(remainingTime % (60 * 1000)) / 1000
					);
					setCountdown({
						hours: countdownHours,
						minutes: countdownMinutes,
						seconds: countdownSeconds,
					});
				} else {
					clearInterval(countdownInterval.current);
					setCountdown(null);
				}
			}, 1000);
		}
		console.log("hello world");

		return () => {
			clearInterval(countdownInterval.current);
		};
	}, [startTime, endTime]);

	//updates elapsed
	const updateElapsedTime = () => {
		if (startTime && endTime) {
			const currentTime = new Date();
			const elapsedTime = currentTime - startTime; // Elapsed time in milliseconds
			const totalTime = endTime - startTime; // Total fasting duration in milliseconds
			const percentage = (elapsedTime / totalTime) * 100;
			const roundedPercentage = percentage.toFixed(0);
			dispatch(setElapsedPercentage(roundedPercentage));
		}
	};

	useEffect(() => {
		// Call the updateElapsedTime function immediately
		updateElapsedTime();

		// Update elapsed time periodically (every second)
		const intervalId = setInterval(updateElapsedTime, 1000);

		// Clean up the interval on component unmount
		return () => clearInterval(intervalId);
	}, [startTime, endTime]); // Add startTime and endTime to the dependency array

	// Use another useEffect to update elapsedTimePercentage when currentTime changes
	useEffect(() => {
		const intervalId = setInterval(() => {
			updateElapsedTime();
		}, 1000);

		return () => clearInterval(intervalId);
	}, []); // Empty dependency array to only run once on component mount

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
				<Text>{fastingInfo.maxTime}h</Text>
			</View>
			<View className="mt-10">
				<FastingTimer countdown={countdown} />
			</View>

			<View className="flex flex-row gap-8 justify-center mt-4">
				<View>
					<Text className="text-xs">STARTED TIME </Text>
					{startTime ? (
						<Text>
							{getWeekday(startTime)}, {getTimeStringWithoutSeconds(startTime)},
						</Text>
					) : (
						<View className="py-2" />
					)}
				</View>
				<View>
					<Text className="text-xs">FAST ENDING </Text>
					{startTime ? (
						<Text>
							{getWeekday(endTime)}, {getTimeStringWithoutSeconds(endTime)}
						</Text>
					) : (
						<View className="py-2" />
					)}
				</View>
			</View>
			<Button
				className="my-4 w-60 mx-auto"
				icon="clock"
				mode="contained"
				onPress={
					fastingInfo.startDate === "" ? handleStartFast : handleEndFast
				}>
				{fastingInfo.startDate === "" ? "Start fast" : "End fast now"}
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
