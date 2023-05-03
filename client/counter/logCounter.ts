import { useState } from "react";

export const handlePlus = (foodArray, index) => {
    if (foodArray[index].quantity < 20) {
        foodArray[index].quantity += 1;
    }
    // rest of the code
};

export const handleMinus = (foodArray, index) => {
    if (foodArray[index].quantity > 0) {
        foodArray[index].quantity -= 1;
    }
    // rest of the code
};