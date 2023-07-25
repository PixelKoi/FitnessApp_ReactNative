import React, { useState, useEffect } from "react";
import { View } from "react-native";
//Import Modals
import OpeningAnimation from "./components/OpeningAnimation";
import OpeningScreen from "./components/OpeningScreen";

const Auth = () => {
	const [showAnimation, setShowAnimation] = useState(true);
	useEffect(() => {
		const timer = setTimeout(() => {
			setShowAnimation(false);
		}, 2000);

		// Clean up the timer to avoid memory leaks
		return () => clearTimeout(timer);
	}, [showAnimation]);

	return (
		<View className="flex-1">
			<OpeningAnimation visible={showAnimation} />
			<OpeningScreen />
		</View>
	);
};

export default Auth;
