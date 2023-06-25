import React, { useEffect, useRef } from "react";
import { View, Text } from "react-native";
import Svg, { G, Circle, Path, Mask } from "react-native-svg";
import { useAppSelector } from "../../../redux-manager/hooks";
import AnimatedStroke from "./AnimatedStroke";
import Animated, {
	Easing,
	useSharedValue,
	withTiming,
	useAnimatedStyle,
} from "react-native-reanimated";

//Graph Animations
// const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface FastingDonutGraphProps {
	radius?: number;
	strokeWidth?: number;
	color?: string;
}

const FastingDonutGraph: React.FC<FastingDonutGraphProps> = ({
	radius = 130,
	strokeWidth = 20,
}) => {
	//initiate fasting redux states
	const { countdown, elapsedPercentage, maxTime } = useAppSelector(
		(state) => state.fasting
	);

	const progress = useSharedValue(0);
	const progress2 = useSharedValue(1);

	useEffect(() => {
		progress.value = elapsedPercentage / 100;
	}, [elapsedPercentage]);

	const reanimatedStyle = useAnimatedStyle(() => {
		return { opacity: progress.value };
	});

	useEffect(() => {
		progress2.value = withTiming(0, { duration: 5000 });
	}, []);

	const { colors } = useAppSelector((state) => state.theme);

	const path = "M100 20A70 70 0 1 0 0 20";

	return (
		<View className="flex justify-center items-center mx">
			<Svg width="370" height="370" viewBox="-100 -100 300 210">
				<Path
					d={path}
					strokeWidth={15}
					stroke={colors.secondary}
					fill="transparent"
					strokeLinecap="round"
				/>
				<AnimatedStroke progress={progress} d={path} />
			</Svg>

			<Animated.View style={{ width: 200 }} className=" absolute items-center">
				<Animated.Text style={{ color: colors.primary }} className="text-xl">
					{countdown}
				</Animated.Text>
			</Animated.View>
		</View>
	);
};

export default FastingDonutGraph;
