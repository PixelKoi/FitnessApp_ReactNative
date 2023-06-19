import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import Fasting from "./Fasting";
import Meditation from "./Meditation";
import { useAppSelector } from "../../redux-manager/hooks";

//Todo: get tailwind theme primary and secondary colors set to states and put it inside the labelStyle prop
const Timer = () => {
	const { colors } = useAppSelector((state) => state.theme);

	const [mode, setMode] = useState("fasting");
	return (
		<View className="flex-1 justify-center bg-background">
			<View className="flex-row justify-center gap-4 mt-20">
				<Button
					onPress={() => setMode("fasting")}
					style={{
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
				<Button
					onPress={() => setMode("meditation")}
					icon="brain"
					labelStyle={{
						color: mode === "meditation" ? colors.background : colors.primary,
					}}
					style={{
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
			{mode === "meditation" && <Meditation />}
		</View>
	);
};

export default Timer;
