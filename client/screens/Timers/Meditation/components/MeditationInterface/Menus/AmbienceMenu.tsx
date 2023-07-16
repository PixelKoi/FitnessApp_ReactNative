import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AmbiencePicker from "./components/AmbiencePicker";

const AmbienceMenu = () => {
	const [ambienceToggle, setAmbienceToggle] = useState(false);
	const [showAmbiencePicker, setShowAmbiencePicker] = useState(false);
	const [selectAmbience, setSelectedAmbience] = useState("Select");

	return (
		<View className="flex-col">
			<View className="flex-row">
				<Text style={{ fontSize: 18 }} className="font-bold">
					Ambiance
				</Text>
			</View>

			<View className="flex-row mt-2">
				<TouchableOpacity
					onPress={() => setShowAmbiencePicker(true)}
					style={{ backgroundColor: "#E6E6E6" }}
					className="h-10 flex-1 flex-row rounded">
					<Text className="my-auto ml-4">{selectAmbience}</Text>
					<View className="ml-auto mr-4 self-center">
						<FontAwesome name="angle-down" size={24} />
					</View>
				</TouchableOpacity>
				<Switch
					className="self-center ml-4"
					onValueChange={() => {
						if (ambienceToggle === false) {
							setAmbienceToggle(true);
						} else {
							setAmbienceToggle(false);
						}
					}}
					value={ambienceToggle}
				/>
			</View>
			<AmbiencePicker
				showAmbiencePicker={showAmbiencePicker}
				setShowAmbiencePicker={setShowAmbiencePicker}
				selectAmbience={selectAmbience}
				setSelectedAmbience={setSelectedAmbience}
			/>
		</View>
	);
};

export default AmbienceMenu;
