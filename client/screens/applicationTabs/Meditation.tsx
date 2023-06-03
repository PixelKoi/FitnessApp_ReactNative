import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List } from "react-native-paper";
import { format, add, getDay, addSeconds, differenceInSeconds } from "date-fns";
import MedTimer from "./MedDonutGraph";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Feather, FontAwesome5 } from "@expo/vector-icons";
import { setTimerStates } from "../../features/user/meditation-slice";

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
	const { startDate, endDate, countdown, maxTime } = useAppSelector(
		(state) => state.meditation
	);
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
		const duration = maxTime; // in hours
		const endTime = add(currentDate, { minutes: duration });

		dispatch(
			setTimerStates({
				startDate: currentDate.toString(),
				endDate: endTime.toString(),
			})
		);

		setStartTime(currentDate);
		setEndTime(endTime);
		setClicked((prevClicked) => !prevClicked);
		setFastingDuration(null);
		console.log(currentDate);
		// dispatch(setStartTime({ startTime: currentDate }));
	};

	const handleEndFast = () => {
		if (startTime && endTime) {
			const duration = (endTime - startTime) / (60 * 1000); // Convert to minutes
			setFastingDuration(duration);
			setClicked((prevClicked) => !prevClicked);
			clearInterval(countdownInterval.current); // Clear the countdown interval
			setCountdown(null); // Reset the countdown state
		}
	};

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
					elapsed={elapsedTimePercentage}
				/>
			</View>
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
			<Button
				className="mt-8 w-60 mx-auto"
				icon="brain"
				mode="contained"
				onPress={clicked === false ? handleStartFast : handleEndFast}>
				{clicked === false ? "Start Meditating" : "End Meditating"}
			</Button>
			<Text>{countdown}</Text>
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
