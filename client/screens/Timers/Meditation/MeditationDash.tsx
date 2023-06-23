import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { useAppSelector } from "../../../redux-manager/hooks";
import emojiData from "../emoji-data";
import medSessionData from "../session-data";

import { TouchableOpacity } from "react-native-gesture-handler";
import MeditationSession from "./MeditationSession";

//Todo: get tailwind Theme primary and secondary colors set to states and put it inside the labelStyle prop
const MeditationDash = () => {
	const { name } = useAppSelector((state) => state.user);

	return (
		<View className="flex-1 mx-8 mt-10 bg-background">
			<View className="gap-2">
				<Text className="font-bold" style={{ fontSize: 14 }}>
					Hello, <Text className="uppercase">{name}</Text>
				</Text>
				<Text style={{ color: "#9B9B99", fontSize: 10 }}>
					How are you feeling today?
				</Text>

				{/* Emoji List */}
				<View className="flex-row">
					{emojiData.map((emoji, index) => (
						<TouchableOpacity key={index} className="mr-5 mt-2">
							<Image className="w-10 h-10" source={emoji.img} />
							<Text
								className="self-center mt-1"
								style={{ fontSize: 10, color: "#9B9B99" }}>
								{emoji.emotion}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>

			<View className="mt-8">
				<Text className="font-bold">Choose meditation session</Text>

				<View className="mt-8">
					{medSessionData.map((data, index) => (
						<MeditationSession
							title={data.title}
							time={data.time}
							index={index}
							cardColor={data.cardColor}
							textColor={data.textColor}
							butttonBackgroundColor={data.buttonBackgroundColor}
							buttonTextColor={data.buttonTextColor}
						/>
					))}
				</View>
			</View>
		</View>
	);
};

export default MeditationDash;
