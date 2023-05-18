import { useState, useEffect } from "react";
import NavigationComponent from "./screens/NavigationComponent";
// supabase AUTH
import { supabase } from "./features/supabase_authentication/supabase";
import Auth from "./screens/screens/Auth";
import Account from "./screens/screens/Account";
import { Session } from "@supabase/supabase-js";
import { View } from "react-native";
// REDUX toolkir
import { store } from "./app/store";
import { Provider } from "react-redux";
import { ApplicationContainer } from "./screens/NavigationComponent";

//navigation
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import QuickLog from "./screens/applicationTabs/QuickLog";
import Proflile from "./screens/applicationTabs/Profile";
import Fasting from "./screens/applicationTabs/Fasting";
import Diary from "./screens/applicationTabs/Diary";
import {
	BookOpenIcon,
	ClockIcon,
	MagnifyingGlassIcon,
	UserCircleIcon,
} from "react-native-heroicons/outline";
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
