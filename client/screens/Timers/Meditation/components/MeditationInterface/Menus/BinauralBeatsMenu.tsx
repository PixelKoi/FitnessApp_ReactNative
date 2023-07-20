import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BinauralPicker from "./components/BinauralPicker";
import BinauralInfoModal from "./info-modals/BinauralInfoModal";

const BinauralBeatsMenu = (props: any) => {
	const [showBinauralPicker, setShowBinauralPicker] = useState(false);
	const [selectBinaural, setSelectedBinaural] = useState("Select");
	const [showInfo, setShowInfo] = useState(false);

	return (
		<View className="flex-col">
			<View className="flex-row">
				<Text
					style={{ fontSize: 18, color: "#fff" }}
					className="font-bold mb-1">
					Binaural Beat
				</Text>

				<TouchableOpacity
					onPress={() => setShowInfo(true)}
					className="ml-2 self-center">
					<MaterialIcons name="info-outline" size={18} color={"#fff"} />
				</TouchableOpacity>
				<Text
					style={{ fontSize: 12, color: "#fff" }}
					className="ml-4 my-auto font-bold">
					Heaphones Required
				</Text>
			</View>

			<View className="flex-row mt-2">
				<TouchableOpacity
					onPress={() => setShowBinauralPicker(true)}
					style={{ backgroundColor: "#1F1C59" }}
					className="h-10 flex-1 flex-row rounded">
					<Text style={{ color: "#ffff" }} className="my-auto ml-4">
						{selectBinaural}
					</Text>
					<View className="ml-auto mr-4 self-center">
						<FontAwesome name="angle-down" size={24} color={"#ffff"} />
					</View>
				</TouchableOpacity>
				<Switch
					trackColor={{ false: "#1F1C59", true: "#1F1C59" }}
					className="ml-4 self-center"
					onValueChange={() => {
						if (props.beatsToggle === false) {
							props.setBeatsToggle(true);
						} else {
							props.setBeatsToggle(false);
						}
					}}
					value={props.beatsToggle}
				/>
			</View>
			<BinauralPicker
				showBinauralPicker={showBinauralPicker}
				setShowBinauralPicker={setShowBinauralPicker}
				selectBinaural={selectBinaural}
				setSelectedBinaural={setSelectedBinaural}
			/>
			<BinauralInfoModal showInfo={showInfo} setShowInfo={setShowInfo} />
		</View>
	);
};

export default BinauralBeatsMenu;
