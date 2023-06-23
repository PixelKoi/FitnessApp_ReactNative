import React, { useState } from "react";
import { View, Text, Image, Modal, Alert } from "react-native";
import { Button, Surface, DefaultTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
//Images
import headerIMG from "../../../../../assets/images/weight_lifting.png";
//Import supabase
import { supabase } from "../../../../supabase_authentication/supabase";
//Import redux hooks
import {
	useAppDispatch,
	useAppSelector,
} from "../../../../../redux-manager/hooks";
import { useDatabase } from "@nozbe/watermelondb/hooks";

const SignUpModal = (props) => {
	//Import redux
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	//watermelonDB
	const database = useDatabase();

	//Sign Up Hooks
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [showPassword, setShowPassword] = useState(!showPassword);
	const [loading, setLoading] = useState(false);

	//Paper theme
	const theme = {
		...DefaultTheme,
		colors: {
			surfaceVariant: colors.secondary,
		},
	};

	// async function updateProfile(
	//   username: string,
	// ) {
	//   try {
	//     setLoading(true);
	//     const updates = {
	//       user_id: sessionID,
	//       username,
	//       updated_at: new Date(),
	//     };
	//     console.log(updates);
	//     const profile_data = await database.write(async () => {
	//       await database.get<Profile>("profiles").create((profile) => {
	//         profile.completeProfile(
	//           (profile.username = username)
	//         );
	//       });
	//     });
	//     if (profile_data) {
	//       console.log("Successfully created food post");
	//       const all_profiles = await database.get("profiles").query().fetch();
	//       console.log("food saved in DB!:", all_profiles);
	//     }
	//   } catch (error) {
	//     if (error instanceof Error) {
	//       Alert.alert(error.message);
	//     }
	//   } finally {
	//     setLoading(false);
	//   }
	// }

	//Todo: update user profile when signing up
	//Sign up with supabase auth
	async function signUpWithEmail() {
		setLoading(true);
		const { error } = await supabase.auth.signUp({
			email: email,
			password: password,
		});

		if (error) Alert.alert(error.message);
		setLoading(false);
	}

	return (
		<Modal visible={props.showSignUpModal}>
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
						<Text className="text-2xl font-bold">Sign Up</Text>

						{/* Input Account information */}
						<View className="gap-5 mt-4">
							<View>
								<Text style={{ color: "#9B9B99" }} className="font-semibold">
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
									className="ml-auto mt-2 font-semibold"
									style={{ color: "#9B9B99", fontSize: 11 }}>
									Password must be atleast 6 characters
								</Text>
							</View>
						</View>
					</View>

					{/* Sign up Account */}
					<View className="flex-row justify-center mt-12">
						<Button
							disabled={loading}
							onPress={() => {
								signUpWithEmail();
							}}
							style={{ backgroundColor: colors.primary, width: 214 }}
							mode="contained">
							<Text className="font-bold">Sign Up</Text>
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
						<TouchableOpacity
							onPress={async () => {
								await props.setShowSignInModal(true);
								props.setShowSignUpModal(false);
							}}
							className="">
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
