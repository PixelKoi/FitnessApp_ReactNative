import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default class HomeScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}> Fitness PR </Text>
				<View style={{ marginTop: 'auto' }}>
					<Button mode="contained" style={styles.button}>
						<Text style={styles.text}>Sign Up</Text>
					</Button>
					<Button mode="contained" style={styles.button}>
						<Text style={styles.text}>Login</Text>
					</Button>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	title: {
		fontSize: 46
	},
	container: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: 'red'
	},
	buttonContainer: {},
	button: {
		display: 'flex',
		alignItemsc: 'center',
		width: 400,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 4
	},
	text: {
		marginTop: 'auto'
	}
});
