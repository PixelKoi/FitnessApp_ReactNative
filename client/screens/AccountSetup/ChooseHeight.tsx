import React, { useState } from "react";
import { View, Text, Image, Modal } from "react-native";
import headerIMG from "../../assets/images/weight_lifting.png";
import person from "../../assets/images/male_person.png";
import { Picker } from "@react-native-picker/picker";
import { Button, Surface, Switch } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { changeWeight } from "../../redux-manager/redux-slice/user-slice";
import { useNavigation } from "@react-navigation/native";

const ChooseHeight = () => {
	const navigation = useNavigation();

	//redux imports
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	//weight meal-picker hooks
	const [metric, setMetric] = useState("kg");
	const [weight, setWeight] = useState(60);

	//Populates kg and lb arrays
	const weightKG = Array.from({ length: 150 }, (_, index) => index + 1);
	const weightLB = Array.from({ length: 330 }, (_, index) => index + 1);

	//Converts kg to lbs
	function convertKgToLbs(kg) {
		return kg * 2.20462;
	}

	//Converts lbs to kgs
	function convertPoundsToKilograms(pounds) {
		return pounds * 0.45359237;
	}

	//Toggle switch function
	const [isSwitchOn, setIsSwitchOn] = React.useState(false);
	const onToggleSwitch = () => {
		setIsSwitchOn(!isSwitchOn);
		if (isSwitchOn === false) {
			setMetric("lbs");
			setWeight(Math.round(convertKgToLbs(weight)));
		} else {
			setMetric("kg");
			setWeight(Math.round(convertPoundsToKilograms(weight)));
		}
	};

	return (
		<View
			style={{ backgroundColor: colors.secondary }}
			className="flex-1 items-center">
			<Image className="mt-10" source={headerIMG} />

			<Surface
				style={{
					borderTopLeftRadius: 60,
					borderTopRightRadius: 60,
					backgroundColor: colors.background,
				}}
				className="flex-1 h-screen w-screen">
				<View className="mx-14 mt-6">
					<Text
						style={{ color: colors.primary }}
						className="text-2xl font-bold">
						Your height?
					</Text>
					{/* Display Activity Buttons */}
				</View>

				<View className="flex-row justify-center">
					<Image className="mt-10 mr-4" source={person} />

					<Picker
						style={{ marginTop: 20 }}
						itemStyle={{
							color: colors.primary,
							width: 180,
						}}
						selectedValue={weight}
						onValueChange={(itemValue, itemIndex) => {
							setWeight(itemValue);
						}}>
						{metric === "kg"
							? weightKG.map((item) => (
									<Picker.Item label={item.toString()} value={item} />
							  ))
							: weightLB.map((item) => (
									<Picker.Item label={item.toString()} value={item} />
							  ))}
					</Picker>
				</View>

				<View className="flex-col items-center justify-center mt-10">
					<Text
						style={{ color: colors.primary }}
						className="self-center text-2xl font-bold">
						{weight} {metric}
					</Text>
					<View className="self-center flex-row gap-2 mt-4">
						<Text
							style={{
								color: colors.primary,
							}}
							className={`self-center ${
								metric === "kg" ? "opacity-100" : "opacity-30"
							}`}>
							kg
						</Text>
						<Switch
							value={isSwitchOn}
							onValueChange={onToggleSwitch}
							color={colors.primary}
						/>
						<Text
							style={{
								color: colors.primary,
							}}
							className={`self-center ${
								metric === "lbs" ? "opacity-100" : "opacity-30"
							}`}>
							lbs
						</Text>
					</View>
				</View>

				<View className="flex-1 self-center justify-end mb-16">
					<Button
						onPress={async () => {
							await dispatch(changeWeight(weight));
							navigation.navigate("ChooseGoal");
						}}
						style={{
							backgroundColor: colors.primary,
							width: 214,
						}}
						mode="contained">
						<Text style={{ fontSize: 18 }} className="font-bold">
							Next
						</Text>
					</Button>
				</View>
			</Surface>
		</View>
	);
};

export default ChooseHeight;
