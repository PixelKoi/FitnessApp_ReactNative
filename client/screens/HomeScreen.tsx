import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = ({ navigation }) => {
	return (
		<View className="flex-1 justify-center items-center space-y-10">
			<Text> Fitness PR </Text>
			<View className="container mx-auto px-4">
				<Button className="mb-4" sonPress={() => navigation.navigate('SignUp')} mode="contained">
					<Text>Sign Up</Text>
				</Button>
				<Button mode="contained">
					<Text onPress={() => navigation.navigate('Login')}>Login</Text>
				</Button>
			</View>
		</View>
	);
};

export default HomeScreen;
