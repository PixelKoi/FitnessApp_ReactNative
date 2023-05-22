import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Circle } from "react-native-svg";
import { Button, List } from "react-native-paper";
import { format, add, startOfWeek, getDay } from "date-fns";
import Donut from "./Donut";

const Fasting = () => {
	//Top left nav button - removed top nav
	const navigation = useNavigation();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

	//fasting states
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);
	const [fastTime, setFastTime] = useState<number>(16);
	const [fasting, setFasting] = useState<String>("16/8 intermittent fast");
	const [fastingDuration, setFastingDuration] = useState(null);

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
	};

	//end fast function
	const handleEndFast = () => {
		if (startTime && endTime) {
			const duration = (endTime - startTime) / (60 * 1000); // Convert to minutes
			setFastingDuration(duration);
			setClicked(false);
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

	return (
		<View className="flex-1 justify-center bg-white">
			<Text className="text-center bg-white text-base">You're fasting!</Text>
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
							setFastTime(16);
							setExpandList(false);
						}}
					/>
					<List.Item
						title="18/4 intermittent fast"
						onPress={() => {
							setFasting("18/4 intermittent fast");
							setFastTime(18);
							setExpandList(false);
						}}
					/>
					<List.Item
						title="24hr fast"
						onPress={() => {
							setFasting("24hr fast");
							setFastTime(24);
							setExpandList(false);
						}}
					/>
				</List.Accordion>
			</View>

			<View className="mt-10">
				<Donut
					fastTime={fastTime}
					timePassed={fastTime}
					startTime={startTime}
					endTime={endTime}
				/>
			</View>

			<View className="flex flex-row gap-8 justify-center mt-4">
				<View>
					<Text className="text-xs">STARTED TIME</Text>
					{startTime ? (
						<Text>
							{getWeekday(startTime)}, {getTimeStringWithoutSeconds(startTime)}
						</Text>
					) : (
						<View />
					)}
				</View>
				<View>
					<Text className="text-xs">FAST ENDING </Text>
					{startTime ? (
						<Text>
							{getWeekday(endTime)}, {getTimeStringWithoutSeconds(endTime)}
						</Text>
					) : (
						<View />
					)}
				</View>
			</View>
			<Button
				className="my-4 w-60 mx-auto"
				icon="clock"
				mode="contained"
				onPress={clicked === false ? handleStartFast : handleEndFast}>
				{clicked === false ? "Start fast" : "End fast now"}
			</Button>
			<Text>Time Fasted: {fastingDuration}</Text>
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
