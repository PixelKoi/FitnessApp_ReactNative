import React, { useState } from "react";
import { View, Text, Image, Modal, Alert } from "react-native";
import { Button, Surface, DefaultTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";
//Images
import headerIMG from "../../assets/images/weight_lifting.png";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";

const UpdatePass = () => {
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(!showPassword);

	const [email, setEmail] = useState<string>("");

	//Import redux
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	//Paper theme
	const theme = {
		...DefaultTheme,
		colors: {
			surfaceVariant: colors.secondary,
		},
	};

	// const resetPassword = async (email) => {
	//     try {
	//       await supabase.auth.resetPasswordForEmail(email, {
	//         redirectTo: 'http://example.com/account/update-password',
	//       });
	//       // Password reset email sent successfully
	//     } catch (error) {
	//       // Handle error
	//     }
	//   };

	return (
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
				className="flex-1 h-screen w-screen">
				<View className="mx-14 mt-6">
					<Text className="text-2xl font-bold">Update password</Text>
					{/* Account input */}
					<View className="gap-5 mt-4">
						<View>
							<Text style={{ color: "#9B9B99" }} className="font-semibold">
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
							<Text style={{ color: "#9B9B99" }} className="font-semibold">
								New Password
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
						</View>
						<View>
							<Text style={{ color: "#9B9B99" }} className="font-semibold">
								Repeat Password
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
						</View>
					</View>
				</View>
				<View className="flex-row justify-center mt-12">
					<Button
						disabled={loading}
						onPress={() => {}}
						style={{ backgroundColor: colors.primary, width: 214 }}
						mode="contained">
						<Text className="font-bold">Submit</Text>
					</Button>
				</View>
			</Surface>
		</View>
	);
};

export default UpdatePass;
