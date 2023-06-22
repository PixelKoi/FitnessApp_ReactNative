import React, { useState } from "react";
import { View, Text, Image, Modal, Alert } from "react-native";
import { Button, Surface, DefaultTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";
//Images
import headerIMG from "../../../../../assets/images/weight_lifting.png";
//Import supabase
import { supabase } from "../../../../supabase_authentication/supabase";
//Import redux hooks
import { useAppSelector } from "../../../../../redux-manager/hooks";

const ForgotPasswordModal = (props) => {
	//Import redux
	const { colors } = useAppSelector((state) => state.theme);

	//Sign Up Hooks
	const [email, setEmail] = useState<string>("");
	const [loading, setLoading] = useState(false);

	//Paper theme
	const theme = {
		...DefaultTheme,
		colors: {
			surfaceVariant: colors.secondary,
		},
	};

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
							Forgot Password
						</Text>
						{/* Display Activity Buttons */}
						<View className="gap-5 mt-4">
							<View>
								<Text style={{ color: "#9B9B99" }} className="font-semibold">
									Enter Email
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
							<Text className="font-bold">Submit</Text>
						</Button>
					</View>
				</Surface>
			</View>
		</Modal>
	);
};

export default ForgotPasswordModal;
