import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAppSelector } from "../../redux-manager/hooks";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DiaryBarChartVictory from "../../utils/charts/diary/barChart/DiaryBarChartVictory";
import { Surface } from "react-native-paper";
import ActivityBoard from "./components/ActivityBoard";
import CalGraph from "./components/CalGraph";

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
		<View className="flex-1  bg-white">
			<View className="mx-4">
				<Text className="text-2xl font-bold mt-4">Today</Text>

				{/* <View style={{ flexDirection: "row" }} className="px-4 mt-4">
					<DiaryBarChartVictory
						caloriesRemaining={remainder}
						protein={totalProteins}
						carbs={totalCarbs}
						fats={totalFats}
					/>
				</View> */}

				{/* Activity Section */}
				{/* <View className="mt-4">
					<CalGraph />
				</View> */}
				<ActivityBoard />
			</View>
		</View>
	);
};

export default NewDashboard;
