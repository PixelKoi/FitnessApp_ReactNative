import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions, Image } from "react-native";
import { Button, Surface } from "react-native-paper";
import Fasting from "./Fasting/Fasting";
import Meditation from "./Meditation/MeditationPLayer";
import MeditationDash from "./Meditation/MeditationDash";
import { useAppSelector } from "../../redux-manager/hooks";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import TimerCard from "./TimerDash/TimerCard";
// Import card images
import FastingCard from "../../assets/images/timer-dash/FastingCard.png";
import MeditationCard from "../../assets/images/timer-dash/MeditationCard.png";
import EmojiDropDown from "./Meditation/components/EmojiDropDown";
import TimerCandlestick from "../../utils/charts/timer/TimerCandlestick";
import meditation from "../../assets/images/meditation/woman-meditating.png";
import fasting from "../../assets/images/fasting-dash/FastingMain.png";

const windowWidth = Dimensions.get("window").width;

//Todo: get tailwind Theme primary and secondary colors set to states and put it inside the labelStyle prop
const Timer = () => {
	const navigation = useNavigation();

	// import redux
	const { colors } = useAppSelector((state) => state.theme);
	const { startDate } = useAppSelector((state) => state.fasting);

	// import hooks
	const [mode, setMode] = useState("fasting");

	// top Navigation
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Health Mode",
			headerStyle: {
				shadowColor: "transparent",
				borderBottomWidth: 0,
			},
			headerTintColor: "black",
			headerTitleStyle: {
				fontWeight: "bold",
			},
		});
	}, []);

	return (
		<View style={{ backgroundColor: "#fff" }} className="flex-1">
			<View className="flex-col mx-4">
				<TimerCandlestick />
				<View className="flex-row justify-center gap-4 items-center">
					<View className="flex-row">
						<View
							className="self-center"
							style={{
								width: 12,
								height: 12,
								borderRadius: 6,
								backgroundColor: "#5C7FC7",
							}}
						/>
						<Text className="self-center text-xs ml-2">Fasting</Text>
					</View>

					<View className="flex-row">
						<View
							className="self-center"
							style={{
								width: 12,
								height: 12,
								borderRadius: 6,
								backgroundColor: "#C5C3E3",
							}}
						/>
						<Text className="self-center text-xs ml-2">Meditation</Text>
					</View>
				</View>
				{/* Fasting Button*/}
				<View className="flex-row flex-wrap justify-between mt-8">
					<View
						style={{ height: 175, width: "48%" }}
						className="w-1/2 rounded-xl mb-3.5 bg-white">
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("FastingDash");
							}}
							style={{ height: 175, width: "100%" }}>
							<View style={{ height: 163, width: "100%" }}>
								<Image
									source={fasting}
									className="flex-1 w-1/2 rounded-xl"
									style={{ resizeMode: "cover", width: "100%" }}
								/>
							</View>
							<View
								className="self-center rounded-2xl justify-center items-center"
								style={{
									backgroundColor: "#5C7FC7",
									height: 40,
									bottom: 0,
									width: "95%",
									position: "absolute",
									zIndex: 2,
								}}>
								<Text className="text-white">Meditation</Text>
							</View>
						</TouchableOpacity>
					</View>

					<View
						style={{ height: 175, width: "48%" }}
						className="w-1/2 rounded-xl mb-3.5 bg-white">
						<TouchableOpacity
							onPress={() => {
								navigation.navigate("MeditationDash");
							}}
							style={{ height: 175, width: "100%" }}>
							<View style={{ height: 163, width: "100%" }}>
								<Image
									source={meditation}
									className="flex-1 w-1/2 rounded-xl"
									style={{ resizeMode: "cover", width: "100%" }}
								/>
							</View>
							<View
								className="self-center rounded-2xl justify-center items-center"
								style={{
									backgroundColor: "#5C7FC7",
									height: 40,
									bottom: 0,
									width: "95%",
									position: "absolute",
									zIndex: 2,
								}}>
								<Text className="text-white">Meditation</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</View>
	);
};

export default Timer;
