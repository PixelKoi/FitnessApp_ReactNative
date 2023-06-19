import React, { useState } from "react";
import {
	View,
	Text,
	Image,
	Modal,
	FlatList,
	TouchableOpacity,
} from "react-native";
import headerIMG from "../../../assets/images/weight_lifting.png";
import person from "../../../assets/images/male_person.png";
import { Picker } from "@react-native-picker/picker";

import { Button, Surface } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { changeWeight } from "../../../redux-manager/redux-slice/user-slice";

const WeightPickerModal = (props) => {
	const { colors } = useAppSelector((state) => state.theme);
	const { weight } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const [newWeight, setNewWeight] = useState(weight.toString());

	const weightKG = Array.from({ length: 150 }, (_, index) => index + 1);
	const weightLB = Array.from({ length: 330 }, (_, index) => index + 1);

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
						<Image className="mt-10 mr-10" source={person} />
						<Text className="self-center text-3xl font-bold">{weight} kg</Text>
					</View>

					<View className="mx-auto">
						<Picker
							style={{ marginTop: 20 }}
							itemStyle={{
								color: "black",
								width: 200,
							}}
							selectedValue={newWeight}
							onValueChange={(itemValue, itemIndex) => {
								setNewWeight(itemValue);
							}}>
							{weightKG.map((item) => (
								<Picker.Item label={item.toString()} value={item} />
							))}
						</Picker>
					</View>

					<View className="flex-row justify-center mt-12">
						<Button
							onPress={() => {
								props.setShowWeightModal(false);
							}}
							style={{ backgroundColor: colors.primary }}
							className="w-24 mr-4"
							mode="contained">
							Cancel
						</Button>
						<Button
							onPress={() => {}}
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
