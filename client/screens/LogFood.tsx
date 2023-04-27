import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const MyComponent = () => {
    const [foodName, setFoodName] = useState('');
    const [foodList, setFoodList] = useState([]);
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
            console.log("foodList: ",data.foods[0].foodMeasures[0])
        } catch (error) {
            console.error(error);
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

export default MyComponent;
