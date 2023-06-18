import React, { useState } from "react";
import { View, Text, Image, Modal } from "react-native";
import headerIMG from "../../../assets/images/weight_lifting.png";
import { Button } from "react-native-paper";
import { useAppSelector } from "../../../redux-manager/hooks";

const ActivityPickerModal = (props) => {
	const [isFocused, setFocus] = useState(false);

	const activityList = [
		"Sedentary",
		"Lightly active",
		"Moderately active",
		"Very active",
		"Extremely active",
	];

	const { colors } = useAppSelector((state) => state.theme);

	return (
		<Modal visible={props.showActivityModal}>
			<View
				style={{ backgroundColor: colors.secondary }}
				className="flex-1 items-center">
				<Image className="mt-10" source={headerIMG} />

				<View
					style={{
						borderTopLeftRadius: 60,
						borderTopRightRadius: 60,
						backgroundColor: colors.background,
					}}
					className=" h-screen w-screen">
					<View className="mx-14 mt-6">
						<Text className="text-2xl font-bold">Activity level?</Text>
						{/* Display Activity Buttons */}
						<View className="gap-4 mt-2">
							{activityList.map((activity, index) => (
								<Button
									key={index}
									style={{ backgroundColor: colors.secondary }}
									mode="contained">
									<Text style={{ color: colors.primary, fontWeight: "bold" }}>
										{activity}
									</Text>
								</Button>
							))}
						</View>
					</View>
					<View className="flex-row justify-center mt-12">
						<Button
							onPress={() => props.setShowActivityModal(false)}
							style={{ backgroundColor: colors.primary }}
							className="w-24 mr-4"
							mode="contained">
							Cancel
						</Button>
						<Button
							style={{ backgroundColor: colors.primary }}
							className=" w-24"
							mode="contained">
							Save
						</Button>
					</View>
				</View>
			</View>
		</Modal>
	);
};

export default ActivityPickerModal;

{
	/* <View className="flex bg-primary mt-auto h-60">
<TouchableOpacity
    className="py-2"
    onPress={() => props.setShowActivityPicker(false)}>
    <View className="mx-auto">
        <MaterialIcons name="angle-up" size={30} color={"#ffff"} />
    </View>
</TouchableOpacity>
<Picker
    itemStyle={{ color: "white" }}
    selectedValue={props.selectedActivity}
    onValueChange={(itemValue, itemIndex) => {
        props.setActivityLevel(itemValue);
    }}>
    <Picker.Item
        style={{ color: "#ffff" }}
        label="Sedentary"
        value="Sedentary"
    />
    <Picker.Item label="Lightly active" value="Lightly active" />
    <Picker.Item label="Moderately active" value="Moderately active" />
    <Picker.Item label="Very active" value="Very active" />
    <Picker.Item label="Extremely active" value="Extremely active" />
</Picker>
</View> */
}
