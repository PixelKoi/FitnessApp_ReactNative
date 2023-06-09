import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import Fasting from "./Fasting";
import Meditation from "./Meditation";

//Todo: get tailwind theme primary and secondary colors set to states and put it inside the labelStyle prop
const Timer = () => {
	const [mode, setMode] = useState("fasting");
	return (
		<View className="flex-1 justify-center bg-background">
			<View className="flex-row justify-center gap-4 mt-20">
				<Button
					onPress={() => setMode("fasting")}
					className={`text-center w-40 ${
						mode === "fasting" ? "bg-primary" : "bg-secondary"
					} text-base`}
					icon="clock"
					labelStyle={{
						color: `${mode === "fasting" ? "#ffff" : "#E07594"}`,
					}}
					mode="contained">
					<Text
						className={`${mode === "fasting" ? "text-white" : "text-primary"}`}>
						Fasting
					</Text>
				</Button>
				<Button
					onPress={() => setMode("meditation")}
					icon="brain"
					labelStyle={{
						color: `${mode === "meditation" ? "#ffff" : "#E07594"}`,
					}}
					className={`text-center  w-40 ${
						mode === "meditation" ? "bg-primary" : "bg-secondary"
					} text-base`}
					mode="contained">
					<Text
						className={`${
							mode === "meditation" ? "text-white" : "text-primary"
						}`}>
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
