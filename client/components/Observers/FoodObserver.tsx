import withObservables from "@nozbe/with-observables";
import Food from "../../database/models/Food";
import { View } from "react-native";
import React from "react";

// Pass an instance of food instance
const FoodObserver = ({ food }) => (
  <View>
    <Text>{food.fat}</Text>
  </View>
);

const enhance = withObservables(["food"], ({ food }) => ({
  food, // shortcut syntax for `comment: comment.observe()`
}));
const EnhancedFood = enhance(Food);
