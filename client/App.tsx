import {useState, useEffect} from "react";
import NavigationComponent from "./screens/NavigationComponent";
// REDUX
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'
import {quickLogFoods} from "./redux/reducers/quickLogReducer";
//  @reduxjs/toolkit BAD IDEA for Initial implementation! Do not CHANGE
const logger = createLogger();
const store = createStore(quickLogFoods, applyMiddleware(logger))

export default function App() {
	useEffect(()=>{
		console.log(store.getState())
	},[store])
	return (
		<Provider store={store}>
			<NavigationComponent/>
		</Provider>
	);
}

