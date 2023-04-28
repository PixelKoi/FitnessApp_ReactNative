import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/authenticationScreens/HomeScreen';
import LoginScreen from './screens/authenticationScreens/LoginScreen';
import SignUpScreen from './screens/authenticationScreens/SignUpScreen';
import ForgotPassScreen from './screens/authenticationScreens/ForgotPassScreen';
import ApplicationNavigator from "./screens/applicationTabs/ApplicationNavigator";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserBioInput from "./screens/userInfo/userBioInput";
const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator  screenOptions={{ headerShown: false }}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="SignUp" component={SignUpScreen} />
				<Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
				<Stack.Screen name="ApplicationNavigator" component={ApplicationNavigator} />
				<Stack.Screen name="UserBioInput" component={UserBioInput} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
