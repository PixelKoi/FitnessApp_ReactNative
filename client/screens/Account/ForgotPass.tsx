import React, { useEffect, useState } from "react";
import { View, Text, Image, Modal, Alert } from "react-native";
import { Button, Surface, DefaultTheme } from "react-native-paper";
import { TextInput } from "react-native-paper";
//Images
import headerIMG from "../../assets/images/weight_lifting.png";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { supabase } from "../../utils/supabase_authentication/supabase";
import { useNavigation } from "@react-navigation/native";
import * as Linking from "expo-linking";
import { User } from "@supabase/supabase-js";

const ForgotPass = ({ session }: { session: Session }) => {
	const navigation = useNavigation();
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState<string>("");

	//Import redux
	const { colors } = useAppSelector((state) => state.theme);
	const dispatch = useAppDispatch();

	// Reference
	// https://blog.theodo.com/2023/03/supabase-reset-password-rn/
	// Package = expo-linking
	// https://docs.expo.dev/versions/latest/sdk/linking/
	// add "scheme" : "client" to app.json

	//Paper theme
	const theme = {
		...DefaultTheme,
		colors: {
			surfaceVariant: colors.secondary,
		},
	};

	const openEmailClient = async () => {
		try {
			await Linking.openURL("message:");
		} catch (error) {
			// Handle the error here
			console.error("Failed to open email client:", error);
		}
	};

	const resetPassword = async (email: string) => {
		const { error } = await supabase.auth.resetPasswordForEmail(email);
		if (error) {
			console.log(error);
		} else {
			navigation.navigate("UpdatePass");
		}
	};

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
					<Text className="text-2xl font-bold">Forgot password?</Text>
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
					</View>
				</View>
				<View className="flex-row justify-center mt-12">
					<Button
						disabled={loading}
						onPress={() => {
							resetPassword(email);
						}}
						style={{ backgroundColor: colors.primary, width: 214 }}
						mode="contained">
						<Text className="font-bold">Submit</Text>
					</Button>
				</View>
			</Surface>
		</View>
	);
};

export default ForgotPass;
