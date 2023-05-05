import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Auth from "../screens/authenticationScreens/Auth";
import Account from "../screens/authenticationScreens/Account2";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Auth" component={Auth} />
				<Stack.Screen name="Account" component={Account} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default RootNavigator;
