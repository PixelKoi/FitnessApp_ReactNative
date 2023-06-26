import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import headerIMG from "../../assets/images/weight_lifting.png";
import { Button, Surface } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { changeGoal } from "../../redux-manager/redux-slice/user-slice";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

const GoalModal = (props) => {
	const navigation = useNavigation();
	const [activity, setActivity] = useState("");
	const [goal, setGoal] = useState(1);

	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

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
						Weekly Goal?
					</Text>

					<Text style={{ color: colors.primary }} className="text-base mt-4">
						A healthy amount of weight to lose per week is generally considered
						to be around 1-2 pounds or 0.5-1 kilogram. This rate of weight loss
						is considered sustainable and more likely to be maintained in the
						long term. It's important to note that the actual amount of weight
						loss can vary depending on factors such as individual metabolism,
						starting weight, and overall health
					</Text>
					{/* Display Activity Buttons */}
					<View className="flex-col  mt-5">
						<Text
							style={{ color: colors.primary }}
							className="font-bold text-base ">
							{goal}
						</Text>
						<Slider
							style={{ width: 100, height: 40, marginTop: 0 }}
							step={0.5}
							minimumValue={1}
							maximumValue={2}
							minimumTrackTintColor={colors.secondary}
							maximumTrackTintColor={colors.primary}
							value={goal}
							onValueChange={setGoal}
						/>
					</View>
				</View>
				<View className="flex-1 self-center justify-end mb-16">
					<Button
						onPress={async () => {
							await dispatch(changeGoal(goal));
							navigation.navigate("FinishSetup");
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

export default GoalModal;
