import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const SignUpScreen = ({ navigation }) => {
	return (
		<View className="flex-1 justify-center items-center space-y-10">
			<View className="container mx-auto px-4">
				<TextInput label="Name" />
				<TextInput label="Email" />
				<TextInput label="Password" />
				<TextInput label="Repeat Password" secureTextEntry right={<TextInput.Icon icon="eye" />} />
			</View>
			<Button>Sign In</Button>
			<Text>Or</Text>
			<Button>Sign up with Google</Button>
		</View>
	);
};

export default SignUpScreen;
