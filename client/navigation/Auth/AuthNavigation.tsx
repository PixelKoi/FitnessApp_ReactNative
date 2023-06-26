import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

//Import Screens
import Auth from "../../screens/Account/Auth";
import SignUp from "../../screens/Account/SignUp";
import SignIn from "../../screens/Account/SignIn";
import ForgotPass from "../../screens/Account/ForgotPass";

const AuthNavigation = () => {
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
				<AuthNavStack.Screen
					options={{ headerShown: false }}
					name="ForgotPass"
					component={ForgotPass}
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
