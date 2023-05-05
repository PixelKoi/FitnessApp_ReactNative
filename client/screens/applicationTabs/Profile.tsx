import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
	changeName,
	changeAge,
	changeGender,
	changeWeight,
	changeHeight,
	changeActivity,
	changeGoal,
} from "../../features/user/user-slice";
import { supabase } from "../../features/supabase_authentication/supabase";

const UserBioInput = () => {
	//Navigation
	const navigation = useNavigation();

	//Redux
	const userInfo = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	//Hooks
	const [showEditProfile, setEditProfile] = useState<boolean>(false);
	const [name, setName] = useState<string>("");
	const [age, setAge] = useState<number>(0);
	const [gender, setGender] = useState<string>("");
	const [height, setHeight] = useState<number>(0);
	const [weight, setWeight] = useState<number>(0);
	const [activityLevel, setActivityLevel] = useState<number>(0);
	const [goal, setGoal] = useState<number>(0);

	function handleEditProfile() {
		dispatch(changeName(name));
		dispatch(changeAge(age));
		dispatch(changeGender(gender));
		dispatch(changeWeight(weight));
		dispatch(changeHeight(height));
		dispatch(changeActivity(activityLevel));
		dispatch(changeGoal(goal));
	}

	// TODO: Fix navigation back button not showing on userBioInput page.
	React.useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => (
				<TouchableOpacity onPress={() => navigation.goBack()}>
					<Text>Back</Text>
				</TouchableOpacity>
			),
		});
	}, [navigation]);

	const profile = () => {
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
				<Button
					className="mt-6 py-1"
					onPress={() => setEditProfile(true)}
					mode="contained">
					<Text>Edit Profile</Text>
				</Button>
			</View>
		);
	};

	const editProfile = () => {
		return (
			<View>
				<TextInput
					label="Enter Name"
					value={name}
					onChangeText={(name) => setName(name)}
				/>
				<TextInput
					label="Enter Age"
					value={age}
					onChangeText={(age) => setAge(age)}
				/>
				<TextInput
					label="Enter Gender"
					value={gender}
					onChangeText={(gender) => setGender(gender)}
				/>
				<TextInput
					label="Enter Height (cm)"
					value={height}
					onChangeText={(height) => setHeight(height)}
				/>
				<TextInput
					label="Enter Weight (kg)"
					value={weight}
					onChangeText={(weight) => setWeight(weight)}
				/>
				<TextInput
					label="Enter Activity Level"
					value={activityLevel}
					onChangeText={(activityLevel) => setActivityLevel(activityLevel)}
				/>
				<TextInput
					label="Enter Weight Goal"
					value={goal}
					onChangeText={(goal) => setGoal(goal)}
				/>
				<Button
					className="mt-6 py-1 mx-4"
					onPress={() => {
						setEditProfile(false), handleEditProfile();
					}}
					mode="contained">
					<Text>Save</Text>
				</Button>
			</View>
		);
	};

	return (
		<View className="flex-1">
			{showEditProfile === false ? profile() : editProfile()}
		</View>
	);
};

export default UserBioInput;
