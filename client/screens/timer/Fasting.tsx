import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, List, Surface } from "react-native-paper";
import { format, add, getDay } from "date-fns";
import FastingTimer from "./components/FastingDonutGraph";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import {
	setEndDate,
	setMaxTime,
	setStartDate,
	setTimerStates,
} from "../../redux-manager/redux-slice/fasting-slice";
const Fasting = () => {
	//Top left nav button - removed top nav
	const navigation = useNavigation();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		});
	}, [navigation]);

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

	const [showTimerList, setShowTimerList] = useState(!expandList);

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
		dispatch(
			setTimerStates({
				startDate: "",
				endDate: "",
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

	return (
		<View className="flex-1 flex-col justify-center bg-background ">
			{/* <List.Section className="text-center self-center" title="Fasting Time">
				<List.Accordion
					theme={{ colors: { background: "white" } }}
					className="flex self-center justify-center rounded-lg bg-button-blur w-60"
					title={fasting}
					expanded={expandList}
					onPress={handleExplandList}>
					<List.Item
						className="self-center w-60"
						title="16/8 Intermittent Fast"
						onPress={() => {
							setFasting("16/8 Intermittent Fast");
							setMaxTime(16);
							setExpandList(false);
						}}
					/>
					<List.Item
						className="self-center w-60"
						title="18/4 intermittent fast"
						onPress={() => {
							setFasting("18/4 intermittent fast");
							setMaxTime(18);
							setExpandList(false);
						}}
					/>
					<List.Item
						className="self-center w-60"
						title="24hr fast"
						onPress={() => {
							setFasting("24hr fast");
							setMaxTime(24);
							setExpandList(false);
						}}
					/>
				</List.Accordion>
			</List.Section> */}
			<View>
				<Surface className="bg-secondary h-8 w-52 self-center rounded-xl">
					<TouchableOpacity
						className="h-8 w-52"
						onPress={() =>
							showTimerList === false
								? setShowTimerList(true)
								: setShowTimerList(false)
						}>
						<Text className="text-center my-auto">{fasting}</Text>
					</TouchableOpacity>
				</Surface>

				{showTimerList === true && (
					<Surface className="w-52 bg-background rounded-xl self-center mt-12 absolute z-10">
						<TouchableOpacity
							className="h-8 w-52"
							onPress={() => {
								setFasting("16/8 Intermittent Fast");
								setMaxTime(16);
								setShowTimerList(false);
							}}>
							<Text className="my-auto text-xs ml-2">
								16/8 Intermittent Fast
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="h-8 w-52"
							onPress={() => {
								setFasting("18/6 intermittent fast");
								setMaxTime(18);
								setShowTimerList(false);
							}}>
							<Text className="my-auto text-xs ml-2">
								18/6 Intermittent Fast
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							className="h-8 w-52"
							onPress={() => {
								setFasting("24hr fast");
								setMaxTime(24);
								setShowTimerList(false);
							}}>
							<Text className="my-auto text-xs ml-2">24/hr Fast</Text>
						</TouchableOpacity>
					</Surface>
				)}
			</View>

			<View className="mt-6 z-0">
				<FastingTimer />
			</View>

			<Text className="text-SM text-center mt-4">
				Elapsed: {elapsedPercentage}%
			</Text>
			<View className="flex flex-row gap-8 justify-center mt-4">
				<View>
					<Text className="text-xs text-primary">START TIME</Text>
					{startTime && <Text className="text-sm">{getDate(startTime)}</Text>}
				</View>
				<View>
					<Text className="text-xs text-primary">END TIME</Text>
					{endTime && <Text className="text-sm">{getDate(endTime)}</Text>}
				</View>
			</View>
			<Button
				className="my-4 w-60 mx-auto bg-button-focus"
				icon="clock"
				mode="contained"
				onPress={clicked === false ? handleStartFast : handleEndFast}>
				{clicked === false ? "Start fast" : "End fast now"}
			</Button>
		</View>
	);
};

export default Fasting;

// const accordionStyle = {
// 	borderRadius: 10,
// 	elevation: 2,
// 	width: 230,
// 	height: 60,
// 	fontSize: 14,
// 	alignSelf: "center",
// 	justifyContent: "center",
// };
