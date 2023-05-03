import React, { useState, useMemo } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import {USDA_API_KEY} from '../../config'
import {
    CheckCircleIcon
} from 'react-native-heroicons/outline'
import {handleMinus, handlePlus} from "../../counter/logCounter";

const QuickLogTab = ({navigation}) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Food Quick Log',
            headerLeft: () => null, // this will hide the back button
            headerRight: () => (
                <TouchableOpacity onPress={() => console.log('Header profile button pressed')}>
                    <CheckCircleIcon name="ios-add" size={30} color="black" style={{ marginRight: 10 }} />
                </TouchableOpacity>
            ),
        });
    }, [navigation]);
    const [foodName, setFoodName] = useState('');
    const [foodList, setFoodList] = useState([]);


    // Simple Query testing API: https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=Cheddar%20Cheese
    const params = {
        api_key: USDA_API_KEY,
        dataType: ["Survey (FNDDS)", "Branded"],
        pageSize: 5,
        pageNumber:5,
    }
    const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&pageSize=${params.pageSize}&pageNumber=${params.pageNumber}&api_key=${params.api_key}&dataType=${params.dataType}`
    const handleSearch = async () => {
        try {
            const response = await fetch(apiUrl)
            const data = await response.json();
            setFoodList(data.foods);
            // console.log("foodList: ",data.foods[0])
        } catch (error) {
            console.error(error);
        }
    };

    const [foodLogs, setFoodLogs] = useState({});
    let foodArray = []


    const renderFoodItem = ({ item }) => {
        // only create objects when the component renders
        const foodLog = {
            quantity: 0,
            isSelected: false,
            id: item.fdcId,
            food: {
                description: item.description,
                Protein: item.foodNutrients[0].value,
                Fat: item.foodNutrients[1].value,
                Carbs: item.foodNutrients[2].value,
                Calories: item.foodNutrients[3].value,
            }
        };
        foodArray.push(foodLog)
        return (
            <View className="border border-black p-8 m-2">
                <Text>{foodLog.food.description}</Text>
                <Text>{foodLog.food.Protein}g Protein</Text>
                <Text>{foodLog.food.Fat}g Fat</Text>
                <Text>{foodLog.food.Carbs}g Carbs</Text>
                <Text>{foodLog.food.Calories} Calories</Text>
                <Text>Service size: {item.servingSize} grams</Text>

                {/*<Text>{item.foodNutrients[0].nutrientName}</Text>*/}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={()=> handleMinus(foodLog, foodArray)} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5 }}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <TextInput value={foodLog.quantity.toString()} onChangeText={(text) => foodLog.quantity.toString()}
                               keyboardType="numeric"
                               style={{ marginHorizontal: 10, padding: 5, borderWidth: 1, borderColor: 'gray', borderRadius: 5, minWidth: 50, textAlign: 'center' }} />

                    <TouchableOpacity onPress={() => handlePlus(foodLog, foodArray)} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5 }}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View>
            <TextInput
                value={foodName}
                onChangeText={setFoodName}
                placeholder="Search Food"
                className="mb-5"
            />
            <Button title="Search" onPress={handleSearch} />
            <FlatList
                data={foodList}
                renderItem={renderFoodItem}
                keyExtractor={(item) => item.fdcId.toString()}
            />
        </View>
    );
};

export default QuickLogTab;
