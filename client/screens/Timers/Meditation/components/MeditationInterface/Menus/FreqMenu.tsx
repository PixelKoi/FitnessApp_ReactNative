import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FreqPicker from "./components/FreqPicker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const FreqMenu = () => {
	const [freqToggle, setFreqToggle] = useState(false);
	const [showFreqPicker, setShowFreqPicker] = useState(false);
	const [selectFreq, setSelectedFreq] = useState("Select");

	return (
		<View>
			<View className="flex-row">
				<Text
					style={{ fontSize: 18, color: "#ffff" }}
					className="font-bold mb-1">
					Healing Frequency
				</Text>
				<TouchableOpacity className="ml-2 self-center">
					<MaterialIcons name="info-outline" size={18} color={"#ffff"} />
				</TouchableOpacity>
			</View>
			<View className="flex-row mt-2">
				<TouchableOpacity
					onPress={() => setShowFreqPicker(true)}
					style={{ backgroundColor: "#1F1C59" }}
					className="h-10 flex-1 flex-row rounded">
					<Text style={{ color: "#ffff" }} className="my-auto ml-4">
						{selectFreq}
					</Text>
					<View className="ml-auto mr-4 self-center">
						<FontAwesome name="angle-down" size={24} color={"#ffff"} />
					</View>
				</TouchableOpacity>
				<Switch
					className="ml-4 self-center"
					onValueChange={() => {
						if (freqToggle === false) {
							setFreqToggle(true);
						} else {
							setFreqToggle(false);
						}
					}}
					value={freqToggle}
				/>
			</View>
			<FreqPicker
				showFreqPicker={showFreqPicker}
				setShowFreqPicker={setShowFreqPicker}
				selectFreq={selectFreq}
				setSelectedFreq={setSelectedFreq}
			/>
		</View>
	);
};

export default FreqMenu;
