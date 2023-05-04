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
// REDUX toolkir
import {store} from './app/store'
import { Provider } from 'react-redux'




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

