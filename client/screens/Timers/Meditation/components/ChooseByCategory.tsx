import React from "react";
import { View, Text, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { sleepTracks, playListData } from "../../../../constants";
import { useNavigation } from "@react-navigation/native";
import sleepWell from "../../../../assets/meditation_timer/sleepWell.jpg";
import relax from "../../../../assets/meditation_timer/relax.jpg";
import meditate from "../../../../assets/meditation_timer/meditate.jpg";
import habit from "../../../../assets/meditation_timer/habit.jpg";

const ChooseByCategory = () => {
	const navigation = useNavigation();
	return (
		<View>
			<Text style={{ fontSize: 18 }} className="font-bold text-white">
				Browse by Category
			</Text>

			<View className="flex-row flex-wrap mt-4">
				<View className="w-1/2 h-28 mb-10">
					<TouchableOpacity
						onPress={async () => {
							navigation.navigate("MeditationTimer", { track: playListData });
						}}
						className="h-28 mr-2 rounded-xl">
						<Image className="w-full h-28 rounded-xl" source={sleepWell} />
					</TouchableOpacity>
					<Text
						style={{ fontSize: 13 }}
						className="mt-2 ml-2 font-bold text-white">
						Nature Sounds
					</Text>
				</View>
				<View className="w-1/2 h-28">
					<TouchableOpacity
						onPress={async () => {
							navigation.navigate("MeditationTimer", { track: playListData });
						}}
						className="h-28 ml-2 rounded-xl">
						<Image className="w-full h-28 rounded-xl" source={relax} />
					</TouchableOpacity>
					<Text
						style={{ fontSize: 13 }}
						className="ml-3 mt-2 font-bold text-white">
						Ambience
					</Text>
				</View>
				<View className="w-1/2 h-28">
					<TouchableOpacity
						onPress={async () => {
							navigation.navigate("MeditationTimer", { track: playListData });
						}}
						className="h-28 mr-2 rounded-xl">
						<Image className="w-full h-28 rounded-xl" source={meditate} />
					</TouchableOpacity>
					<Text
						style={{ fontSize: 13 }}
						className="mt-2 ml-2 font-bold text-white">
						Sacred Sounds
					</Text>
				</View>
				<View className="w-1/2 h-28">
					<TouchableOpacity
						onPress={async () => {
							navigation.navigate("MeditationTimer", { track: playListData });
						}}
						className="h-28 ml-2 rounded-xl">
						<Image className="w-full h-28 rounded-xl" source={habit} />
					</TouchableOpacity>
					<Text
						style={{ fontSize: 13 }}
						className="ml-3 mt-2 font-bold text-white">
						Guided Meditation
					</Text>
				</View>
			</View>
		</View>
	);
};

export default ChooseByCategory;
