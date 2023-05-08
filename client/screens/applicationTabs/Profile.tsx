import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TextInput, Button, Checkbox } from "react-native-paper";
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
import {PaperClipIcon} from "react-native-heroicons/outline";

const UserBioInput = () => {
	React.useLayoutEffect(
		() => {
			navigation.setOptions({
				headerLeft: () => (
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<Text>Back</Text>
					</TouchableOpacity>
				),
				headerRight: () => (
					<TouchableOpacity onPress={() => navigation.navigate('Export')}>
						<PaperClipIcon name="ios-add" size={20} color="black" style={{ marginRight: 10 }}/>
					</TouchableOpacity>
				)
			});
		},
		[ navigation ]
	);

	/*
	For men: BMR = 88.36 + (13.4 x weight in kg) + (4.8 x height in cm) - (5.7 x age in years)
	For women: BMR = 447.6 + (9.2 x weight in kg) + (3.1 x height in cm) - (4.3 x age in years)

	Sedentary (little or no exercise): TDEE = BMR x 1.2
	Lightly active (light exercise or sports 1-3 days/week): TDEE = BMR x 1.375
	Moderately active (moderate exercise or sports 3-5 days/week): TDEE = BMR x 1.55
	Very active (hard exercise or sports 6-7 days/week): TDEE = BMR x 1.725
	Extremely active (very hard exercise or sports, physical job or training twice a day): TDEE = BMR x 1.9

	Lose 1lb a week = -500 cal deficit
	*/

	//Navigation
	const navigation = useNavigation();

	//Redux
	const userInfo = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	//Hooks
	const [maleChecked, setMaleChecked] = useState(false);
	const [femaleChecked, setFemaleChecked] = useState(false);
	const [checked, setChecked] = useState<boolean>(false);
	const [showEditProfile, setEditProfile] = useState<boolean>(false);
	const [bmr, setBMR] = useState<number>(0);
	const [dailyCalories, setCalories] = useState<number>(0);
	const [name, setName] = useState<string>("");
	const [age, setAge] = useState<number>(0);
	const [gender, setGender] = useState<string>("");
	const [height, setHeight] = useState<number>(0);
	const [weight, setWeight] = useState<number>(0);
	const [activityLevel, setActivityLevel] = useState<string>("");
	const [goal, setGoal] = useState<string>("");

	const calAlgo = () => {
		let calBMR = 0;

		if (gender === "Male") {
			calBMR = 88.3 + 14.4 * weight + 4.8 * height - 5.7 * age;
			console.log(calBMR);
		} else if (gender === "Female") {
			calBMR = 447.6 + 9.2 * weight + 3.1 * height - 4.3 * age;
		}

		switch (activityLevel) {
			case "Sedentary":
				calBMR *= 1.2;
				break;
			case "Lightly active":
				calBMR *= 1.375;
				break;
			case "Moderately active":
				calBMR *= 1.55;
				break;
			case "Very active":
				calBMR *= 1.725;
				break;
			case "Extremely active":
				calBMR *= 1.9;
				break;
			default:
				break;
		}

		switch (goal) {
			case "1":
				setCalories(calBMR - 500);
				break;
			case "2":
				setCalories(calBMR - 1000);
				break;
			default:
				setCalories(calBMR);
				break;
		}

		setBMR(calBMR);
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
						<Text>BMR: {bmr} calories</Text>
						<Text>Daily Calorie Needs: {dailyCalories} calories</Text>
					</View>
				</View>
				<Button
					className="mt-6 py-1"
					onPress={() => setEditProfile(true)}
					mode="contained">
					<Text>Edit Profile</Text>
				</Button>
				<Button
					className="mt-6 py-1 mx-4"
					onPress={() => calAlgo()}
					mode="contained">
					<Text>Calculate Algo</Text>
				</Button>
			</View>
		);
	};

	const handleMaleCheck = () => {
		setMaleChecked(!maleChecked);
		setGender("Male");
		setFemaleChecked(false);
	};

	const handleFemaleCheck = () => {
		setFemaleChecked(!femaleChecked);
		setGender("Female");
		setMaleChecked(false);
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
				<Checkbox.Item
					label="Male"
					status={maleChecked ? "checked" : "unchecked"}
					onPress={handleMaleCheck}
				/>
				<Checkbox.Item
					label="Female"
					status={femaleChecked ? "checked" : "unchecked"}
					onPress={handleFemaleCheck}
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
