import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SignUpScreen = ({ navigation }) => {
	const [ name, setName ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const [ checkPass, setCheckPass ] = useState('');

	return (
		<View className="flex-1 justify-center items-center space-y-10">
			<View className="container mx-auto px-4">
				<TextInput label="Name" />
				<TextInput label="Email" />
				<TextInput label="Password" secureTextEntry right={<TextInput.Icon icon="eye" />} />
				<TextInput label="Repeat Password" secureTextEntry right={<TextInput.Icon icon="eye" />} />
			</View>
			<Button mode="contained">Sign In</Button>
			<Text>Or</Text>
			<Button mode="contained">Sign up with Google</Button>
		</View>
	);
};

export default SignUpScreen;
