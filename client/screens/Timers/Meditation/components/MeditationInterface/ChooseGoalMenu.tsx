import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { useAppSelector } from "../../../../../redux-manager/hooks";
import emoji from "../../../../../utils/timer/meditation-dash/emoji-data";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

const ChooseGoalMenu = () => {
	return (
		<View>
			<TouchableOpacity
				onPress={() => {}}
				style={{
					backgroundColor: "#E6E6E6",
				}}
				className="flex w-auto h-10 rounded">
				<View className="flex-row my-auto">
					<Text className="ml-4 my-auto">What is your goal?</Text>
					<View className="ml-auto mr-4">
						<Icon name="angle-down" size={24} />
					</View>
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default ChooseGoalMenu;
