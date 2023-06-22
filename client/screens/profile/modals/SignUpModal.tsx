import React, { useState } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import headerIMG from "../../../assets/images/weight_lifting.png";
import { Button, Surface } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { changeGender } from "../../../redux-manager/redux-slice/user-slice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-paper";

const SignUpModal = (props) => {
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	return (
		<Modal visible={true}>
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
							Sign Up
						</Text>
						{/* Display Activity Buttons */}
						<View className="gap-5 mt-4">
							<View>
								<Text className="text-base">Your Name</Text>
								<TextInput
									underlineColor={"none"}
									underlineStyle={{ borderWidth: 0, borderColor: "red" }}
									outlineStyle={{ borderRadius: 0, borderColor: "red" }}
									style={{ height: 40, marginTop: 15 }}
								/>
							</View>
							<View>
								<Text className="text-base">Email Address</Text>
								<TextInput
									underlineColor={"none"}
									underlineStyle={{ borderWidth: 0, borderColor: "red" }}
									outlineStyle={{ borderRadius: 0, borderColor: "red" }}
									style={{ height: 40, marginTop: 15 }}
								/>
							</View>
							<View>
								<Text className="text-base">Password</Text>
								<TextInput
									underlineColor={"none"}
									underlineStyle={{ borderWidth: 0, borderColor: "red" }}
									outlineStyle={{ borderRadius: 0, borderColor: "red" }}
									style={{ height: 40, marginTop: 15 }}
								/>
							</View>
							{/* <TextInput style={{ height: 40, borderRadius: 10 }} /> */}
						</View>
					</View>
					<View className="flex-row justify-center mt-12">
						<Button
							onPress={() => {
								props.setShowActivityModal(false);
							}}
							style={{ backgroundColor: colors.primary, width: 214 }}
							mode="contained">
							Sign Up
						</Button>
					</View>
					<Text
						className="text-center text-xs mt-10"
						style={{ lineHeight: 20 }}>
						By signing up, you agree to Terms of Service, {`\n`} Privacy Policy,
						and Cookie Policy.
					</Text>
				</Surface>
			</View>
		</Modal>
	);
};

export default SignUpModal;
