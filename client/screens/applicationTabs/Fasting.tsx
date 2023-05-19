import React, { useRef, useState } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Animated,
	TextInput,
	StyleSheet,
} from "react-native";
import { PaperClipIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Circle } from "react-native-svg";
import { transparent } from "react-native-paper/lib/typescript/src/styles/themes/v2/colors";
import { Button, List } from "react-native-paper";

//Graph Animations
const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedInput = Animated.createAnimatedComponent(TextInput);

const Donut = ({
	percentage = 75,
	radius = 160,
	strokeWidth = 10,
	duration = 500,
	color = "red",
	delay = 0,
	textColor,
	max = 16,
}) => {
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
		<View className="flex-1 justify-center items-center">
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

const Fasting = () => {
	const [expandList, setExpandList] = useState<boolean>(false);
	const handleExplandList = () => setExpandList(!expandList);

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
		<View className="flex-1 justify-center bg-white">
			<Text className="text-center mt-4 bg-white	">You're fasting!</Text>
			<View className="mt-4">
				<List.Accordion
					title="Select Activity Level"
					left={(props) => <List.Icon {...props} icon="pencil" />}
					expanded={expandList}
					onPress={handleExplandList}>
					<List.Item title="16/8 intermittent fast" />
					<List.Item title="18/4 intermittent fast" />
					<List.Item title="24hr fast" />
				</List.Accordion>
			</View>
			<Donut />

			<View className="flex flex-row gap-8 justify-center">
				<View>
					<Text>START TIME</Text>
				</View>
				<View>
					<Text>END TIME</Text>
				</View>
			</View>
			<Button
				className="my-8 w-60 mx-auto"
				icon="clock"
				mode="contained"
				onPress={() => console.log("Pressed")}>
				End fast now
			</Button>
		</View>
	);
};

export default Fasting;
