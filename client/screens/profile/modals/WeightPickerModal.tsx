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

import { Button, Surface } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { changeWeight } from "../../../redux-manager/redux-slice/user-slice";

const WeightPickerModal = (props) => {
	const { colors } = useAppSelector((state) => state.theme);
	const { weight } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const weightKG = Array.from({ length: 150 }, (_, index) => index + 1);
	const weightLB = Array.from({ length: 330 }, (_, index) => index + 1);

	const WeightItem = ({ item, selected, onSelect }) => (
		<TouchableOpacity
			className="flex h-14"
			style={{
				backgroundColor: selected ? "blue" : "white",
				padding: 10,
				borderRadius: 5,
				marginRight: 10,
			}}
			onPress={() => onSelect(item)}>
			<Text style={{ color: selected ? "white" : "black" }}>{item}</Text>
			<Text className="self-center">|</Text>
		</TouchableOpacity>
	);

	const [selectedNumber, setSelectedNumber] = useState(null);

	const handleSelectNumber = (number) => {
		setSelectedNumber(number);
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
						<Image className="mt-10 mr-10" source={person} />
						<Text className="self-center text-3xl font-bold">{weight} kg</Text>
					</View>

					<View className="flex-row justify-center mt-6">
						<Text className="self-center text-base font-bold mr-8">kg</Text>
						<Text className="self-center text-base font-bold">lbs</Text>
					</View>

					<FlatList
						horizontal
						data={weightKG}
						renderItem={({ item }) => (
							<WeightItem
								item={item}
								selected={item === selectedNumber}
								onSelect={handleSelectNumber}
							/>
						)}
						keyExtractor={(item) => item.toString()}
						contentContainerStyle={{ paddingVertical: 10 }}
					/>

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
