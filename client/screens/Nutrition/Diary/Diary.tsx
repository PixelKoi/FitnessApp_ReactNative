import React, { useEffect } from "react";
import { Image, TouchableOpacity, View, ScrollView } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDatabase } from "@nozbe/watermelondb/hooks";
import { Q } from "@nozbe/watermelondb";
import completeDiary from "../../../database/models/Food";
import { useAppSelector, useAppDispatch } from "../../../redux-manager/hooks";
import Food from "../../../database/models/Food";
import { getAllTables } from "../../../database/helpers/mainHelper";
import QuickLog from "./components/QuickLog";
import Icon from "react-native-vector-icons/FontAwesome";
import DiaryBarChartVictory from "../../../utils/charts/diary/barChart/DiaryBarChartVictory";
import CustomCalendar from "../../../utils/calendar/CustomCalendar";
import CalBarChart from "../../Dashboard/components/CalBarChart";
const Diary = () => {
	const tabNavigation = useNavigation();
	const database = useDatabase();
	const profileInfo = useAppSelector((state) => state.user);
	console.log("PROFILE INFO: ", profileInfo);
	console.log("PROFILE CALS: ", profileInfo.dailyCal);

	const dispatch = useAppDispatch();

	const { colors } = useAppSelector((state) => state.theme);
	const primary_color = colors.primary;

	const { breakfast, lunch, dinner, snacks } = useAppSelector(
		(state) => state.inventory
	);

	function calculateTotalMacros(foodItems) {
		const proteinArray = foodItems.map((item) => item.Protein);
		const fatArray = foodItems.map((item) => item.Fat);
		const carbsArray = foodItems.map((item) => item.Carbs);
		const totalProteins = proteinArray.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);
		const totalCarbs = carbsArray.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);
		const totalFats = fatArray.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);
		return { totalProteins, totalCarbs, totalFats };
	}

	const allFoodItems = [...breakfast, ...lunch, ...dinner, ...snacks];

	const { totalProteins, totalCarbs, totalFats } =
		calculateTotalMacros(allFoodItems);

	function calculateTotalCalories(foodItems) {
		const caloriesArray = foodItems.map((item) => item.Calories);
		const totalCalories = caloriesArray.reduce(
			(accumulator, currentValue) => accumulator + currentValue,
			0
		);
		return totalCalories;
	}

	const breakfast_calories = calculateTotalCalories(breakfast);
	const lunch_calories = calculateTotalCalories(lunch);
	const dinner_calories = calculateTotalCalories(dinner);
	const snacks_calories = calculateTotalCalories(snacks);
	const total_cals =
		breakfast_calories + lunch_calories + dinner_calories + snacks_calories;
	const remainder = total_cals - profileInfo.dailyCal;
	// TODO: ADD react-native-calendars, block off from accessing days before registration and don't allow modifying older dates
	React.useLayoutEffect(() => {
		tabNavigation.setOptions({
			title: "Diary",
			headerStyle: {
				shadowColor: "transparent",
			},
			headerTintColor: "black",
			headerLeft: () => (
				<TouchableOpacity
					className="ml-4"
					onPress={() => {
						tabNavigation.navigate("Nutrition");
					}}>
					<Icon name="angle-left" size={24} />
				</TouchableOpacity>
			),
		});
	});

	const diaryButton = async () => {
		const food_instance = database.get("foods");

		// console.log("FOODS in 🍉🍉🍉", food_instance);
		console.log("FOODS", typeof selectedFoods[0].food.Carbs);
		//
		// const data = await database.write(async () => {
		//   await database.get<Food>("foods").create((data) => {
		//     data.completeDiary(
		//       (data.calories = selectedFoods[0].food.Calories),
		//       (data.carbs = selectedFoods[0].food.Carbs),
		//       (data.fat = selectedFoods[0].food.Fat),
		//       (data.protein = selectedFoods[0].food.Protein),
		//       (data.description = selectedFoods[0].food.description)
		//     );
		//   });
		// });
		// if (data) {
		//   console.log("Successfully created food post");
		//   const all_food = await database.get("foods").query().fetch();
		//   console.log("food saved in DB!:", all_food);
		// }
	};

	useEffect(() => {
		//show all tables
		const getTables = getAllTables();
		console.log("Tables: ", getTables);
	}, []);

	return (
		<View className="flex-1 bg-white pb-4">
			<View className="mx-4">
				<View className="flex-row">
					<CustomCalendar />
				</View>
				{/* Cal Chart */}
				<View className="my-6">
					<CalBarChart
						caloriesRemaining={remainder}
						protein={totalProteins}
						carbs={totalCarbs}
						fats={totalFats}
					/>
				</View>

				{/* Quick Log Food */}
				<View className="flex-row">
					<Text className="ml-2 text-2xl font-bold">Daily Intake</Text>
					<Button
						onPress={() => console.log("log it ")}
						style={{ backgroundColor: "#6F7CF2" }}
						className="ml-auto h-10 rounded">
						<Text className="my-auto px-3 text-white">Complete Diary</Text>
					</Button>
				</View>

				<QuickLog
					breakfastCal={breakfast_calories}
					lunchCal={lunch_calories}
					dinnerCal={dinner_calories}
					snackCal={snacks_calories}
				/>
			</View>
		</View>
	);
};

export default Diary;
