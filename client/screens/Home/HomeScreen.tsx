import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const HomeScreen = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}> Fitness PR </Text>
			<View style={styles.buttonContainer}>
				<Button mode="contained" style={styles.button}>
					<Text style={styles.text}>Sign Up</Text>
				</Button>
				<Button mode="contained" style={styles.button}>
					<Text onPress={() => navigation.navigate('Login')} style={styles.text}>
						Login
					</Text>
				</Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	title: {
		// marginTop: 200,
		fontSize: 46
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'red'
	},
	buttonContainer: { marginTop: 50 },
	button: {
		width: 400,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 4
	}
});

export default HomeScreen;
