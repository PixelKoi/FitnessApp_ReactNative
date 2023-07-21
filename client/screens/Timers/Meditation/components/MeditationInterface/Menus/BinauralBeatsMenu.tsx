import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, FlatList } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BinauralPicker from "./components/BinauralPicker";
import BinauralInfoModal from "./info-modals/BinauralInfoModal";

const BinauralBeatsMenu = (props: any) => {
	const [showBinauralPicker, setShowBinauralPicker] = useState(false);
	const [selectBinaural, setSelectedBinaural] = useState("Select");
	const [showInfo, setShowInfo] = useState(false);

	const data = [
		{ key: "Beta" },
		{ key: "Theta" },
		{ key: "Delta" },
		{ key: "Alpha" },
		{ key: "Gamma" },
	];

	const FlatListItem = ({ item }) => {
		return (
			<TouchableOpacity
				style={{ width: 70 }}
				className="border-2 border-white rounded-full">
				<Text className="text-white text-center p-2">{item.key}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View className="flex-col">
			<View className="flex-row">
				<Text
					style={{ fontSize: 16, color: "#fff" }}
					className="self-center font-bold">
					Binaural Beats
				</Text>

				<View className="flex-row self-center">
					<TouchableOpacity
						onPress={() => setShowInfo(true)}
						className="ml-2 self-center">
						<MaterialIcons name="info-outline" size={20} color={"#fff"} />
					</TouchableOpacity>
					<Text
						style={{ fontSize: 12, color: "#fff" }}
						className="ml-2 self-center font-bold">
						Heaphones Required
					</Text>
				</View>
				<Switch
					trackColor={{ false: "#1F1C59", true: "#1F1C59" }}
					className="ml-auto"
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

			{props.beatsToggle && (
				<FlatList
					data={data}
					renderItem={({ item }) => <FlatListItem item={item} />}
					keyExtractor={(item) => item.key}
					horizontal
					contentContainerStyle={{ gap: 10, marginTop: 15 }}
				/>
			)}

			<BinauralInfoModal showInfo={showInfo} setShowInfo={setShowInfo} />
		</View>
	);
};

export default BinauralBeatsMenu;
