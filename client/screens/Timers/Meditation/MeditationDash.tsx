import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useAppSelector } from "../../../redux-manager/hooks";
import emojiData from "../emoji-data";

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
				<View className="flex-row">
					{emojiData.map((emoji, index) => (
						<View key={index} className="mr-4">
							<Text style={{ fontSize: 10, color: "#9B9B99" }}>
								{emoji.emotion}
							</Text>
						</View>
					))}
				</View>
			</View>

			<View className="mt-8">
				<Text className="font-bold">Choose meditation session</Text>
			</View>
		</View>
	);
};

export default MeditationDash;
