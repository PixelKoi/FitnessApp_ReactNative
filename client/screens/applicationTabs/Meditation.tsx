import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List } from "react-native-paper";
import { format, add, getDay, addSeconds, differenceInSeconds } from "date-fns";
import MedTimer from "./MedDonutGraph";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setEndTime, setStartTime } from "../../features/user/fasting-slice";
import { Feather, FontAwesome5 } from "@expo/vector-icons";

const Meditation = () => {
	//Top left nav button - removed top nav
	const navigation = useNavigation();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

	const completedDays = [true, false, true, true, false, false, true]; // Sample data for completed days, you can modify it as per your needs

	const countdownInterval = useRef(null);

	//Call to fasting redux
	const fastingInfo = useAppSelector((state) => state.fasting);
	const dispatch = useAppDispatch();

	//fasting states
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [fastTime, setFastTime] = useState<number>(16);
	const [fasting, setFasting] = useState<String>("Choose Meditation Time");
	const [fastingDuration, setFastingDuration] = useState(null);
	const [elapsedTimePercentage, setElapsedTimePercentage] = useState(0);

	//Keep track of starting / ending fast button
	const [clicked, setClicked] = useState(false);

	//handle fasting mode selector
	const [expandList, setExpandList] = useState<boolean>(false);
	const handleExplandList = () => setExpandList(!expandList);

	//start fast function
	const handleStartFast = () => {
		const currentDate = new Date();

		// fastTime state updates fasting duration
		const duration = fastTime; // in hours
		const endTime = add(currentDate, { hours: duration });

		setStartTime(currentDate);
		setEndTime(endTime);
		setClicked(true);
		setFastingDuration(null);
		console.log(currentDate);
		// dispatch(setStartTime({ startTime: currentDate }));
	};

	const handleEndFast = () => {
		if (startTime && endTime) {
			const duration = (endTime - startTime) / (60 * 1000); // Convert to minutes
			setFastingDuration(duration);
			setClicked(false);
			clearInterval(countdownInterval.current); // Clear the countdown interval
			setCountdown(null); // Reset the countdown state
		}
	};

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

	const [countdown, setCountdown] = useState(null);

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
			setElapsedTimePercentage(roundedPercentage);
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
						title="5 minutes (beginner)"
						onPress={() => {
							setFasting("5 minutes");
							setFastTime(5);
							setExpandList(false);
						}}
					/>
					<List.Item
						title="10 minutes"
						onPress={() => {
							setFasting("10 minutes");
							setFastTime(10);
							setExpandList(false);
						}}
					/>
					<List.Item
						title="15 minutes"
						onPress={() => {
							setFasting("15 minutes");
							setFastTime(15);
							setExpandList(false);
						}}
					/>
					<List.Item
						title="20 minutes (recommended)"
						onPress={() => {
							setFasting("20 minutes");
							setFastTime(20);
							setExpandList(false);
						}}
					/>
					<List.Item
						title="30 minutes (deep)"
						onPress={() => {
							setFasting("30 minutes");
							setFastTime(30);
							setExpandList(false);
						}}
					/>
					<List.Item
						title="45 minutes (expert)"
						onPress={() => {
							setFasting("45 minutes");
							setFastTime(45);
							setExpandList(false);
						}}
					/>
				</List.Accordion>
			</View>
			<View className="mt-10">
				<MedTimer
					fastTime={fastTime}
					timePassed={fastTime}
					startTime={startTime}
					endTime={endTime}
					countdown={countdown}
					elapsed={elapsedTimePercentage}
				/>
			</View>

			<Button
				className="mt-20 w-60 mx-auto"
				icon="brain"
				mode="contained"
				onPress={clicked === false ? handleStartFast : handleEndFast}>
				{clicked === false ? "Start Meditating" : "End Meditating"}
			</Button>
			<View className="mt-4">
				<Text className="text-center">Days Meditated</Text>
			</View>
			<View className="flex-row justify-center mt-2">
				{completedDays.map((completed, index) => (
					<View
						key={index}
						style={{
							margin: 6,
							width: 20,
							height: 20,
							borderRadius: 10,
							backgroundColor: completed ? "green" : "gray",
						}}>
						{completed && (
							<Feather
								name="check"
								size={10}
								color="white"
								style={{ textAlign: "center", marginTop: -1 }}
							/>
						)}
					</View>
				))}
			</View>
			<View className="mt-2">
				<Text className="text-center">Streak: 0</Text>
			</View>
		</View>
	);
};

export default Meditation;

const accordionStyle = {
	backgroundColor: "white",
	marginVertical: 10,
	borderRadius: 8,
	elevation: 2,
	width: 300,
	alignSelf: "center",
};
