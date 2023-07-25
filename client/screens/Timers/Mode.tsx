import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

const Mode = () => {
	const navigation = useNavigation();

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "",
			headerShown: false,
			headerStyle: {
				shadowColor: "transparent",
				borderBottomWidth: 0,
			},
			headerTitleStyle: {
				fontWeight: "bold",
			},
		});
	}, []);
	return (
		<View className="flex-1 flex-col">
			<View
				style={{ backgroundColor: "#FFA01C" }}
				className="flex-1 h-1/2 bg-black">
				<Text className="font-bold text-2xl text-black p-4 mt-10">Fasting</Text>
				<Text className="font-bold text-2xs text-black ml-4">
					Start your fasting today!
				</Text>
			</View>
			<View className="flex-1 h-1/2 bg-slate-500 ">
				<LinearGradient
					colors={[
						"rgba(3, 23, 76, 0.35)",
						"#03174C",
						"rgba(3, 23, 76, 0.81)",
						"rgba(3, 23, 76, 0.54)",
					]}
					locations={[0, 0.2315, 0.7707, 0.9771]}
					style={styles.gradient}
				/>
				<Text className="font-bold text-2xl text-white p-4">Meditation</Text>
				<Text className="font-bold text-2xs text-white ml-4">
					Start your meditation journey today!
				</Text>
			</View>
		</View>
	);
};
const styles = StyleSheet.create({
	gradient: {
		...StyleSheet.absoluteFillObject,
	},
});

export default Mode;
