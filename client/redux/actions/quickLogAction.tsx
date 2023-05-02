import {
    COUNT_DECREASE,
    COUNT_INCREASE,
    REQUEST_USDA_API_FAILED,
    REQUEST_USDA_API_PENDING,
    REQUEST_USDA_API_SUCCESS}
    from "../constants";

import {USDA_API_KEY} from "../../config";
const params = {
    api_key: USDA_API_KEY,
    dataType: ["Survey (FNDDS)", "Branded"],
    pageSize: 5,
    pageNumber:5,
}
const apiUrl = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${`cheese`}&pageSize=${params.pageSize}&pageNumber=${params.pageNumber}&api_key=${params.api_key}&dataType=${params.dataType}`
export const incrementQuickLogItem = (text) => ({
    type: COUNT_INCREASE,
    payload: text
});

export const decrementQuickLogItem = (text) => ({
    type: COUNT_DECREASE,
    payload: text
})

export const requestAPI = (dispatch) => {
    dispatch({ type: REQUEST_USDA_API_PENDING });
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => dispatch({type: REQUEST_USDA_API_SUCCESS, payload: data}))
        .catch(e => dispatch({type: REQUEST_USDA_API_FAILED, payload: e}))
}