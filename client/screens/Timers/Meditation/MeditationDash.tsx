import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { Button } from "react-native-paper";
import { useAppSelector } from "../../../redux-manager/hooks";
import emojiData from "../../../utils/timer/meditation-dash/emoji-data";
import medSessionData from "../../../utils/timer/meditation-dash/session-data";

import { TouchableOpacity } from "react-native-gesture-handler";
import MeditationSession from "./MeditationSession";
import MeditationEmoji from "./MeditationEmoji";

//Todo: get tailwind Theme primary and secondary colors set to states and put it inside the labelStyle prop
const MeditationDash = () => {
	const { name } = useAppSelector((state) => state.user);

	return (
		<View className="flex-1 mx-8 mt-10 bg-background">
			<View className="gap-2">
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
