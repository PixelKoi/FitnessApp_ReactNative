import React from "react";
import { View, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { useAppSelector } from "../../../redux-manager/hooks";

//Graph Animations

const FastingDonutGraph = (
	props,
	{ radius = 120, strokeWidth = 40, calories = props.calories }
) => {
	const { colors } = useAppSelector((state) => state.theme);
	const halfCircle = radius + strokeWidth;

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
				</G>
			</Svg>
			<View className="absolute">
				<Text
					style={{ color: colors.primary, fontSize: 25 }}
					className="text-center font-bold">
					{calories}
					{"\n"}calories
				</Text>
			</View>
		</View>
	);
};

export default FastingDonutGraph;
