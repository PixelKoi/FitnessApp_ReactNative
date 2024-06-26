import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, TextInput } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppSelector } from "../../../redux-manager/hooks";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const SumDonutGraph = (
	props,
	{ radius = 70, strokeWidth = 25, duration = 500, delay = 0 }
) => {
	const animatedValue = React.useRef(new Animated.Value(0)).current;
	const { colors } = useAppSelector((state) => state.theme);

	// const [elapsed, setElapsed] = useState(0);

	const circleRef = useRef(null);
	const inputRef = useRef(null);

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
						strokeDashoffset={circleCircumference}
						strokeLinecap="round"
					/>
				</G>
			</Svg>
		</View>
	);
};

export default SumDonutGraph;
