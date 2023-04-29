import {useState, useEffect} from "react";
import NavigationComponent from "./screens/NavigationComponent";
// REDUX
import { Provider } from 'react-redux'
import { createStore } from "redux";
import {quickLogFoods} from "./redux/reducers/quickLogReducer";
//  @reduxjs/toolkit BAD IDEA for Initial implementation! Do not CHANGE
const store = createStore(quickLogFoods)

export default function App() {
	const [quickLog, setQuickLog] = useState([])
	const [counter, setCounter] = useState(0)
	useEffect(()=>{
		console.log(store.getState())
	},[store])
	return (
		<Provider store={store}>
			<NavigationComponent/>
		</Provider>
	);
}

