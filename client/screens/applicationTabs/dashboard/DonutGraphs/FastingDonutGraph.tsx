import React, { useEffect, useRef } from "react";
import { View, Text, Animated, TextInput } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useAppSelector } from "../../../../app/hooks";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const FastingDonutGraph = (
	props,
	{ radius = 70, strokeWidth = 20, color = "blue", countdown = props.countdown }
) => {
	const fastingInfo = useAppSelector((state) => state.fasting);

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
						// strokeLinecap="round"
					/>
				</G>
			</Svg>
			<Text className="text-base text-center absolute top-12">
				{fastingInfo.elapsedPercentage}%
			</Text>
			{countdown ? (
				<Text className="text-xs text-center absolut top-4">
					{props.countdown.hours}:{props.countdown.minutes}:
					{props.countdown.seconds}
				</Text>
			) : (
				<Text className="text-xs text-center absolute top-20">00:00:00</Text>
			)}
		</View>
	);
};

export default FastingDonutGraph;
