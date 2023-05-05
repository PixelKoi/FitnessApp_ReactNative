import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { CheckCircleIcon } from 'react-native-heroicons/outline';
import { UserIcon } from 'react-native-heroicons/outline';
import { TextInput, Button } from 'react-native-paper';
import userBioInput from '../userInfo/userBioInput';
const ProfileTab = ({ navigation }) => {
	React.useLayoutEffect(
		() => {
			navigation.setOptions({
				headerLeft: () => null, // this will hide the back button
				headerRight: () => (
					<TouchableOpacity onPress={() => navigation.navigate('UserBioInput')} mode="contained">
						<UserIcon name="ios-add" size={30} color="black" style={{ marginRight: 10 }} />
					</TouchableOpacity>
				)
			});
		},
		[ navigation ]
	);
	const [ age, setAge ] = useState('');
	const [ height, setHeight ] = useState('');
	const [ weight, setWeight ] = useState('');
	return (
		<View className="flex-1 ">
			<Text>Nutrition Tab</Text>
		</View>
	);
};

export default ProfileTab;
