import React, { useState } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import headerIMG from "../../../assets/images/weight_lifting.png";
import { Button, Surface, DefaultTheme } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../../redux-manager/hooks";
import { changeGender } from "../../../redux-manager/redux-slice/user-slice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-paper";

const SignUpModal = (props) => {
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	const theme = {
		...DefaultTheme,
		roundness: 15,
		borderRadius: 10,
	};

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
							// style={{ color: colors.primary }}
							className="text-2xl font-bold">
							Sign Up
						</Text>
						{/* Display Activity Buttons */}
						<View className="gap-5 mt-4">
							<View>
								<Text style={{ color: "#9B9B99" }} className="font-bold">
									Your Name
								</Text>
								<TextInput
									left={<TextInput.Icon icon={"account"} />}
									contentStyle={{
										backgroundColor: colors.secondary,
										borderRadius: 10,
									}}
									theme={theme}
									selectionColor={"black"}
									underlineColor={"transparent"}
									activeUnderlineColor={"transparent"}
									style={{
										height: 40,
										marginTop: 15,
										borderRadius: 10,
										borderWidth: 0,
									}}
								/>
							</View>
							<View>
								<Text style={{ color: "#9B9B99" }} className="font-bold">
									Email Address
								</Text>
								<TextInput
									left={<TextInput.Icon icon={"email-outline"} />}
									contentStyle={{
										backgroundColor: colors.secondary,
										borderRadius: 10,
									}}
									theme={theme}
									selectionColor={"black"}
									underlineColor={"transparent"}
									activeUnderlineColor={"transparent"}
									style={{
										height: 40,
										marginTop: 15,
										borderRadius: 10,
										borderWidth: 0,
									}}
								/>
							</View>
							<View>
								<Text style={{ color: "#9B9B99" }} className="font-bold">
									Password
								</Text>
								<TextInput
									left={<TextInput.Icon icon={"lock-outline"} />}
									right={<TextInput.Icon icon={"eye-off"} />}
									contentStyle={{
										backgroundColor: colors.secondary,
										borderRadius: 10,
									}}
									theme={theme}
									selectionColor={"black"}
									underlineColor={"transparent"}
									activeUnderlineColor={"transparent"}
									style={{
										height: 40,
										marginTop: 15,
										borderRadius: 10,
										borderWidth: 0,
									}}
								/>
								<Text
									className="ml-auto mt-2"
									style={{ color: "#9B9B99", fontSize: 11 }}>
									Password must be atleast 6 characters
								</Text>
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

					<Text className="text-center text-xs mt-4" style={{ lineHeight: 20 }}>
						Already a member? Log in
					</Text>
				</Surface>
			</View>
		</Modal>
	);
};

export default SignUpModal;
