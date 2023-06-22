import React, { useState } from "react";
import { View, Text, Image, Modal } from "react-native";
import headerIMG from "../../../../../assets/images/weight_lifting.png";
import { Button, Surface, DefaultTheme } from "react-native-paper";
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../../redux-manager/hooks";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";

const SignUpModal = (props) => {
	//Import redux
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	//Sign Up Hooks
	const [username, setUsername] = useState<String>("");
	const [email, setEmail] = useState<String>("");
	const [password, setPassword] = useState<String>("");
	const [showPassword, setShowPassword] = useState(!showPassword);

	const theme = {
		...DefaultTheme,
		colors: {
			surfaceVariant: colors.secondary,
		},
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
									onChangeText={(text) => setUsername(text)}
									left={<TextInput.Icon icon={"account"} size={18} />}
									theme={theme}
									selectionColor={"black"}
									underlineColor={"transparent"}
									activeUnderlineColor={"transparent"}
									style={{
										height: 40,
										marginTop: 15,
										borderRadius: 3,
									}}
								/>
							</View>
							<View>
								<Text style={{ color: "#9B9B99" }} className="font-bold">
									Email Address
								</Text>
								<TextInput
									onChangeText={(text) => setEmail(text)}
									left={<TextInput.Icon icon={"email-outline"} size={18} />}
									theme={theme}
									selectionColor={"black"}
									underlineColor={"transparent"}
									activeUnderlineColor={"transparent"}
									style={{
										height: 40,
										marginTop: 15,
										borderRadius: 3,
									}}
								/>
							</View>
							<View>
								<Text style={{ color: "#9B9B99" }} className="font-bold">
									Password
								</Text>
								<TextInput
									onChangeText={(text) => setPassword(text)}
									secureTextEntry={showPassword ? true : false}
									left={<TextInput.Icon icon={"lock-outline"} size={18} />}
									right={
										<TextInput.Icon
											icon={showPassword ? "eye-off" : "eye"}
											size={18}
											onPress={() => setShowPassword(!showPassword)}
										/>
									}
									theme={theme}
									selectionColor={"black"}
									underlineColor={"transparent"}
									activeUnderlineColor={"transparent"}
									style={{
										height: 40,
										marginTop: 15,
										borderRadius: 3,
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

					<View className="flex-row items-center justify-center mt-4">
						<Text className=" text-xs" style={{ lineHeight: 20 }}>
							Already a member?{" "}
						</Text>
						<TouchableOpacity className="">
							<Text
								className="text-xs font-bold"
								style={{ lineHeight: 20, color: colors.primary }}>
								Log in
							</Text>
						</TouchableOpacity>
					</View>
				</Surface>
			</View>
		</Modal>
	);
};

export default SignUpModal;
