import React, {useEffect, useState} from 'react';
import { View } from 'react-native';
import { Divider, Text, Card } from 'react-native-paper';

const Diary = (props) => {
	const selectedObject = props.route
	const selectedFoods = props.route.params.selectedFoods
	const selectedOption = props.route.params.selectedOption
	// TODO: set a global state for totalCalories and pass to diary
	const object = props.route.params
	interface Category {
		name: string;
		items: FoodItem[];
	}
	interface FoodItem {
		food: {
			Calories: number;
			Carbs: number;
			Fat: number;
			Protein: number;
			description: string;
		};
		id: number;
		isSelected: boolean;
		quantity: number;
	}
	const categories: Category[] = [
		{ name: "Snacks", items: [] },
		{ name: "Breakfast", items: [] },
		{ name: "Lunch", items: [] },
		{ name: "Dinner", items: [] },
	];
	const [selectedFud, setSelectedFud] = useState();
	const [isLoaded, setIsLoaded] = useState(false);
	const caloriesConsumed = Object.keys(selectedFoods).reduce((total, foodId) => {
		const food = selectedFoods[foodId];
		return total + food.food.Calories * food.quantity;
	}, 0);
	useEffect(() => {
		const categoryIndex = categories.findIndex((category) => category.name === selectedOption);
		if (categoryIndex >= 0) {
			categories[categoryIndex].items.push(...selectedFoods);
			const populatedCategories = categories.filter(category => category.items.length > 0);

			for (const obj of populatedCategories) { // loop through each object in the array
				const items = obj.items; // get the "items" array property from the current object
				const option = obj.name;
				console.log("option", option)
				for (const item of items) { // loop through each item object in the "items" array
					const food = item.food; // get the "food" object property from the current item object
					console.log("food", food); // target the "food" object and log it to the console
				}
			}

			setSelectedFud(populatedCategories);
		}
	}, [props]);

	useEffect(()=>{
		setIsLoaded(true)
	}, [selectedFud])

	const displaySelectedFud = (mealTime) => {
		console.log("selectedFud", selectedFud)
		return (
			<>
				{selectedFud.map((obj) => {
					const items = obj.items;
					const option = obj.name;
					return (
						<Card.Content key={option}>
							{option === mealTime ? (
								items.map((item) => (
									<Text key={item.id}>
										{item.food.description} - {item.quantity} Quantity {"| "}
										{item.food.Calories * item.quantity} Calories
									</Text>
								))
							) : <Text></Text>}
						</Card.Content>
					);
				})}

			</>
		);
	};


	return (
		<View className="flex-1 items-center">
				<View className="h-16 p-4 bg-black justify-center">
					<Text className="text-white ">
						Total calories - {caloriesConsumed} = calories remaining
					</Text>
					<Text className="text-white text font-bold">
						Goal - Food = Remaining
					</Text>
				</View>
				{/* other content */}
			<View className="w-full">
				<Card className="m-2 pb-4">
				<Text className="text-2xl font-bold mb-2">Unlisted Foods :{caloriesConsumed} Cals</Text>
				{selectedFoods.map((food) => (
					<View key={food.id} className="w-full mt-4">
						<Text>{food.food.description}  {food.food.Calories * food.quantity} Calories</Text>
					</View>
				))}
				</Card>
			</View>
			<View className="w-full">
				<Card className="m-2 pb-4">
					<Card.Title title="Breakfast"
								titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
					/>
					<Divider className="mb-4"/>
					{isLoaded && displaySelectedFud("Breakfast")}
				</Card>

			</View>
			<Divider />
			<View className="w-full">
				<Card className="m-2 pb-4">
					<Card.Title title="Lunch"
								titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
					/>
					<Divider />
					{isLoaded && displaySelectedFud("Lunch")}
				</Card>
			</View>
			<Divider />
			<View className="w-full">
				<Card className="m-2 pb-4">
					<Card.Title title="Dinner"
								titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
					/>
					<Divider />
					{isLoaded && displaySelectedFud("Dinner")}
				</Card>
			</View>
			<Divider />
			<View className="w-full">
				<Card className="m-2 pb-4">
					<Card.Title title="Snacks"
								titleStyle={{ fontSize: 20, fontWeight: 'bold' }}
					/>
					<Divider />
					{isLoaded && displaySelectedFud("Snacks")}
				</Card>
			</View>
			<Divider />
		</View>
	);
};

export default Diary;
