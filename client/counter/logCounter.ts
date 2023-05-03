import { useState } from "react";

export const handlePlus = (foodLog, foodArray) => {
    if (foodLog.quantity < 20) {
        foodLog.quantity += 1;
    }
    console.log("FOODARRAY?",foodArray)
    console.log('FOOD_ARRAY LENGTH: ',foodArray.length)
    const descriptions = foodArray.map((food) => food.quantity);
    console.log(descriptions)
    return foodLog;

};

export const handleMinus = (foodLog, foodArray) => {
    if (foodLog.quantity > 0) {
        foodLog.quantity -= 1;
    }
    console.log("FOODARRAY?",foodArray)
    console.log('FOOD_ARRAY LENGTH: ',foodArray.length)
    const descriptions = foodArray.map((food) => food.quantity);
    console.log(descriptions)
    return foodLog;
};