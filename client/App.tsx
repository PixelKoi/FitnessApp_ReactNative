import {useState, useEffect} from "react";
import NavigationComponent from "./screens/NavigationComponent";
// supabase AUTH
import { supabase } from "./supabase_authentication/supabase";
import Auth from "./screens/authenticationScreens/Auth";
import Account from "./screens/authenticationScreens/Account";
import { Session } from '@supabase/supabase-js'
import { View } from 'react-native'
// REDUX
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from "redux";
import { createLogger } from 'redux-logger'
import {quickLogFoods} from "./redux/reducers/quickLogReducer";
//  @reduxjs/toolkit BAD IDEA for Initial implementation! Do not CHANGE
const logger = createLogger();
const store = createStore(quickLogFoods, applyMiddleware(logger))

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
					<NavigationComponent/>
				</Provider> :
				<View>
					<Auth />
				</View>

		}
	</>

	);
}

