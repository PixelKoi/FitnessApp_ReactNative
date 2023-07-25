import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { useAppSelector } from "../../redux-manager/hooks";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DiaryBarChartVictory from "../../utils/charts/diary/barChart/DiaryBarChartVictory";
import { Surface } from "react-native-paper";
import ActivityBoard from "./components/ActivityBoard";
import CalBarChart from "./components/CalBarChart";

const NewDashboard = () => {
	const navigation = useNavigation();
	const { colors } = useAppSelector((state) => state.theme);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "SUM +",
			headerStyle: {
				shadowColor: "transparent",
				backgroundColor: "#ffff",
			},
			headerTintColor: "black",
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerLeft: () => (
				<View className="">
					<Image
						style={{
							width: 60,
							height: 80,
							transform: [{ scaleX: 0.4 }, { scaleY: 0.4 }],
						}}
						source={require("../../assets/images/dashboard/trophy.png")}
					/>
				</View>
			),
			headerRight: () => (
				<View>
					<TouchableOpacity
						className="mr-4  rounded-full"
						onPress={() => {
							navigation.navigate("Settings");
						}}>
						<Ionicons name="ios-settings-sharp" size={30} color={"black"} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<View className="flex-1 bg-white">
			<ScrollView>
				<View className="mx-4">
					<Text className="text-2xl font-bold mt-4">Today</Text>

					<View className="mt-4">
						<CalBarChart
							caloriesRemaining={200}
							protein={12}
							carbs={14}
							fats={12}
						/>
					</View>

					<View className="flex-row justify-center gap-1 mt-4">
						<View
							style={{
								width: 10,
								height: 10,
								borderRadius: 5,
								backgroundColor: "#FFA01C",
							}}
						/>
						<View
							style={{
								width: 10,
								height: 10,
								borderRadius: 5,
								backgroundColor: "#D9D9D9",
							}}
						/>
						<View
							style={{
								width: 10,
								height: 10,
								borderRadius: 5,
								backgroundColor: "#D9D9D9",
							}}
						/>
					</View>
					{/* Activity Section */}
					<ActivityBoard />

					<Surface
						style={{ height: 200 }}
						className="bg-white rounded-2xl mt-4 mb-40">
						<View className="flex-1">
							<Text className="text-xs font-bold p-2 ml-2">Weight</Text>
						</View>
					</Surface>
				</View>
			</ScrollView>
		</View>
	);
};

export default NewDashboard;
