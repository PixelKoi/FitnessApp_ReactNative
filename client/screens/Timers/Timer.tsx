import React, { useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import Fasting from "./Fasting/Fasting";
import Meditation from "./Meditation/MeditationTimer";
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
			title: "Timer",
			headerStyle: {
				shadowColor: "transparent",
				borderBottomWidth: 0,
			},
			headerTintColor: colors.primary,
			headerTitleStyle: {
				fontWeight: "bold",
			},
		});
	}, []);

	return (
		<View style={{ backgroundColor: "#fff" }} className="flex-1">
			<View className="flex-col items-center mt-4">
				<TimerCandlestick />
				{/* Fasting Button*/}
				<View className="flex-row">
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("FastingDash");
						}}
						style={{ height: 180, backgroundColor: "red" }}
						className="flex-1 mx-2 rounded"></TouchableOpacity>
					<TouchableOpacity
						onPress={() => navigation.navigate("MeditationDash")}
						style={{ height: 180, backgroundColor: "red" }}
						className="flex-1 mr-2 rounded"></TouchableOpacity>
				</View>
			</View>
		</View>
	);
};

export default Timer;

{
	/* <View>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("FastingDash");
				
						}}>
						<TimerCard
							img={FastingCard}
							height={90}
							width={107}
							title={"Fasting"}
							description={"Begin timer now!"}
							textColor={colors.primary}
							buttonBackgroundColor={colors.primary}
							cardBackgroundColor={colors.secondary}
						/>
					</TouchableOpacity>
			
					<TouchableOpacity
						onPress={() => navigation.navigate("MeditationDash")}>
						<TimerCard
							height={104}
							width={107}
							img={MeditationCard}
							title={"Meditation"}
							description={"Begin timer now!"}
							textColor={colors.primary}
							buttonBackgroundColor={colors.primary}
							cardBackgroundColor={colors.secondary}
						/>
					</TouchableOpacity>
				</View> */
}
