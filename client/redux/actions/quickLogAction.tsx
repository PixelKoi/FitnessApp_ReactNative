import {COUNT_DECREASE, COUNT_INCREASE} from "../constants";

export const incrementQuickLogItem = (text) => ({
    type: COUNT_INCREASE,
    payload: text
});

export const decrementQuickLogItem = (text) => ({
    type: COUNT_DECREASE,
    payload: text
})