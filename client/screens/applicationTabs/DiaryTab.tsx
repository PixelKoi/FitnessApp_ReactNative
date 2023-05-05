import React, {useEffect} from 'react';
import { View } from 'react-native';
import { Divider, Text } from 'react-native-paper';

const DiaryTab = (props) => {
	console.log("passing food data to FOODDIARY:",props.route);
	const selectedFoods = props.route.params
	console.log(typeof selectedFoods)
	// TODO: set a global state for totalCalories and pass to diary
	console.log(selectedFoods)
	selectedFoods.map(food => {
		console.log(food.quantity , "count, calories: ", food.food.Calories)
	})
	const caloriesConsumed = Object.keys(selectedFoods).reduce((total, foodId) => {
		const food = selectedFoods[foodId];
		return total + food.food.Calories * food.quantity;
	}, 0);
	console.log(caloriesConsumed)


	// const totalCalories = Object.keys(selectedFoods).reduce((total, foodId) => {
	// 	const food = selectedFoods[foodId];
	// 	return total + food.food.Calories * food.quantity;
	// }, 0);
	// useEffect(()=>{
	// 	console.log(totalCalories)
	// }, [props])
	return (
		<View className="flex-1 items-center">
				<View className="h-16 p-4 bg-black justify-center">
					<Text className="text-white ">
						{/*This top bar will be changed to {} destruct variables...*/}
						Total calories - {caloriesConsumed} + exercise = calories remaining
					</Text>
					<Text className="text-white text font-bold">
						Goal - Food + Exercise = Remaining
					</Text>
				</View>
				{/* other content */}
			<View className="w-full mt-4">
				<Text className="text-2xl font-bold mb-2">Breakfast</Text>
			</View>
			<Divider />

			<View className="w-full mt-4">
				<Text className="text-2xl font-bold mb-2">Lunch</Text>
			</View>
			<Divider />

			<View className="w-full mt-4">
				<Text className="text-2xl font-bold mb-2">Dinner</Text>
			</View>
			<Divider />

			<View className="w-full mt-4">
				<Text className="text-2xl font-bold mb-2">Snacks</Text>
			</View>
			<Divider />
		</View>
	);
};

export default DiaryTab;
