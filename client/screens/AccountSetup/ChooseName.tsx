import React, { useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import headerIMG from "../../assets/images/weight_lifting.png";
import { Button, DefaultTheme, Surface, TextInput } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { useNavigation } from "@react-navigation/native";
import { changeName } from "../../redux-manager/redux-slice/user-slice";

const ChooseName = () => {
	const navigation = useNavigation();

	const { colors } = useAppSelector((state) => state.theme);
	const { name } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	//Paper theme
	const theme = {
		...DefaultTheme,
		colors: {
			surfaceVariant: colors.secondary,
		},
	};

	const [newName, setName] = useState("");

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
					<Text className="text-2xl font-bold">What is your name?</Text>
					{/* Account input */}
					<View className="gap-5 mt-4">
						<View>
							<Text style={{ color: "#9B9B99" }} className="font-semibold">
								User name
							</Text>
							<TextInput
								onChangeText={(name) => setName(name)}
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
					</View>
				</View>
				<View className="flex-1 self-center justify-end mb-16">
					<Button
						onPress={async () => {
							if (!newName) {
								Alert.alert("Please choose a name");
							} else {
								await dispatch(changeName(newName));
								navigation.navigate("ChooseAge");
							}
						}}
						style={{
							backgroundColor: colors.primary,
							width: 214,
						}}
						mode="contained">
						<Text style={{ fontSize: 18 }} className="font-bold">
							Done
						</Text>
					</Button>
				</View>
			</Surface>
		</View>
	);
};

export default ChooseName;
