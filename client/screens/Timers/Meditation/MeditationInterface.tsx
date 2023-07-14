import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import ChooseGoalMenu from "./components/MeditationInterface/ChooseGoalMenu";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import BinauralPicker from "./components/MeditationInterface/BinauralPicker";

const MeditationInterface = () => {
	const navigation = useNavigation();

	const [ambienceToggle, setAmbienceToggle] = useState(false);
	const [beatsToggle, setBeatsToggle] = useState(false);
	const [freqToggle, setFreqToggle] = useState(false);

	const [showBinauralPicker, setShowBinauralPicker] = useState(false);

	React.useLayoutEffect(() => {
		navigation.setOptions({
			title: "",
			headerStyle: {
				shadowColor: "transparent",
				backgroundColor: "#ffff",
			},
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerLeft: () => (
				<View>
					<TouchableOpacity
						className="ml-2  rounded-full"
						onPress={() => {
							navigation.goBack();
						}}>
						<FontAwesome name="angle-left" size={30} />
					</TouchableOpacity>
				</View>
			),
		});
	}, []);

	return (
		<View style={{ backgroundColor: "#ffff" }} className="flex-1">
			<View className="mx-4 mt-6">
				<ChooseGoalMenu />

				<View className="gap-4 mt-1">
					<View className="flex-col">
						<View className="flex-row">
							<Text style={{ fontSize: 18 }} className="font-bold">
								Ambiance
							</Text>
						</View>

						<View className="flex-row mt-2">
							<TouchableOpacity
								style={{ backgroundColor: "#E6E6E6" }}
								className="h-10 flex-1 flex-row rounded">
								<Text className="my-auto ml-4">Accordian</Text>
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
					</View>

					<View className="flex-col">
						<View className="flex-row">
							<Text style={{ fontSize: 18 }} className="font-bold">
								Binaural Beat
							</Text>
						</View>

						<View className="flex-row mt-2">
							<TouchableOpacity
								onPress={() => setShowBinauralPicker(true)}
								style={{ backgroundColor: "#E6E6E6" }}
								className="h-10 flex-1 flex-row rounded">
								<Text className="my-auto ml-4">Accordian</Text>
								<View className="ml-auto mr-4 self-center">
									<FontAwesome name="angle-down" size={24} />
								</View>
							</TouchableOpacity>
							<Switch
								className="ml-4 self-center"
								onValueChange={() => {
									if (beatsToggle === false) {
										setBeatsToggle(true);
									} else {
										setBeatsToggle(false);
									}
								}}
								value={beatsToggle}
							/>
						</View>
					</View>

					<View>
						<View className="flex-row">
							<Text style={{ fontSize: 18 }} className="font-bold">
								Healing Frequency
							</Text>
						</View>
						<View className="flex-row mt-2">
							<TouchableOpacity
								style={{ backgroundColor: "#E6E6E6" }}
								className="h-10 flex-1 flex-row rounded">
								<Text className="my-auto ml-4">Accordian</Text>
								<View className="ml-auto mr-4 self-center">
									<FontAwesome name="angle-down" size={24} />
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
					</View>
				</View>
			</View>
			<BinauralPicker
				showBinauralPicker={showBinauralPicker}
				setShowBinauralPicker={setShowBinauralPicker}
			/>
		</View>
	);
};

export default MeditationInterface;
