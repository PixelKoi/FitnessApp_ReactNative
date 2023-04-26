import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
	return (
		<View className="flex-1 justify-center items-center space-y-10">
			<Text className="text-4xl"> Fitness PR </Text>
			<View className="container mx-auto px-4">
				<Button className="mb-4 py-2" onPress={() => navigation.navigate('SignUp')} mode="contained">
					<Text>Sign Up</Text>
				</Button>
				<Button className="py-2" onPress={() => navigation.navigate('Login')} mode="contained">
					<Text>Login</Text>
				</Button>
			</View>
		</View>
	);
};

export default HomeScreen;
