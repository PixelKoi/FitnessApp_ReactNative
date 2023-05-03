import {USDA_API_KEY} from "../config";

export const COUNT_INCREASE = 'COUNT_INCREASE'
export const COUNT_DECREASE = 'COUNT_DECREASE'

export const REQUEST_USDA_API_PENDING = 'REQUEST_USDA_API_PENDING';
export const REQUEST_USDA_API_SUCCESS = 'REQUEST_USDA_API_SUCCESS';
export const REQUEST_USDA_API_FAILED = 'REQUEST_USDA_API_FAILED';

export const params = {
    api_key: USDA_API_KEY,
    dataType: ["Survey (FNDDS)", "Branded"],
    pageSize: 5,
    pageNumber:5,
}