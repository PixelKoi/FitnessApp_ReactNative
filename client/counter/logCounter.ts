import { useState } from "react";

export const handlePlus = (foodArray) => {
    if (foodArray[0].quantity < 20) {
        foodArray[0].quantity += 1;
    }
    console.log("FOODARRAY?",foodArray)
    console.log('FOOD_ARRAY LENGTH: ',foodArray.length)
    const descriptions = foodArray.map((food) => food.quantity);
    console.log(descriptions)
    return foodArray;

};

export const handleMinus = (foodArray) => {
    if (foodArray[0].quantity > 0) {
        foodArray[0].quantity -= 1;
    }
    console.log("FOODARRAY?",foodArray)
    console.log('FOOD_ARRAY LENGTH: ',foodArray.length)
    const descriptions = foodArray.map((food) => food.quantity);
    console.log(descriptions)
    return foodArray;
};