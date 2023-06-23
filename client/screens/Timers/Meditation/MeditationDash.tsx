import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAppSelector } from "../../../redux-manager/hooks";
import emojiData from "../../../utils/timer/meditation-dash/emoji-data";
import medSessionData from "../../../utils/timer/meditation-dash/session-data";
import MeditationSession from "./components/MeditationSession";
import MeditationEmoji from "./components/MeditationEmoji";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome5";

//Todo: get tailwind Theme primary and secondary colors set to states and put it inside the labelStyle prop
const MeditationDash = () => {
	const navigation = useNavigation();

	const { name } = useAppSelector((state) => state.user);
	const { colors } = useAppSelector((state) => state.theme);

	// top Navigation
	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "Meditation",
			headerStyle: {
				shadowColor: "transparent",
			},
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerLeft: () => (
				<View>
					<TouchableOpacity
						className="ml-4  rounded-full"
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
		<View className="flex-1 px-8  bg-background">
			<View className="gap-2 mt-14">
				<Text className="font-bold" style={{ fontSize: 14 }}>
					Hello, <Text className="uppercase">{name}!</Text>
				</Text>
				<Text style={{ color: "#9B9B99", fontSize: 10 }}>
					How are you feeling today?
				</Text>

				{/* Emoji List */}
				<View className="flex-row">
					{emojiData.map((emoji, index) => (
						<MeditationEmoji
							key={index}
							emotion={emoji.emotion}
							img={emoji.img}
						/>
					))}
				</View>
			</View>

			{/* Meditation Session List */}
			<View className="mt-8">
				<Text className="font-bold">Choose meditation session</Text>
				<View className="mt-8 flex-row">
					{medSessionData.map((data, index) => (
						<MeditationSession
							key={index}
							title={data.title}
							time={data.time}
							cardColor={data.cardColor}
							textColor={data.textColor}
							buttonBackgroundColor={data.buttonBackgroundColor}
							buttonTextColor={data.buttonTextColor}
						/>
					))}
				</View>
			</View>
		</View>
	);
};

export default MeditationDash;
