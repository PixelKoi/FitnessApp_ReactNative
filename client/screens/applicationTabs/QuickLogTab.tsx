import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, TouchableOpacity } from 'react-native';

import {
    CheckCircleIcon
} from 'react-native-heroicons/outline'

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


    const [quantity, setQuantity] = useState({});
    const [foods, setFoods] = useState([]);
    const foodLog = {
        quantity: 0,
        isSelected: false,
        food: Object
    }

    const newFoodLog = [...foods, foodLog]; // goes through foodList and add another foodLog object to the end

    // Simple Query testing API: https://api.nal.usda.gov/fdc/v1/foods/search?api_key=DEMO_KEY&query=Cheddar%20Cheese
    const params = {
        api_key: 'HiJgd0u4cvm1mRlNW8jizLfERifOUqcuNFFQPLWJ',
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
            console.log("foodList: ",data.foods[0])
        } catch (error) {
            console.error(error);
        }
    };

    const handleMinus = (fdcId) => {
        if (quantity[fdcId] > 1) {
            setQuantity({
                ...quantity,
                [fdcId]: quantity[fdcId] - 1,
            });
        }
    };

    const handlePlus = (fdcId) => {
        if (quantity[fdcId] < 20) {
            setQuantity({
                ...quantity,
                [fdcId]: quantity[fdcId] ? quantity[fdcId] + 1 : 1,
            });
        }
    };

    const renderFoodItem = ({ item }) => {
        return (
            <View className="border border-black p-8 m-2">
                <Text>{item.description}</Text>
                <Text>{item.foodNutrients[0].value}g Protein</Text>
                <Text>{item.foodNutrients[1].value}g Fat</Text>
                <Text>{item.foodNutrients[2].value}g Carbs</Text>
                <Text>{item.foodNutrients[3].value} Calories</Text>
                <Text>Service size: {item.servingSize} grams</Text>

                {/*<Text>{item.foodNutrients[0].nutrientName}</Text>*/}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity onPress={()=> handleMinus(item.fdcId)} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5 }}>
                        <Text>-</Text>
                    </TouchableOpacity>

                    <TextInput value={quantity.toString()} onChangeText={(text) => setQuantity(parseInt(text))} keyboardType="numeric" style={{ marginHorizontal: 10, padding: 5, borderWidth: 1, borderColor: 'gray', borderRadius: 5, minWidth: 50, textAlign: 'center' }} />

                    <TouchableOpacity onPress={() => handlePlus(item.fdcId)} style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5 }}>
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
