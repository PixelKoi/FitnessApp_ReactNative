import React, { useRef, useState } from "react";
import { View, Text, Animated, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Circle } from "react-native-svg";
import { Button, List } from "react-native-paper";
import { format, add, startOfWeek, getDay } from "date-fns";
import Donut from "./Donut";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Donut2 = ({
	percentage = 75,
	radius = 130,
	strokeWidth = 10,
	duration = 500,
	color = "red",
	delay = 0,
	textColor,
	max = 16,
}) => {
	const animatedValue = React.useRef(new Animated.Value(0)).current;
	const circleRef = useRef(null);
	const inputRef = useRef(null);

	const halfCircle = radius + strokeWidth;
	const circleCircumferance = 2 * Math.PI * radius;
	const animation = (toValue) => {
		return Animated.timing(animatedValue, {
			toValue,
			duration,
			delay,
			useNativeDriver: true,
		}).start();
	};

	React.useEffect(() => {
		animation(percentage);
		animatedValue.addListener((v) => {
			if (circleRef?.current) {
				const maxPerc = (11 / max) * 100;
				const strokeDashoffset =
					circleCircumferance - (circleCircumferance * maxPerc) / 100;
				circleRef.current.setNativeProps({
					strokeDashoffset,
				});
			}
			if (inputRef?.current) {
				inputRef.current.setNativeProps({
					text: `${Math.round(v.value)}`,
				});
			}
		});
		return () => {
			animatedValue.removeAllListeners();
		};
	}, [max, percentage]);

	return (
		<View className="flex-1 justify-center items-center">
			<Svg
				width={radius * 2}
				height={radius * 2}
				viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
				<G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
					<Circle
						cx="50%"
						cy="50%"
						stroke={color}
						strokeWidth={strokeWidth}
						r={radius}
						fill="transparent"
						strokeOpacity={0.2}
					/>
					<AnimatedCircle
						ref={circleRef}
						cx="50%"
						cy="50%"
						stroke={color}
						strokeWidth={20}
						r={radius}
						fill="transparent"
						strokeDasharray={circleCircumferance}
						strokeDashoffset={circleCircumferance}
						strokeLinecap="round"
					/>
				</G>
			</Svg>
			<AnimatedInput
				ref={inputRef}
				underlineColorAndroid="transparent"
				editable={false}
				defaultValue="0"
				style={[
					StyleSheet.absoluteFillObject,
					{ fontSize: radius / 2, color: textColor ?? color },
					{ fontWeight: "900", textAlign: "center" },
				]}></AnimatedInput>
		</View>
	);
};

const Fasting = () => {
	const [expandList, setExpandList] = useState<boolean>(false);
	const handleExplandList = () => setExpandList(!expandList);

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
	const [clicked, setClicked] = useState(false);
	const [fastingDuration, setFastingDuration] = useState(null);

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

	const handleEndFast = () => {
		if (startTime && endTime) {
			const duration = (endTime - startTime) / (60 * 1000); // Convert to minutes
			setFastingDuration(duration);
			setClicked(false);
		}
	};

	const getTimeStringWithoutSeconds = (time) => {
		return format(time, "h:mm a").replace(/^0/, "");
	};

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
				<Donut fastTime={fastTime} />
			</View>

			<View className="flex flex-row gap-8 justify-center mt-4">
				<View>
					<Text className="text-xs">STARTED TIME</Text>
					{startTime && (
						<Text>
							{getWeekday(startTime)}, {getTimeStringWithoutSeconds(startTime)}
						</Text>
					)}
				</View>
				<View>
					<Text className="text-xs">FAST ENDING </Text>
					{startTime && (
						<Text>
							{getWeekday(endTime)}, {getTimeStringWithoutSeconds(endTime)}
						</Text>
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
