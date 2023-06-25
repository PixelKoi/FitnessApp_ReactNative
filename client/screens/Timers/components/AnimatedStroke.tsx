import React, { useRef, useState } from "react";
import { View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { useAppSelector } from "../../../redux-manager/hooks";
import Animated, { useAnimatedProps } from "react-native-reanimated";

interface AnimatedStateProps {
	d: string;
	progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = ({ d, progress }: AnimatedStateProps) => {
	const { colors } = useAppSelector((state) => state.theme);

	const [length, setLength] = useState(0);
	const ref = useRef<Path>(null);
	const animatedProps = useAnimatedProps(() => ({
		strokeDashoffset: length - length * progress.value,
	}));
	return (
		<AnimatedPath
			animatedProps={animatedProps}
			onLayout={() => setLength(ref.current.getTotalLength())}
			d={d}
			ref={ref}
			stroke={colors.primary}
			fill="none"
			strokeWidth={15}
			strokeDasharray={length}
			strokeLinecap="round"
		/>
	);
};

export default AnimatedStroke;
