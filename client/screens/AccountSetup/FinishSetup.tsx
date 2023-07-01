import React, { useEffect, useState } from "react";
import { View, Text, Image, Alert } from "react-native";
import headerIMG from "../../assets/images/weight_lifting.png";
import { Button, Surface } from "react-native-paper";

import { useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
// Import redux
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import {
	setSessionID,
	setUserStates,
} from "../../redux-manager/redux-slice/user-slice";
import { supabase } from "../../utils/supabase_authentication/supabase";
import calAlgo from "../../utils/calAlgo/cal-algo";
import DonutGraph from "./component/FastingDonutGraph";
import Icons from "react-native-vector-icons/FontAwesome5";

const FinishSetup = ({ session }: { session: Session }) => {
	//Import nav
	const navigation = useNavigation();

	//Setup hooks
	const [loading, setLoading] = useState(true);

	// Set profile created to true when finishing initial setup
	const created = true;

	//Import redux
	const { colors } = useAppSelector((state) => state.theme);
	const { email, name, gender, age, height, weight, activity, goal, dailyCal } =
		useAppSelector((state) => state.user);
	const dispatch = useAppDispatch();

	const calObject = {
		age: age,
		gender: gender,
		weight: weight,
		height: height,
		activity: activity,
		goal: goal,
	};

	useEffect(() => {
		calAlgo(calObject, dispatch);
	}, []);

	async function updateProfile({
		username,
		age,
		gender,
		height,
		weight,
		activity,
		goal,
		created,
	}: {
		username: string;
		age: number;
		gender: string;
		height: number;
		weight: number;
		activity: string;
		goal: number;
		created: boolean;
	}) {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No redux-slice on the session!");

			const updates = {
				user_id: session?.user.id,
				username,
				age,
				gender,
				height,
				weight,
				activity,
				goal,
				created,
				updated_at: new Date(),
			};
			let { error } = await supabase.from("profile").upsert(updates);
			if (error) {
				throw error;
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

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
				<View className="mt-20">
					<DonutGraph calories={dailyCal} />
				</View>
				<View className="flex-row gap-2  justify-center  mt-8">
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 40,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 30,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>

					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 40,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>

					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 30,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 40,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
					<View
						style={{
							backgroundColor: colors.primary,
							borderStyle: "solid",
							width: 2,
							height: 20,
							borderColor: colors.primary,
						}}
					/>
				</View>
				<View className="items-center mt-2">
					<Icons name="caret-up" size={30} color={colors.primary} />
				</View>
				<View className="flex-1 self-center justify-end mb-16">
					<Button
						onPress={async () => {
							// await updateProfile({
							// 	username,
							// 	age,
							// 	gender,
							// 	height,
							// 	weight,
							// 	activity,
							// 	goal,
							// 	created,
							// });
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
