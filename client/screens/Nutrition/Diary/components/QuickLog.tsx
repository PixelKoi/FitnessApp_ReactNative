import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Surface } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector } from "../../../../redux-manager/hooks";

const QuickLog = (props: any) => {
	const tabNavigation = useNavigation();

	const { breakfast, lunch, dinner, snacks } = useAppSelector(
		(state) => state.inventory
	);

	return (
		<View>
			{/* grid */}
			<View className="flex-row flex-wrap justify-between mt-4">
				{/* Breakfast */}
				<TouchableOpacity
					onPress={() => {
						tabNavigation.navigate("Meal", { breakfast: breakfast });
					}}
					style={{ width: "48%", height: 140 }}
					className="w-1/2 bg-white mb-4 justify-center items-center rounded-xl">
					<Surface
						style={{ width: "100%", height: 140 }}
						className="w-1/2 bg-white  justify-center items-center rounded-xl">
						<View>
							<Image
								style={{ width: 75, height: 70 }}
								source={require("../../../../assets/images/Diary/breakfast.png")}
							/>
						</View>
						<Text className="text-black mt-1 font-semibold">Breakfast</Text>
						<Text className="text-xs">{props.breakfastCal} calories</Text>
					</Surface>
				</TouchableOpacity>
				{/* Lunch */}
				<TouchableOpacity
					onPress={() => {
						tabNavigation.navigate("Meal", { lunch: lunch });
					}}
					style={{ width: "48%", height: 140 }}
					className="w-1/2 bg-white mb-4 justify-center items-center rounded-xl">
					<Surface
						style={{ width: "100%", height: 140 }}
						className="w-1/2 bg-white  justify-center items-center rounded-xl">
						<View>
							<Image
								style={{ width: 75, height: 70 }}
								source={require("../../../../assets/images/Diary/Lunch.png")}
							/>
						</View>
						<Text className="text-black mt-1 font-semibold">Lunch</Text>
						<Text className="text-xs">{props.lunchCal} calories</Text>
					</Surface>
				</TouchableOpacity>
				{/* Dinner */}
				<TouchableOpacity
					onPress={() => {
						tabNavigation.navigate("Meal", { dinner: dinner });
					}}
					style={{ width: "48%", height: 140 }}
					className="w-1/2 bg-white  justify-center items-center rounded-xl">
					<Surface
						style={{ width: "100%", height: 140 }}
						className="w-1/2 bg-white  justify-center items-center rounded-xl">
						<View>
							<Image
								style={{ width: 75, height: 70 }}
								source={require("../../../../assets/images/Diary/dinner.png")}
							/>
						</View>
						<Text className="text-black mt-1 font-semibold">Dinner</Text>
						<Text className="text-xs">{props.dinnerCal} calories</Text>
					</Surface>
				</TouchableOpacity>
				{/* Snack */}
				<TouchableOpacity
					onPress={() => {
						tabNavigation.navigate("Meal", { snack: snacks });
					}}
					style={{ width: "48%", height: 140 }}
					className="w-1/2 bg-white  justify-center items-center rounded-xl">
					<Surface
						style={{ width: "100%", height: 140 }}
						className="w-1/2 bg-white  justify-center items-center rounded-xl">
						<View>
							<Image
								style={{ width: 75, height: 70 }}
								source={require("../../../../assets/images/Diary/Coffee.png")}
							/>
						</View>
						<Text className="text-black mt-1 font-semibold">Snack</Text>
						<Text className="text-xs">{props.snackCal} calories</Text>
					</Surface>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default QuickLog;
