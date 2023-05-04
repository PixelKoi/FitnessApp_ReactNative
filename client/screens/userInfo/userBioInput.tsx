import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TextInput, Button } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {changeName, changeAge} from '../../features/user/user-slice'
import { connect } from 'react-redux';

const UserBioInput = () => {

	const userInfo = useAppSelector((state) => state.user);

	const [ showEditProfile, setEditProfile ] = useState(false);
	const [ name, setName ] = useState('default');
	const [ age, setAge ] = useState('default');
	const [ gender, setGender ] = useState('default');
	const [ height, setHeight ] = useState('default');
	const [ weight, setWeight ] = useState('default');
	const [ activityLevel, setActivityLevel ] = useState('default');
	const [ goal, setGoal ] = useState('default');
	const navigation = useNavigation();

	useEffect(() => {}, []);

	// TODO: Fix navigation back button not showing on userBioInput page.
	React.useLayoutEffect(
		() => {
			navigation.setOptions({
				headerLeft: () => (
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Text>Back</Text>
					</TouchableOpacity>
				)
			});
		},
		[ navigation ]
	);

	const profile = () => {
		console.log(this.props);
		return (
			<View className="flex-1 mx-4">
				<View className="mt-10">
					<View className="flex  gap-6">
						<Text>Name: {userInfo.name}</Text>
						<Text>Age: {userInfo.age}</Text>
						<Text>Gender {userInfo.gender}</Text>
						<Text>Height (cm): {userInfo.height}</Text>
						<Text>Weight (kg): {userInfo.weight}</Text>
						<Text>Activity level (1-10): {userInfo.activity}</Text>
						<Text>Goal (1-10): {userInfo.goal}</Text>
					</View>
				</View>
				<Button className="mt-6 py-1" onPress={() => setEditProfile(true)} mode="contained">
					<Text>Edit Profile</Text>
				</Button>
			</View>
		);
	};

	const editProfile = () => {
		return (
			<View>
				<TextInput label="Enter Name" value={age} onChangeText={(age) => setAge(age)} />
				<TextInput label="Enter Age" value={age} onChangeText={(age) => setAge(age)} />
				<TextInput label="Enter Height (cm)" value={height} onChangeText={(height) => setHeight(height)} />
				<TextInput label="Enter weight (kg)" value={weight} onChangeText={(weight) => setWeight(weight)} />
				<Button className="mt-6 py-1 mx-4" onPress={() => setEditProfile(false)} mode="contained">
					<Text>Save</Text>
				</Button>
			</View>
		);
	};

	return <View className="flex-1">{showEditProfile === false ? profile() : editProfile()}</View>;
};

const mapStateToProps = (state) => {
	return { user: state.user };
};

export default connect(mapStateToProps)(UserBioInput);
