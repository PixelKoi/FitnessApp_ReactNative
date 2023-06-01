import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useAppSelector } from "../../app/hooks";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const FastingDonutGraph = (
	props,
	{
		radius = 130,
		strokeWidth = 20,
		duration = 500,
		color = "blue",
		delay = 0,
		countdown = props.countdown,
	}
) => {
	const animatedValue = React.useRef(new Animated.Value(0)).current;

	const circleRef = useRef(null);
	const inputRef = useRef(null);

	const fastingInfo = useAppSelector((state) => state.fasting);
	const halfCircle = radius + strokeWidth;
	const circleCircumference = 2 * Math.PI * radius;

	const animation = (toValue) => {
		return Animated.timing(animatedValue, {
			toValue,
			duration,
			delay,
			useNativeDriver: true,
		}).start();
	};

	// updates circle circ based on how much time has elapsed
	useEffect(() => {
		const value = (fastingInfo.elapsedPercentage / 100) * fastingInfo.maxTime;
		const strokeDashoffset =
			circleCircumference - (value / fastingInfo.maxTime) * circleCircumference;
		circleRef.current.setNativeProps({
			strokeDashoffset,
		});
	}, [fastingInfo.elapsedPercentage, fastingInfo.maxTime, circleCircumference]);

	return (
		<View className="flex justify-center items-center">
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
						strokeDasharray={circleCircumference}
						strokeDashoffset={fastingInfo.elapsedPercentage}
						strokeLinecap="round"
					/>
				</G>
			</Svg>
			<Text className="text-base text-center absolute top-14">
				Elapsed: {fastingInfo.elapsedPercentage}%
			</Text>
			{countdown ? (
				<Text className="text-3xl text-center absolute">
					{props.countdown.hours}:{props.countdown.minutes}:
					{props.countdown.seconds}
				</Text>
			) : (
				<Text className="text-3xl text-center absolute">00:00:00</Text>
			)}
		</View>
	);
};

export default FastingDonutGraph;
