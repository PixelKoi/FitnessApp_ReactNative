import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { PaperClipIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Circle } from "react-native-svg";

const Donut = ({
	percentage = 75,
	radius = 40,
	strokeWidth = 10,
	duration = 500,
	color = "red",
	delay = 0,
	textColor,
	max = 100,
}) => {
	const halfCircle = radius + strokeWidth;
	return (
		<View className="flex-1 justify-center items-center">
			<Svg
				width={radius * 2}
				height={radius * 2}
				viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
				<G>
					<Circle
						cx="50%"
						cy="50%"
						stroke={color}
						strokeWidth={strokeWidth}
						r={radius}
						strokeOpacity={0.2}
					/>
					<Circle />
				</G>
			</Svg>
		</View>
	);
};

const Fasting = () => {
	const navigation = useNavigation();
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text>Back</Text>
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	return (
		<View className="flex-1 justify-center items-center">
			<Donut />
		</View>
	);
};

export default Fasting;
