import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import ChooseGoalMenu from "./components/MeditationInterface/Menus/ChooseGoalMenu";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BinauralBeatsMenu from "./components/MeditationInterface/Menus/BinauralBeatsMenu";
import AmbienceMenu from "./components/MeditationInterface/Menus/AmbienceMenu";
import FreqMenu from "./components/MeditationInterface/Menus/FreqMenu";
import PureToneList from "./components/MeditationInterface/PlayList/PureToneList";

const MeditationInterface = () => {
	const navigation = useNavigation();

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "",
			headerStyle: {
				shadowColor: "transparent",
				backgroundColor: "#ffff",
			},
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerLeft: () => (
				<View>
					<TouchableOpacity
						className="ml-2  rounded-full"
						onPress={() => {
							navigation.goBack();
						}}>
						<FontAwesome name="angle-left" size={30} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<View style={{ backgroundColor: "#ffff" }} className="flex-1">
			<View className="mx-4 mt-6">
				<ChooseGoalMenu />

				<View className="gap-5 mt-1">
					<View>
						<BinauralBeatsMenu />
					</View>
					<View>
						<FreqMenu />
					</View>
				</View>

				<View className="mt-4 flex-row">
					<Text style={{ fontSize: 18 }} className="font-bold">
						Suggested
					</Text>
					<TouchableOpacity className="ml-auto">
						<Text style={{ fontSize: 14 }} className="mt-auto font-bold">
							View All
						</Text>
					</TouchableOpacity>
				</View>

				<PureToneList />
			</View>
		</View>
	);
};

export default MeditationInterface;
