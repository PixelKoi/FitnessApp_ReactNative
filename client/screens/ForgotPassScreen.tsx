import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const ForgotPassScreen = ({ navigation }) => {
	const [ email, setEmail ] = useState('');

	return (
		<View className="flex-1 justify-center items-center space-y-10">
			<View className="container mx-auto px-4">
				<TextInput label="Email" />
			</View>
			<Button mode="contained">Submit</Button>
		</View>
	);
};

export default ForgotPassScreen;
