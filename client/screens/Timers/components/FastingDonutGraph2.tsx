import React, { useEffect } from "react";
import { View } from "react-native";
import Svg, { Defs, Marker, Path } from "react-native-svg";
import { useAppSelector } from "../../../redux-manager/hooks";
import AnimatedStroke from "./AnimatedStroke";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
} from "react-native-reanimated";

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
	const { countdown, elapsedPercentage } = useAppSelector(
		(state) => state.fasting
	);

	const progress = useSharedValue(0);

	useEffect(() => {
		progress.value = elapsedPercentage / 100;
	}, [elapsedPercentage]);

	//Example to animate styles
	const reanimatedStyle = useAnimatedStyle(() => {
		return { opacity: progress.value };
	});

	const { colors } = useAppSelector((state) => state.theme);
	const path = "M100 20A70 70 0 1 0 0 20";

	return (
		<View className="flex justify-center items-center mx">
			<Svg width="370" height="370" viewBox="-100 -100 300 210">
				{/* <Defs>
					<Marker
						id="arrow"
						refX={0}
						refY={5}
						markerWidth="1"
						markerHeight="1"
						orient="auto">
						<Path d="M 0 0 L 2 2 L 0 3 z" fill={"green"} />
					</Marker>
				</Defs> */}
				<Path
					d={path}
					strokeWidth={18}
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
