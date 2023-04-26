import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default class LoginScreen extends Component {
	render() {
		return (
			<View className="flex-1 justify-center items-center space-y-10">
				<View className="container mx-auto px-4">
					<TextInput className="mb-5"> Name </TextInput>
					<TextInput> Password </TextInput>
				</View>
				<Button className="" mode="contained">
					<Text>Login</Text>
				</Button>
				<Text>Forgot your password?</Text>
				<Text>or</Text>
				<Button mode="contained">
					<Text>Continue With Google</Text>
				</Button>
			</View>
		);
	}
}
