import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAppSelector } from "../../../redux-manager/hooks";
import emojiData from "../../../utils/timer/meditation-dash/emoji-data";
import medSessionData from "../../../utils/timer/meditation-dash/session-data";
import MeditationSession from "./components/MeditationSession";
import MeditationEmoji from "./components/MeditationEmoji";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import EmojiDropDown from "./components/EmojiDropDown";
import ChooseByGoal from "./components/ChooseByGoal";

//Todo: get tailwind Theme primary and secondary colors set to states and put it inside the labelStyle prop
const MeditationDash = () => {
	const navigation = useNavigation();

	const { username } = useAppSelector((state) => state.user);
	const { colors } = useAppSelector((state) => state.theme);

	// top Navigation
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Discover",
			headerStyle: {
				shadowColor: "transparent",
				backgroundColor: "#D4EEFF",
			},
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerLeft: () => (
				<View>
					<TouchableOpacity
						className="ml-2  rounded-full"
						onPress={() => {
							navigation.goBack();
						}}>
						<FontAwesome name="angle-left" size={30} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<View style={{ backgroundColor: "#D4EEFF" }} className="flex-1 px-5">
			<View className=" mt-4">
				<EmojiDropDown />
			</View>
			<View className="mt-5">
				<ChooseByGoal />
			</View>
			{/* Meditation Session List
			<View className="mt-6">
				<Text className="font-bold">Choose by Goal</Text>
				<View className="items-center">
					<View className="mt-4 flex-row">
						<MeditationSession
							title={medSessionData[0].title}
							time={medSessionData[0].time}
							cardColor={medSessionData[0].cardColor}
							textColor={medSessionData[0].textColor}
							buttonBackgroundColor={medSessionData[0].buttonBackgroundColor}
							buttonTextColor={medSessionData[0].buttonTextColor}
							track={medSessionData[0].track}
						/>
					</View>
				</View>
			</View> */}
		</View>
	);
};

export default MeditationDash;
