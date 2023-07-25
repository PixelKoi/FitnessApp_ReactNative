import React, { useState } from "react";
import { View, Image, Text } from "react-native";
import { Button } from "react-native-paper";
//Images
import Running from "../../assets/images/home/HomeScreen_Running.png";
//Import Redux
import { useAppSelector } from "../../redux-manager/hooks";
//Import Modals
import { useNavigation } from "@react-navigation/native";
import OpeningAnimation from "./components/OpeningAnimation";
import OpeningScreen from "./components/OpeningScreen";

const Auth = () => {
	// Import nav
	const navigation = useNavigation();

	//Redux theme
	const { colors } = useAppSelector((state) => state.theme);

	return (
		<View className="flex-1">
			<OpeningAnimation />
			<OpeningScreen />
		</View>
	);
};

export default Auth;
