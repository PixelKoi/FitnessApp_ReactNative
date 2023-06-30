import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Surface } from "react-native-paper";
import { format, add, getDay } from "date-fns";
import FastingTimer from "../components/FastingDonutGraph";
import FastingTimer2 from "../components/FastingDonutGraph2";

//Redux imports
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { setTimerStates } from "../../../redux-manager/redux-slice/fasting-slice";
//import icons
import FontAwesome from "react-native-vector-icons/FontAwesome5";

const Fasting = () => {
	const navigation = useNavigation();

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

	//Get day for start and end time for Timers
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

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Fasting",
			headerStyle: {
				shadowColor: "transparent",
			},
			headerTintColor: colors.primary,
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerLeft: () => (
				<View>
					<TouchableOpacity
						className="ml-4  rounded-full"
						onPress={() => {
							navigation.goBack();
						}}>
						<FontAwesome name="angle-left" size={30} color={colors.primary} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	//Todo: put tailwind css in state and update icon fonts + checkmark fonts
	return (
		<View
			style={{ backgroundColor: colors.background }}
			className="flex-1 flex-col justify-center">
			{/* Clock section */}
			<View className="mb-14">
				<Text className="text-xl font-bold text-center">Circadian Rythm</Text>
				{/* Fasting Donut Graph */}
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
