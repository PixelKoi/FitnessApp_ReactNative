import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TextInput, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import {
	differenceInSeconds,
	formatDuration,
	intervalToDuration,
} from "date-fns";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Donut = (
	props,
	{
		radius = 130,
		strokeWidth = 10,
		duration = 500,
		color = "blue",
		delay = 0,
		textColor,
		max = props.fastTime,
		timePassed = props.timePassed,
		percentage = (props.timePassed / props.fastTime) * 100,
		startTime = props.startTime,
		endTime = props.endTime,
		countdown = props.countdown,
	}
) => {
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

	// React.useEffect(() => {
	// 	animation(percentage);
	// 	animatedValue.addListener((v) => {
	// 		if (circleRef?.current) {
	// 			const maxPerc = (timePassed / max) * 100;
	// 			const strokeDashoffset =
	// 				circleCircumferance - (circleCircumferance * maxPerc) / 100;
	// 			circleRef.current.setNativeProps({
	// 				strokeDashoffset,
	// 			});
	// 		}
	// 		if (inputRef?.current) {
	// 			inputRef.current.setNativeProps({
	// 				text: `${Math.round(v.value)}`,
	// 			});
	// 		}
	// 	});
	// 	return () => {
	// 		animatedValue.removeAllListeners();
	// 	};
	// }, [max, percentage]);

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
						strokeDasharray={circleCircumferance}
						strokeDashoffset={802}
						strokeLinecap="round"
					/>
				</G>
			</Svg>
			<Text className="text-base text-center absolute top-14">
				Elapsed: {props.elapsed}
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

export default Donut;

/* <AnimatedInput
				ref={inputRef}
				underlineColorAndroid="transparent"
				editable={false}
				defaultValue="0"
				style={[
					StyleSheet.absoluteFillObject,
					{ fontSize: radius / 2, color: textColor ?? color },
					{ fontWeight: "900", textAlign: "center" },
				]}>
				{countdown && (
					<Text className="text-xs">
						{props.countdown.hours}h {props.countdown.minutes}m{" "}
						{props.countdown.seconds}s
					</Text>
				)}
</AnimatedInput> */
