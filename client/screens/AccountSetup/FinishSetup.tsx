import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import headerIMG from "../../assets/images/weight_lifting.png";
import { Button, Surface } from "react-native-paper";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import { useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";

const FinishSetup = ({ session }: { session: Session }) => {
	const navigation = useNavigation();

	//Import redux
	const { colors } = useAppSelector((state) => state.theme);
	const { name, age, weight } = useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

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
					<Text
						// style={{ color: colors.primary }}
						className="text-2xl font-bold">
						Daily calorie needs?
					</Text>
					{/* Display Activity Buttons */}
				</View>
				<View className="flex-1 self-center justify-end mb-16">
					<Button
						onPress={async () => {
							await navigation.navigate("NavGroup");
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

export default FinishSetup;
