import { useState, useEffect } from "react";
import NavigationComponent from "./screens/NavigationComponent";
// supabase AUTH
import { supabase } from "./features/supabase_authentication/supabase";
import Auth from "./screens/authenticationScreens/Auth";
import Account from "./screens/authenticationScreens/Account";
import { Session } from "@supabase/supabase-js";
import { View } from "react-native";
// REDUX toolkir
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ApplicationContainer } from "./screens/NavigationComponent";
export default function App() {
	/* I commented out your previous code and placed it at the bottom and used the supabase auth tutorial to work on account screen */
	const [session, setSession] = useState<Session | null>(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
		});

		supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
		});
	}, []);

	return (
		<>
			{session && session.user ? (
				<Provider key={session.user.id} session={session} store={store}>
					<ApplicationContainer />
				</Provider>
			) : (
				<View>
					<Auth />
				</View>
			)}
		</>
	);
}

// export default function App() {
// 	const [session, setSession] = useState<Session | null>(null)

// 	useEffect(() => {
// 		supabase.auth.getSession().then(({ data: { session } }) => {
// 			setSession(session)
// 		})

// 		supabase.auth.onAuthStateChange((_event, session) => {
// 			setSession(session)
// 		})
// 	}, [])

// 	return (
// 	<>
// 		{
// 			session && session.user ?
// 				<Provider key={session.user.id} session={session} store={store}>
// 					<ApplicationNavigator/>
// 				</Provider> :
// 				<View>
// 					<Auth />
// 				</View>

// 		}
// 	</>

// 	);
// }
