import React, { useState } from "react";
import { View, Text, Image, Modal, Alert } from "react-native";
import { Button, Surface, DefaultTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";
//Images
import headerIMG from "../../../../../assets/images/weight_lifting.png";
//Import supabase
import { supabase } from "../../../../supabase_authentication/supabase";
//Import redux hooks
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../../redux-manager/hooks";

const SignInModal = (props) => {
	//Import redux
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	//Sign Up Hooks
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState<boolean>(!showPassword);
	const [loading, setLoading] = useState(false);

	//Paper theme
	const theme = {
		...DefaultTheme,
		colors: {
			surfaceVariant: colors.secondary,
		},
	};

	//Sign into Supabase
	async function signInWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password,
		});

		if (!error) {
		} else {
			Alert.alert(error.message);
		}
		setLoading(false);
	}

	return (
		<Modal visible={props.showSignInModal}>
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
							Sign In
						</Text>
						{/* Display Activity Buttons */}
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
									className="ml-auto mt-4 font-bold"
									style={{ color: "#9B9B99", fontSize: 14 }}>
									Forgot password?
								</Text>
							</View>
						</View>
					</View>
					<View className="flex-row justify-center mt-12">
						<Button
							disabled={loading}
							onPress={() => {
								signInWithEmail();
							}}
							style={{ backgroundColor: colors.primary, width: 214 }}
							mode="contained">
							<Text className="font-bold"> Sign in</Text>
						</Button>
					</View>
					<Text className="text-center mt-4" style={{ lineHeight: 20 }}>
						or
					</Text>

					<View className="flex-row justify-center mt-4">
						<Button
							onPress={() => {}}
							style={{ backgroundColor: colors.primary, width: 250 }}
							mode="contained">
							<Text className="font-bold">Continue with Google</Text>
						</Button>
					</View>
					<View className="flex-row justify-center mt-4">
						<Button
							onPress={() => {}}
							style={{ backgroundColor: colors.primary, width: 250 }}
							mode="contained">
							<Text className="font-bold"> Continue with Facebook</Text>
						</Button>
					</View>
				</Surface>
			</View>
		</Modal>
	);
};

export default SignInModal;