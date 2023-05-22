import React, { useRef, useState } from "react";
import { View, Text, Animated, TextInput, StyleSheet } from "react-native";
import Svg, { G, Circle } from "react-native-svg";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Donut = (
	props,
	{
		percentage = 75,
		radius = 130,
		strokeWidth = 10,
		duration = 500,
		color = "red",
		delay = 0,
		textColor,
		max = props.fastTime,
	}
) => {
	const [fastTime, setFastTime] = useState<number>(16);
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
		<View className="flex justify-center items-center">
			<View className="ml-auto mr-10 flex items-center justify-center w-10 h-10 rounded-full bg-gray-500">
				<Text>{max}h</Text>
			</View>
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

export default Donut;
