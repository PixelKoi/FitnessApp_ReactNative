import React, { Component } from "react";
import { View, Text } from "react-native";
import FoodModel from "../../database/models/Food"; // Replace with the actual import

interface FoodObserverProps {
  food: FoodModel; // Assuming FoodModel is the type for the food prop
}

interface FoodObserverState {
  // Define your state properties here if needed
}

class FoodObserver extends Component<FoodObserverProps, FoodObserverState> {
  render() {
    const { food } = this.props;
    return (
      <View>
        <Text>{food.fat}</Text>
      </View>
    );
  }
}

export default FoodObserver;
