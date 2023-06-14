import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Modal, Text, TouchableOpacity, TextInput } from "react-native";
import { Surface } from "react-native-paper";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ChangeEmailModal = (props) => {
	const navigation = useNavigation();

	const [newEmail, setNewEmail] = useState("");

	return (
		<Modal className="bg-secondary" visible={props.visible}>
			<TouchableOpacity
				onPress={() => props.setShowModal(false)}
				className="ml-auto mr-4 p-2 mt-20 bg-primary rounded-full">
				<AntDesign style={{ color: "#ffff" }} name="close" size={20} />
			</TouchableOpacity>
			<View className="flex-1 h-full justify-center  bg-secondary ">
				<Surface className="mx-8 py-20 bg-background rounded-3xl">
					<View className="flex-row mx-8 ">
						<TextInput
							className="text-xs text-primary border-solid border-b-2 w-full border-secondary py-4"
							value={newEmail}
							onChangeText={(newEmail) => setNewEmail(newEmail)}></TextInput>
						<View className="ml-auto flex-row self-center">
							<Text className="text-xs mr-2 text-primary opacity-60">
								Email
							</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
						</View>
					</View>

					<View className="flex-row mx-8 ">
						<TextInput
							className="text-xs text-primary border-solid border-b-2 w-full border-secondary py-4"
							value={newEmail}
							onChangeText={(newEmail) => setNewEmail(newEmail)}></TextInput>
						<View className="ml-auto flex-row self-center">
							<Text className="text-xs mr-2 text-primary opacity-60">
								Repeat Email
							</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
						</View>
					</View>

					<View className="flex-row mx-8 ">
						<TextInput
							className="text-xs text-primary border-solid border-b-2 w-full border-secondary py-4"
							value={newEmail}
							onChangeText={(newEmail) => setNewEmail(newEmail)}></TextInput>
						<View className="ml-auto flex-row self-center">
							<Text className="text-xs mr-2 text-primary opacity-60">
								Password
							</Text>
							<MaterialCommunityIcons
								name="pencil-outline"
								size={15}
								color={"#E07594"}
							/>
						</View>
					</View>
				</Surface>
			</View>
		</Modal>
	);
};

export default ChangeEmailModal;
