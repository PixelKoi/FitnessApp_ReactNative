import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

export default class LoginScreen extends Component {
	render() {
		return (
			<View className="flex-1 justify-center items-center space-y-10">
				<TextInput> Name </TextInput>
				<TextInput> Password </TextInput>
				<Button>Login</Button>
				<Text>Forgot your password?</Text>
				<Text>or</Text>
				<Button>Continue With Google</Button>
			</View>
		);
	}
}
