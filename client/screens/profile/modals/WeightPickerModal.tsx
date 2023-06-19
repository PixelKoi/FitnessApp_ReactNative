import React, { useState } from "react";
import { View, Text, Image, Modal } from "react-native";
import headerIMG from "../../../assets/images/weight_lifting.png";
import person from "../../../assets/images/male_person.png";
import { Picker } from "@react-native-picker/picker";
import { Button, Surface, Switch } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { changeWeight } from "../../../redux-manager/redux-slice/user-slice";

const WeightPickerModal = (props) => {
	//redux imports
	const { colors } = useAppSelector((state) => state.theme);
	const { weight } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	//weight picker hooks
	const [metric, setMetric] = useState("kg");
	const [newWeight, setNewWeight] = useState(weight);

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
			setNewWeight(Math.round(convertKgToLbs(newWeight)));
		} else {
			setMetric("kg");
			setNewWeight(Math.round(convertPoundsToKilograms(newWeight)));
		}
	};

	return (
		<Modal visible={props.showWeightModal}>
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
					className=" h-screen w-screen">
					<View className="mx-14 mt-6">
						<Text className="text-2xl font-bold">Your weight?</Text>
						{/* Display Activity Buttons */}
					</View>

					<View className="flex-row justify-center">
						<Image className="mt-10 mr-4" source={person} />

						<Picker
							style={{ marginTop: 20 }}
							itemStyle={{
								color: "black",
								width: 180,
							}}
							selectedValue={newWeight}
							onValueChange={(itemValue, itemIndex) => {
								setNewWeight(itemValue);
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
							className="self-center text-3xl font-bold">
							{newWeight} {metric}
						</Text>
						<View className="self-center flex-row gap-2 mt-4">
							<Text className="self-center">kg</Text>
							<Switch
								value={isSwitchOn}
								onValueChange={onToggleSwitch}
								color={colors.primary}
							/>
							<Text className="self-center">lbs</Text>
						</View>
					</View>

					<View className="flex-row justify-center mt-12">
						<Button
							onPress={() => {
								props.setShowWeightModal(false);
								setNewWeight(weight);
							}}
							style={{ backgroundColor: colors.primary }}
							className="w-24 mr-4"
							mode="contained">
							Cancel
						</Button>
						<Button
							onPress={async () => {
								await dispatch(changeWeight(newWeight));
								setNewWeight(weight);
								props.setShowWeightModal(false);
							}}
							style={{ backgroundColor: colors.primary }}
							className=" w-24"
							mode="contained">
							Save
						</Button>
					</View>
				</Surface>
			</View>
		</Modal>
	);
};

export default WeightPickerModal;
