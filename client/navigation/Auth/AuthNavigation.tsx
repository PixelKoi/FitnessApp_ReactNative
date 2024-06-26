import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//Import Screens
import Auth from "../../screens/Account/Auth";
import SignUp from "../../screens/Account/SignUp";
import SignIn from "../../screens/Account/SignIn";
import ForgotPass from "../../screens/Account/ForgotPass";
import UpdatePass from "../../screens/Account/UpdatePass";
import { Session } from "@supabase/supabase-js";

const AuthNavigation = ({ session }: { session: Session }) => {
	const AuthNavStack = createNativeStackNavigator();
	const AuthNavigation = () => {
		return (
			<AuthNavStack.Navigator>
				<AuthNavStack.Screen
					options={{ headerShown: false }}
					name="Auth"
					component={Auth}
				/>
				<AuthNavStack.Screen
					options={{ headerShown: false }}
					name="SignIn"
					component={SignIn}
				/>
				<AuthNavStack.Screen
					options={{ headerShown: false }}
					name="SignUp"
					component={SignUp}
				/>
				<AuthNavStack.Screen options={{ headerShown: false }} name="ForgotPass">
					{(props) => <ForgotPass {...props} session={session} />}
				</AuthNavStack.Screen>
				<AuthNavStack.Screen
					options={{ headerShown: false }}
					name="UpdatePass"
					component={UpdatePass}
				/>
			</AuthNavStack.Navigator>
		);
	};

	return (
		<NavigationContainer>
			<AuthNavigation />
		</NavigationContainer>
	);
};

export default AuthNavigation;
