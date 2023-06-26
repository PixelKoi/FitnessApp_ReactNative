import { useState, useEffect } from "react";
// supabase AUTH
import { supabase } from "./utils/supabase_authentication/supabase";
import Auth from "./screens/Account/Auth";
import { Session } from "@supabase/supabase-js";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// REDUX toolkit
import { store, persistor } from "./redux-manager/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

//navigation
import Navigation from "./navigation/Navigation";
import "react-native-gesture-handler";

// Watermelon
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import { database } from "./database/index";

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
				<DatabaseProvider database={database}>
					<Provider key={session.user.id} store={store}>
						<PersistGate loading={null} persistor={persistor}>
							<GestureHandlerRootView style={{ flex: 1 }}>
								<Navigation session={session} />
							</GestureHandlerRootView>
						</PersistGate>
					</Provider>
				</DatabaseProvider>
			) : (
				<DatabaseProvider database={database}>
					<GestureHandlerRootView style={{ flex: 1 }}>
						<Provider store={store}>
							<Auth />
						</Provider>
					</GestureHandlerRootView>
				</DatabaseProvider>
			)}
		</>
	);
}
