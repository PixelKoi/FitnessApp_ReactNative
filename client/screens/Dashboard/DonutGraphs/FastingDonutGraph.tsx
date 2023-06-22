import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TextInput } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useAppSelector } from "../../../redux-manager/hooks";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const FastingDonutGraph = (props, { radius = 70, strokeWidth = 25 }) => {
	const fastingInfo = useAppSelector((state) => state.fasting);
	const { colors } = useAppSelector((state) => state.theme);
	const circleRef = useRef(null);
	const halfCircle = radius + strokeWidth;
	const circleCircumference = 2 * Math.PI * radius;

	useEffect(() => {
		const value = (fastingInfo.elapsedPercentage / 100) * fastingInfo.maxTime;
		const strokeDashoffset =
			circleCircumference - (value / fastingInfo.maxTime) * circleCircumference;
		circleRef.current.setNativeProps({
			strokeDashoffset,
		});
	}, [fastingInfo.elapsedPercentage, fastingInfo.maxTime, circleCircumference]);

	const countdownInterval = useRef(null);
	const [countdown, setCountdown] = useState(null);
	const [startTime, setStartTime] = useState(null);
	const [endTime, setEndTime] = useState(null);

	useEffect(() => {
		if (fastingInfo.startDate !== "") {
			setStartTime(new Date(fastingInfo.startDate));
			setEndTime(new Date(fastingInfo.endDate));
		}
	}, [fastingInfo.startDate]);

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

	return (
		<View className="justify-center items-center">
			<Svg
				width={radius * 2}
				height={radius * 2}
				viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
				<G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
					<Circle
						cx="50%"
						cy="50%"
						stroke={colors.primary}
						strokeWidth={strokeWidth}
						r={radius}
						fill="transparent"
						strokeOpacity={0.2}
					/>
					<AnimatedCircle
						ref={circleRef}
						cx="50%"
						cy="50%"
						stroke={colors.primary}
						strokeWidth={25}
						r={radius}
						fill="transparent"
						strokeDasharray={circleCircumference}
						strokeDashoffset={fastingInfo.elapsedPercentage}
						// strokeLinecap="round"
					/>
				</G>
			</Svg>
			<View className="absolute">
				<Text
					style={{ color: colors.primary }}
					className="text-2xl text-center font-bold">
					{fastingInfo.elapsedPercentage}%
				</Text>
				<View style={{ width: 53 }}>
					<Text style={{ color: colors.primary }} className="text-xs">
						{fastingInfo.countdown}
					</Text>
				</View>
			</View>
		</View>
	);
};

export default FastingDonutGraph;
