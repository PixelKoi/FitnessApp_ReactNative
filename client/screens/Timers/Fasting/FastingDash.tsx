import React from "react";
import { View, TouchableOpacity } from "react-native";
import FastingCard from "./components/FastingCard";

const FastingDash = () => {
	return (
		<View className="flex-1 justify-center bg-background">
			<View className="flex-col items-center justify-center">
				<TouchableOpacity>
					<FastingCard />
				</TouchableOpacity>
				<TouchableOpacity>
					<FastingCard />
				</TouchableOpacity>
				<TouchableOpacity>
					<FastingCard />
				</TouchableOpacity>
				<TouchableOpacity>
					<FastingCard />
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default FastingDash;
