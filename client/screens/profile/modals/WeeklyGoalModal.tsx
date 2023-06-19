import React, { useState } from "react";
import { View, Text, Image, Modal } from "react-native";
import headerIMG from "../../../assets/images/weight_lifting.png";
import { Button, Surface } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { changeGoal } from "../../../redux-manager/redux-slice/user-slice";
import Slider from "@react-native-community/slider";

const GoalModal = (props) => {
	const [activity, setActivity] = useState("");
	const [newGoal, setNewGoal] = useState(1);

	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	return (
		<Modal visible={props.showGoalModal}>
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
						<Text
							style={{ color: colors.primary }}
							className="text-2xl font-bold">
							Weekly Goal?
						</Text>

						<Text style={{ color: colors.primary }} className="text-base mt-4">
							A healthy amount of weight to lose per week is generally
							considered to be around 1-2 pounds or 0.5-1 kilogram. This rate of
							weight loss is considered sustainable and more likely to be
							maintained in the long term. It's important to note that the
							actual amount of weight loss can vary depending on factors such as
							individual metabolism, starting weight, and overall health
						</Text>
						{/* Display Activity Buttons */}
						<View className="flex-col  mt-5">
							<Text
								style={{ color: colors.primary }}
								className="font-bold text-base ">
								{newGoal}
							</Text>
							<Slider
								style={{ width: 100, height: 40, marginTop: 0 }}
								step={0.5}
								minimumValue={1}
								maximumValue={2}
								minimumTrackTintColor={colors.secondary}
								maximumTrackTintColor={colors.primary}
								value={newGoal}
								onValueChange={setNewGoal}
							/>
						</View>
					</View>
					<View className="flex-row justify-center mt-12">
						<Button
							onPress={() => {
								props.setShowGoalModal(false);
							}}
							style={{ backgroundColor: colors.primary }}
							className="w-24 mr-4"
							mode="contained">
							Cancel
						</Button>
						<Button
							onPress={async () => {
								await dispatch(changeGoal(newGoal));
								props.setShowGoalModal(false);
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

export default GoalModal;
