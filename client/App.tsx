import {useState, useEffect} from "react";
import NavigationComponent from "./screens/NavigationComponent";
import ApplicationNavigator from './screens/applicationTabs/ApplicationNavigator'
import BottomNav from './components/navigation/BottomNav'
// supabase AUTH
import { supabase } from "./supabase_authentication/supabase";
import Auth from "./screens/authenticationScreens/Auth";
import Account from "./screens/authenticationScreens/Account";
import { Session } from '@supabase/supabase-js'
import { View } from 'react-native'
// REDUX
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from 'redux-logger'
import {quickLogFoods, requestAPI} from "./redux/reducers/quickLogReducer";
import rootReducer from './redux/reducers/rootReducer'
//  @reduxjs/toolkit BAD IDEA for Initial implementation! Do not CHANGE
const logger = createLogger();
// const rootReducer = combineReducers({ quickLogFoods, requestAPI})
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, logger))
const store = createStore(rootReducer)

export default function App() {
	const [session, setSession] = useState<Session | null>(null)

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])
	useEffect(()=>{
		console.log(store.getState())
	},[store])
	return (
	<>
		{
			session && session.user ?
				<Provider key={session.user.id} session={session} store={store}>
					<ApplicationNavigator/>
				</Provider> :
				<View>
					<Auth />
				</View>

		}
	</>

	);
}

