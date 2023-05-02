import {
    COUNT_DECREASE,
    COUNT_INCREASE,
    REQUEST_USDA_API_FAILED,
    REQUEST_USDA_API_PENDING,
    REQUEST_USDA_API_SUCCESS}
    from "../constants";

const initialState = {
    quickLog: [],
    counter: 0,
    isPending: false,
    api: [],
    error: ''
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

export const requestAPI = (state=initialState, action={}) => {
    switch(action.type){
        case REQUEST_USDA_API_PENDING:
            return Object.assign({}, state, { isPending: true })
        case REQUEST_USDA_API_SUCCESS:
            return Object.assign({}, state, { api: action.payload, isPending: false })
        case REQUEST_USDA_API_FAILED:
            return Object.assign({}, state, { error: action.payload, isPending: false })
        default:
            return state;
    }
}

export const mapStateToProps = state => {
    return {

    }
}

export const mapDispatchToProps = (dispatch) => {
    return{
        usdaFoodData: (event) => dispatch
    }
}







