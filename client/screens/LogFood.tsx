import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text } from 'react-native';

const MyComponent = () => {
    const [foodName, setFoodName] = useState('');
    const [foodList, setFoodList] = useState([]);

    const handleSearch = async () => {
        try {
            const foodApiKey = 'HiJgd0u4cvm1mRlNW8jizLfERifOUqcuNFFQPLWJ';
            const response = await fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${foodName}&pageSize=10&pageNumber=1&api_key=${foodApiKey}`);
            const data = await response.json();
            setFoodList(data.foods);
        } catch (error) {
            console.error(error);
        }
    };

    const renderFoodItem = ({ item }) => {
        return (
            <View>
                <Text>{item.description}</Text>
            </View>
        );
    };

    return (
        <View>
            <TextInput
                value={foodName}
                onChangeText={setFoodName}
                placeholder="Search Food"
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
