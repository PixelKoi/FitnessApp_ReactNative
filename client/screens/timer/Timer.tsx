import React, { useState } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import Fasting from "./Fasting";
import Meditation from "./Meditation";

const Timer = () => {
	const [mode, setMode] = useState("fasting");
	return (
		<View className="flex-1 justify-center bg-background">
			<View className="flex flex-row justify-center gap-4 mt-20">
				<Button
					onPress={() => setMode("fasting")}
					className={`text-center w-40 ${
						mode === "fasting" ? "bg-primary" : "bg-secondary"
					} text-base`}
					icon="clock"
					mode="contained">
					Fasting
				</Button>
				<Button
					onPress={() => setMode("meditation")}
					icon="brain"
					className={`text-center w-40 ${
						mode === "meditation" ? "bg-primary" : "bg-secondary"
					} text-base`}
					mode="contained">
					Meditation
				</Button>
			</View>
			{mode === "fasting" && <Fasting />}
			{mode === "meditation" && <Meditation />}
		</View>
	);
};

export default Timer;
