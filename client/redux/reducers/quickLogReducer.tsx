import {COUNT_DECREASE, COUNT_INCREASE} from "../constants";

const initialState = {
    quickLog: [],
    counter: 0
};

export const quickLogFoods = (state=initialState, action) => {
    switch (action.type){
        case COUNT_INCREASE:
            return { ...state, quickLog: action.payload, counter: state.counter + 1}
        case COUNT_DECREASE:
            return { ...state, quickLog: action.payload, counter: state.counter - 1}
        default:
            return state;
    }
}







