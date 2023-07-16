import React, { useState } from "react";
import { View, Text, Switch, TouchableOpacity } from "react-native";
import ChooseGoalMenu from "./components/MeditationInterface/ChooseGoalMenu";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import BinauralPicker from "./components/MeditationInterface/BinauralPicker";
import AmbiencePicker from "./components/MeditationInterface/AmbiencePicker";
import FreqPicker from "./components/MeditationInterface/FreqPicker";

const MeditationInterface = () => {
	const navigation = useNavigation();

	const [ambienceToggle, setAmbienceToggle] = useState(false);
	const [beatsToggle, setBeatsToggle] = useState(false);
	const [freqToggle, setFreqToggle] = useState(false);

	const [showBinauralPicker, setShowBinauralPicker] = useState(false);
	const [showAmbiencePicker, setShowAmbiencePicker] = useState(false);
	const [showFreqPicker, setShowFreqPicker] = useState(false);

	const [selectBinaural, setSelectedBinaural] = useState("Select");
	const [selectAmbience, setSelectedAmbience] = useState("Select");
	const [selectFreq, setSelectedFreq] = useState("Select");

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

				<View className="gap-5 mt-1">
					<View className="flex-col">
						<View className="flex-row">
							<Text style={{ fontSize: 18 }} className="font-bold">
								Ambiance
							</Text>
							<TouchableOpacity className="ml-2 self-center">
								<MaterialIcons name="info-outline" size={18} />
							</TouchableOpacity>
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
					</View>

					<View className="flex-col">
						<View className="flex-row">
							<Text style={{ fontSize: 18 }} className="font-bold">
								Binaural Beat{" "}
							</Text>

							<TouchableOpacity className="ml-2 self-center">
								<MaterialIcons name="info-outline" size={18} />
							</TouchableOpacity>
							<Text style={{ fontSize: 12 }} className="ml-4 my-auto font-bold">
								Heaphones Required
							</Text>
						</View>

						<View className="flex-row mt-2">
							<TouchableOpacity
								onPress={() => setShowBinauralPicker(true)}
								style={{ backgroundColor: "#E6E6E6" }}
								className="h-10 flex-1 flex-row rounded">
								<Text className="my-auto ml-4">{selectBinaural}</Text>
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
							<TouchableOpacity className="ml-2 self-center">
								<MaterialIcons name="info-outline" size={18} />
							</TouchableOpacity>
						</View>
						<View className="flex-row mt-2">
							<TouchableOpacity
								onPress={() => setShowFreqPicker(true)}
								style={{ backgroundColor: "#E6E6E6" }}
								className="h-10 flex-1 flex-row rounded">
								<Text className="my-auto ml-4">{selectFreq}</Text>
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
				selectBinaural={selectBinaural}
				setSelectedBinaural={setSelectedBinaural}
			/>
			<AmbiencePicker
				showAmbiencePicker={showAmbiencePicker}
				setShowAmbiencePicker={setShowAmbiencePicker}
				selectAmbience={selectAmbience}
				setSelectedAmbience={setSelectedAmbience}
			/>
			<FreqPicker
				showFreqPicker={showFreqPicker}
				setShowFreqPicker={setShowFreqPicker}
				selectFreq={selectFreq}
				setSelectedFreq={setSelectedFreq}
			/>
		</View>
	);
};

export default MeditationInterface;
