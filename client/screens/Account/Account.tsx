import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase_authentication/supabase";
import { StyleSheet, View, Alert, Text, Modal, Pressable } from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";
import { useAppDispatch, useAppSelector } from "../../redux-manager/hooks";
import {
	changeActivity,
	changeGender,
	changeAge,
	changeGoal,
	changeHeight,
	changeName,
	changeWeight,
	setUserStates,
} from "../../redux-manager/redux-slice/user-slice";
import { setSession } from "../../redux-manager/redux-slice/session-slice";
import { useNavigation } from "@react-navigation/native";
import GenderModal from "../../utils/settings/profile/modals/modals/GenderModal";
import ActivityPickerModal from "../../utils/settings/profile/modals/modals/ActivityPickerModal";
import WeightPickerModal from "../../utils/settings/profile/modals/modals/WeightPickerModal";
import WeeklyGoalModal from "../../utils/settings/profile/modals/modals/WeeklyGoalModal";
import { Switch } from "react-native-elements/dist/switch/switch";

export default function Account({ session }: { session: Session }) {
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation();

	//Account states
	const [username, setUsername] = useState("");
	const [age, setAge] = useState(0);
	const [gender, setGender] = useState("");
	const [height, setHeight] = useState(0);
	const [weight, setWeight] = useState(0);
	const [activity, setActivity] = useState("");
	const [goal, setGoal] = useState(0);
	const created = true;

	const dispatch = useAppDispatch();

	const [page, setPage] = useState(1);
	const [showGenderModal, setShowGenderModal] = useState(true);

	//update component and global states
	function updateReduxUserStates(data, sessionID) {
		dispatch(
			setUserStates({
				sessionID: sessionID,
				name: data.username,
				age: data.age,
				gender: data.gender,
				height: data.height,
				weight: data.weight,
				activity: data.activity,
				goal: data.goal,
			})
		);
	}

	useEffect(() => {
		console.log("hello");
		console.log(session?.user.id);
		setModalVisible(true);
		if (session) {
			getProfile();
			dispatch(setSession(session));
		}
	}, [session]);

	const navigateToTabNavigator = () => {
		navigation.navigate("TabNavigator");
	};

	const AccountSetup = (page) => {
		switch (page) {
			case 1:
				return (
					<GenderModal
						showGenderModal={showGenderModal}
						setShowGenderModal={setShowGenderModal}
						setPage={setPage}
					/>
				);
			case 2:
				return <ActivityPickerModal />;
			default:
				return <GenderModal />;
		}
	};

	async function getProfile() {
		try {
			setLoading(true);
			if (!session?.user) throw new Error("No redux-slice on the session!");

			let { data, error, status } = await supabase
				.from("profile")
				.select(`*`)
				.eq("user_id", session?.user.id)
				.single();
			if (error && status !== 406) {
				throw error;
			}

			if (data) {
				console.log(data);
			}
		} catch (error) {
			if (error instanceof Error) {
				Alert.alert(error.message);
			}
		} finally {
			setLoading(false);
		}
	}

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

			updateReduxUserStates(updates, session?.user.id);

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
		<View style={styles.container}>
			<View style={[styles.verticallySpaced, styles.mt20]}>
				<Button
					title={loading ? "Loading ..." : "Create Profile"}
					onPress={async () => {
						await updateProfile({
							username,
							age,
							gender,
							height,
							weight,
							activity,
							goal,
							created,
						});
						navigateToTabNavigator();
					}}
					disabled={loading}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
			</View>
			{AccountSetup(page)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 40,
		padding: 12,
	},
	verticallySpaced: {
		paddingTop: 4,
		paddingBottom: 4,
		alignSelf: "stretch",
	},
	mt20: {
		marginTop: 20,
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22,
	},
	modalView: {
		margin: 20,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 35,
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2,
	},
	buttonOpen: {
		backgroundColor: "#F194FF",
	},
	buttonClose: {
		backgroundColor: "#2196F3",
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center",
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center",
	},
});
