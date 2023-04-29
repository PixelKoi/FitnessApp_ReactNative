import {useState, useEffect} from "react";
import HomeScreen from './screens/authenticationScreens/HomeScreen';
import LoginScreen from './screens/authenticationScreens/LoginScreen';
import SignUpScreen from './screens/authenticationScreens/SignUpScreen';
import ForgotPassScreen from './screens/authenticationScreens/ForgotPassScreen';
import ApplicationNavigator from "./screens/applicationTabs/ApplicationNavigator";
import UserBioInput from "./screens/userInfo/userBioInput";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
// REDUX
import { Provider } from 'react-redux'
import { createStore } from "redux";
import {quickLogFoods} from "./redux/reducers/quickLogReducer";
const store = createStore(quickLogFoods)
export default function App() {
	const [quickLog, setQuickLog] = useState([])
	const [counter, setCounter] = useState(0)
	useEffect(()=>{
		console.log(store)
	},[store])
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={({ route }) => ({
					headerShown: route.name !== 'ApplicationNavigator' && route.name !== 'UserBioInput',
				})}>
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="SignUp" component={SignUpScreen} />
					<Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
					<Stack.Screen name="ApplicationNavigator" component={ApplicationNavigator} />
					<Stack.Screen name="UserBioInput" component={UserBioInput} />
				</Stack.Navigator>

			</NavigationContainer>
		</Provider>
	);
}

