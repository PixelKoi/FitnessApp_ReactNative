import { useState, useEffect } from "react";

// supabase AUTH
import { supabase } from "./features/supabase_authentication/supabase";
import Auth from "./screens/screens/Auth";
import { Session } from "@supabase/supabase-js";
import { View } from "react-native";

// REDUX toolkit
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ApplicationContainer } from "./screens/NavigationComponent";

//navigation
import Navigation from "./Navigation/Navigation";

export default function App() {
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
				<Provider key={session.user.id} store={store}>
					<Navigation session={session} />
				</Provider>
			) : (
				<View>
					<Auth />
				</View>
			)}
		</>
	);
}
