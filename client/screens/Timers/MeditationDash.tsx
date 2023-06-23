import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import { useAppSelector } from "../../redux-manager/hooks";

//Todo: get tailwind Theme primary and secondary colors set to states and put it inside the labelStyle prop
const Timer = () => {
	const { colors } = useAppSelector((state) => state.theme);
	const { name } = useAppSelector((state) => state.user);


	return (
		<View className="flex-1 justify-center bg-background">
			<Text>Hello, {name}</Text>
			<Text>How are you feeling today?</Text>

            <Text>Choose meditation session}</Text>
		</View>
	);
};

export default Timer;
