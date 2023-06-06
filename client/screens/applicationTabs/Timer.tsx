import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Button, List } from "react-native-paper";
import Fasting from "./Fasting";
import Meditation from "./Meditation";

const Timer = () => {
	const [mode, setMode] = useState("fasting");
	return (
		<View className="flex-1 justify-center bg-white">
			<View className="flex flex-row justify-center gap-4 mt-20">
				<Button
					onPress={() => setMode("fasting")}
					className="text-center w-40 bg-blue text-base"
					icon="clock"
					mode="contained">
					Fasting
				</Button>
				<Button
					onPress={() => setMode("meditation")}
					icon="brain"
					className="text-center w-40 bg-blue text-base"
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

const accordionStyle = {
	backgroundColor: "white",
	marginVertical: 10,
	borderRadius: 8,
	elevation: 2,
	width: 300,
	alignSelf: "center",
};
