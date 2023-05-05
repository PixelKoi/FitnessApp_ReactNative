import React, {useState, useMemo, useEffect} from 'react';
import { View, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { USDA_API_KEY } from '../../config';
import { CheckCircleIcon } from 'react-native-heroicons/outline';
// import {handleMinus, handlePlus} from "../../counter/logCounter";
import { params } from '../../redux/constants';
import { useNavigation } from '@react-navigation/native';
import { Modal, Portal, Text, Button, Card, Provider } from 'react-native-paper';

const QuickLogTab = ({ navigation }) => {

	const tabNavigation = useNavigation();

	React.useLayoutEffect(
		() => {
			navigation.setOptions({
				title: 'Food Quick Log',
				headerLeft: () => null, // this will hide the back button
				headerRight: () => (
					<TouchableOpacity onPress={() => setSaveButton(true)}>
						<CheckCircleIcon name="ios-add" size={30} color="black" style={{ marginRight: 10 }} />
					</TouchableOpacity>
				)
			});
		},
		[ navigation ]
	);
	const [ foodName, setFoodName ] = useState('');
	const [ foodList, setFoodList ] = useState([]);
	const [ foodArray, setFoodArray ] = useState([]);
	const [ saveButton, setSaveButton ] = useState(false)
	const [visible, setVisible] = React.useState(false);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);
	const containerStyle = {backgroundColor: 'white', padding: 20};

	// Simple Query testing API: https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=Cheddar%20Cheese
	const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&pageSize=${params.pageSize}&pageNumber=${params.pageNumber}&api_key=${params.api_key}&dataType=${params.dataType}`;
	const handleSearch = async () => {
		try {
			const response = await fetch(apiUrl);
			const data = await response.json();
			// console.log("DATA:",data)
			let food = data.foods;
			setFoodList(data.foods);
			let tempArray = [];
			food.forEach((item) => {
				// console.log("ITERATE")
				const foodLog = {
					quantity: 0,
					isSelected: false,
					id: item.fdcId,
					food: {
						description: item.description,
						Protein: item.foodNutrients[0].value,
						Fat: item.foodNutrients[1].value,
						Carbs: item.foodNutrients[2].value,
						Calories: item.foodNutrients[3].value
					}
				};
				tempArray.push(foodLog);
			});
			// console.log("tempArray: ",tempArray)
			// console.log("tempArray Length",tempArray.length)
			setFoodArray(tempArray);
			// console.log("FOOD_ARRAY LENGTH: ", foodArray.length);
			// console.log("FOODARRAY?", foodArray);
			// foodArray.map((food) => console.log("FOOD?:",food.quantity));
			// console.log("foodList: ",data.foods[0])
		} catch (error) {
			console.error(error);
		}
	};
	const handlePlus = (foodArray, index) => {
		const updatedFoodArray = [ ...foodArray ];
		const updatedFood = { ...updatedFoodArray[index] };
		if (updatedFood.quantity < 20) {
			updatedFood.quantity += 1;
			updatedFoodArray[index] = updatedFood;
			setFoodArray(updatedFoodArray);
			console.log(foodArray);
			console.log("BABY");
		}
	};

	const handleMinus = (foodArray, index) => {
		const updatedFoodArray = [ ...foodArray ];
		const updatedFood = { ...updatedFoodArray[index] };
		if (updatedFood.quantity > 0) {
			updatedFood.quantity -= 1;
			updatedFoodArray[index] = updatedFood;
			setFoodArray(updatedFoodArray);
			console.log(foodArray);
		}
	};

	useEffect(() => {
		if (saveButton){
			saveToDiary();
		}

	},[foodArray, saveButton])


	const saveToDiary = () =>{
		const selectedFoods = foodArray.filter((food) => food.quantity > 0);
		console.log("Selected FOODS: ", selectedFoods)
		setSaveButton(false)
		tabNavigation.navigate('DiaryTab', selectedFoods);
	}

	const handleInputChange = (text, food) => {};
	const renderFoodItem = (food, index, foodArray) => {
		// only create objects when the component renders
		console.log('food.quantity', food.quantity, index);
		// console.log("STATE", foodArray);
		return (
			<View className="p-2 ">
				<Card>
					<Card.Content>
				<Text>{food.food.description}</Text>
				<Text>{food.food.Protein}g Protein</Text>
				<Text>{food.food.Fat}g Fat</Text>
				<Text>{food.food.Carbs}g Carbs</Text>
				<Text>{food.food.Calories} Calories</Text>

				{/*<Text>Service size: {item.servingSize} grams</Text>*/}

				{/*<Text>{item.foodNutrients[0].nutrientName}</Text>*/}

				<View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
					<TouchableOpacity
						onPress={() => handleMinus(foodArray, index)}
						style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5 }}
					>
						<Text>-</Text>
					</TouchableOpacity>
					<TextInput
						value={food.quantity.toString()}
						onChangeText={(text) => handleInputChange(text, food)}
						keyboardType="numeric"
						style={{
							marginHorizontal: 10,
							padding: 5,
							borderWidth: 1,
							borderColor: 'gray',
							borderRadius: 5,
							minWidth: 50,
							textAlign: 'center'
						}}
					/>

					<TouchableOpacity
						onPress={() => handlePlus(foodArray, index)}
						style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5 }}
					>
						<Text>+</Text>
					</TouchableOpacity>
				</View>
					</Card.Content>

				</Card>

			</View>
		);
	};

	return (
		<View>
			<TextInput className="m-4 py-1 mx-4" value={foodName} onChangeText={setFoodName} placeholder="Search Food"  />
			<Button className="mt-3 mb-3 py-1 mx-4" mode="contained" title="Search" onPress={handleSearch} >
				<Text>Search</Text>
			</Button>
			<FlatList
				data={foodArray}
				renderItem={({ item, index }) => renderFoodItem(item, index, foodArray)}
				keyExtractor={(item) => item.id.toString()}
			/>
		</View>
	);
};

export default QuickLogTab;
