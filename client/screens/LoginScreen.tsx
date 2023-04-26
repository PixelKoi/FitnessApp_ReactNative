import React, { Component, useState } from 'react';
import { Text, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
	const [ text, setText ] = useState('');

	return (
		<View className="flex-1 justify-center items-center space-y-10">
			<View className="container mx-auto px-4">
				<TextInput label="Name" className="mb-5" />
				<TextInput label="Password" secureTextEntry right={<TextInput.Icon icon="eye" />} />
			</View>
			<Button className="" mode="contained">
				<Text>Login</Text>
			</Button>
			<Button onPress={() => navigation.navigate('ForgotPass')} mode="contained">
				<Text>Forgot your password?</Text>
			</Button>
			<Text>or</Text>
			<Button mode="contained">
				<Text>Continue With Google</Text>
			</Button>
		</View>
	);
};
export default LoginScreen;
