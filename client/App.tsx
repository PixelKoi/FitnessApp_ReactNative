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

	const Stack = createNativeStackNavigator();
	const HomeStack = ({ session }: { session: Session }) => {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="Login">
						{(props) => <Account {...props} session={session} />}
					</Stack.Screen>
					<Stack.Screen
						options={{ headerShown: false }}
						name="TabNavigator"
						component={TabNavigator}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		);
	};

	const Tab = createBottomTabNavigator();
	const TabNavigator = () => {
		return (
			<Tab.Navigator
				initialRouteName="QuickLog"
				screenOptions={{
					tabBarActiveTintColor: "#6700ff",
					tabBarInactiveTintColor: "#4d4d4d",
					tabBarStyle: {
						backgroundColor: "#84d0ff",
						borderTopColor: "transparent",
					},
				}}>
				<Tab.Screen
					name="QuickLog"
					component={QuickLog}
					options={{
						tabBarIcon: ({ color, size }) => (
							<MagnifyingGlassIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="Diary"
					component={Diary}
					options={{
						tabBarIcon: ({ color, size }) => (
							<BookOpenIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="Fasting"
					component={Fasting}
					options={{
						tabBarIcon: ({ color, size }) => (
							<ClockIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={Proflile}
					options={{
						tabBarIcon: ({ color, size }) => (
							<UserCircleIcon name="ios-add" size={20} color="black" />
						),
					}}
				/>
			</Tab.Navigator>
		);
	};

	return (
		<>
			{session && session.user ? (
				<Provider key={session.user.id} store={store}>
					<HomeStack session={session} />
				</Provider>
			) : (
				<View>
					<Auth />
				</View>
			)}
		</>
	);
}
