import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import Fasting from "./Fasting/Fasting";
import Meditation from "./Meditation/Meditation";
import MeditationDash from "./Meditation/MeditationDash";
import { useAppSelector } from "../../redux-manager/hooks";

//Todo: get tailwind Theme primary and secondary colors set to states and put it inside the labelStyle prop
const Timer = () => {
	const { colors } = useAppSelector((state) => state.theme);

	const [mode, setMode] = useState("fasting");
	return (
		<View className="flex-1 justify-center bg-background">
			<View className="flex-row justify-center gap-4 mt-20">
				{/* Fasting Button*/}
				<Button
					onPress={() => setMode("fasting")}
					style={{
						borderRadius: 10,
						backgroundColor:
							mode === "fasting" ? colors.primary : colors.secondary,
					}}
					className={`text-center w-40 text-base`}
					icon="clock"
					labelStyle={{
						color: mode === "fasting" ? colors.background : colors.primary,
					}}
					mode="contained">
					<Text
						style={{
							color: mode === "fasting" ? colors.background : colors.primary,
						}}>
						Fasting
					</Text>
				</Button>
				{/* Meditation Button*/}
				<Button
					onPress={() => setMode("meditation")}
					icon="brain"
					labelStyle={{
						color: mode === "meditation" ? colors.background : colors.primary,
					}}
					style={{
						borderRadius: 10,
						backgroundColor:
							mode === "meditation" ? colors.primary : colors.secondary,
					}}
					className={`text-center  w-40 text-base`}
					mode="contained">
					<Text
						style={{
							color: mode === "meditation" ? colors.background : colors.primary,
						}}>
						Meditation
					</Text>
				</Button>
			</View>
			{mode === "fasting" && <Fasting />}
			{mode === "meditation" && <MeditationDash />}
		</View>
	);
};

export default Timer;
