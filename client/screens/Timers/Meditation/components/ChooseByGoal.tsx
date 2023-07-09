import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { sleepTracks, playListData } from "../../../../constants";
import { useNavigation } from "@react-navigation/native";

const ChooseByGoal = () => {
	const navigation = useNavigation();
	return (
		<View>
			<Text className="font-bold">Choose by Goal</Text>

			<View className="flex-row flex-wrap mt-4">
				<View className="w-1/2 h-28 mb-8">
					<TouchableOpacity
						onPress={async () => {
							navigation.navigate("MeditationTimer", { track: playListData });
						}}
						style={{ backgroundColor: "red" }}
						className="h-28 mr-2 rounded-xl"></TouchableOpacity>
					<Text style={{ fontSize: 13 }} className="mt-1 ml-2 font-bold">
						Fall Asleep
					</Text>
				</View>
				<View className="w-1/2 h-28">
					<TouchableOpacity
						onPress={async () => {
							navigation.navigate("MeditationTimer", { track: playListData });
						}}
						style={{ backgroundColor: "red" }}
						className="h-28 ml-2 rounded-xl"></TouchableOpacity>
					<Text style={{ fontSize: 13 }} className="ml-3 mt-1 font-bold">
						Reduce Stress & Anxiety
					</Text>
				</View>
				<View className="w-1/2 h-28">
					<TouchableOpacity
						onPress={async () => {
							navigation.navigate("MeditationTimer", { track: playListData });
						}}
						style={{ backgroundColor: "red" }}
						className="h-28 mr-2 rounded-xl"></TouchableOpacity>
					<Text style={{ fontSize: 13 }} className="mt-1 ml-2 font-bold">
						Learn to meditate
					</Text>
				</View>
				<View className="w-1/2 h-28">
					<TouchableOpacity
						onPress={async () => {
							navigation.navigate("MeditationTimer", { track: playListData });
						}}
						style={{ backgroundColor: "red" }}
						className="h-28 ml-2 rounded-xl"></TouchableOpacity>
					<Text style={{ fontSize: 13 }} className="ml-3 mt-1 font-bold">
						Buidly a Daily Habit
					</Text>
				</View>
			</View>
		</View>
	);
};

export default ChooseByGoal;
