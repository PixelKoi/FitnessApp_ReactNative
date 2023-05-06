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
	/* 
	For men: BMR = 88.36 + (13.4 x weight in kg) + (4.8 x height in cm) - (5.7 x age in years)
	For women: BMR = 447.6 + (9.2 x weight in kg) + (3.1 x height in cm) - (4.3 x age in years)

	Sedentary (little or no exercise): TDEE = BMR x 1.2
	Lightly active (light exercise or sports 1-3 days/week): TDEE = BMR x 1.375
	Moderately active (moderate exercise or sports 3-5 days/week): TDEE = BMR x 1.55
	Very active (hard exercise or sports 6-7 days/week): TDEE = BMR x 1.725
	Extremely active (very hard exercise or sports, physical job or training twice a day): TDEE = BMR x 1.9
	*/

	//Navigation
	const navigation = useNavigation();

	//Redux
	const userInfo = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	//Hooks
	const [showEditProfile, setEditProfile] = useState<boolean>(false);
	const [bmr, setBMR] = useState<number>(0);
	const [name, setName] = useState<string>("");
	const [age, setAge] = useState<number>(0);
	const [gender, setGender] = useState<string>("");
	const [height, setHeight] = useState<number>(0);
	const [weight, setWeight] = useState<number>(0);
	const [activityLevel, setActivityLevel] = useState<string>("");
	const [goal, setGoal] = useState<number>(0);

	const calAlgo = () => {
		let calBMR = 0;

		if (gender === "male") {
			calBMR = 88.3 + 14.4 * weight + 4.8 * height - 5.7 * age;
		} else if (gender === "female") {
			calBMR = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
		}

		switch (activityLevel) {
			case "sedentary":
				calBMR *= 1.2;
				setBMR(calBMR);
				break;
			case "lightly active":
				calBMR *= 1.375;
				setBMR(calBMR);
				break;
			case "moderately active":
				calBMR *= 1.55;
				setBMR(calBMR);
				break;
			case "very active":
				calBMR *= 1.725;
				setBMR(calBMR);
				break;
			case "extremely active":
				calBMR *= 1.9;
				setBMR(calBMR);
				break;
			default:
				break;
		}

		return calBMR;
	};

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
