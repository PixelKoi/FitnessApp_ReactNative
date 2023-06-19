import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useAppSelector } from "../../../redux-manager/hooks";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const MedDonutGraph = ({ radius = 130, strokeWidth = 40 }) => {
	const { countdown, maxTime, percentageComplete } = useAppSelector(
		(state) => state.meditation
	);
	const { colors } = useAppSelector((state) => state.theme);

	const circleRef = useRef(null);
	const halfCircle = radius + strokeWidth;
	const circleCircumference = 2 * Math.PI * radius;

	// updates circle circ based on how much time has elapsed
	useEffect(() => {
		const value = (percentageComplete / 100) * maxTime;
		const strokeDashoffset =
			circleCircumference - (value / maxTime) * circleCircumference;
		circleRef.current.setNativeProps({
			strokeDashoffset,
		});
	}, [percentageComplete, maxTime, circleCircumference]);

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
						stroke={colors.primary}
						strokeWidth={strokeWidth}
						r={radius}
						fill="transparent"
						strokeOpacity={0.1}
					/>
					<Circle
						cx="50%"
						cy="50%"
						stroke={colors.primary}
						strokeWidth={20}
						r={radius}
						fill="transparent"
						strokeOpacity={0.1}
					/>
					<AnimatedCircle
						ref={circleRef}
						cx="50%"
						cy="50%"
						stroke={colors.primary}
						strokeWidth={20}
						r={radius}
						fill="transparent"
						strokeDasharray={circleCircumference}
						strokeDashoffset={percentageComplete}
						strokeLinecap="round"
					/>
				</G>
			</Svg>
			{countdown ? (
				<Text
					style={{ color: colors.primary }}
					className="text-3xl text-center absolute">
					{countdown}
				</Text>
			) : (
				<Text className="text-3xl text-center absolute">00:00</Text>
			)}
		</View>
	);
};

export default MedDonutGraph;
