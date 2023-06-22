import React, { useState } from "react";
import { Alert, StyleSheet, View, Image, Text } from "react-native";
import { supabase } from "../../utils/supabase_authentication/supabase";
import { Button } from "react-native-paper";
import Running from "../../assets/images/home/HomeScreen_Running.png";
import { useAppSelector } from "../../redux-manager/hooks";
import SignUp from "../../utils/settings/profile/modals/modals/SignUpModal";
import SignIn from "../../utils/settings/profile/modals/modals/SignInModal";

const Auth = () => {
	//hooks
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [showSignInModal, setShowSignInModal] = useState(false);
	const [showSignOutModal, setShowSignOutModal] = useState(false);

	const { colors } = useAppSelector((state) => state.theme);

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
		<View className="flex-1 mx-8 justify-center self-center">
			<View className="bottom-10">
				<Text className="" style={{ fontSize: 30 }}>
					Welcome to
				</Text>
				<Text style={{ fontSize: 30 }} className="font-bold">
					Sum +
				</Text>
			</View>

			<View className="items-center">
				<Image source={Running} />
			</View>
			<Text className="text-center" style={{ fontSize: 14 }}>
				Register now to gain access to {"\n"} SUM
			</Text>

			{/* <View style={[styles.verticallySpaced, styles.mt20]}>
				<Input
					label="Email"
					leftIcon={{ type: "font-awesome", name: "envelope" }}
					onChangeText={(text) => setEmail(text)}
					value={email}
					placeholder="email@address.com"
					autoCapitalize={"none"}
				/>
			</View>
			<View style={styles.verticallySpaced}>
				<Input
					label="Password"
					leftIcon={{ type: "font-awesome", name: "lock" }}
					onChangeText={(text) => setPassword(text)}
					value={password}
					secureTextEntry={true}
					placeholder="Password"
					autoCapitalize={"none"}
				/>
			</View> */}

			<View className="mt-4 top-14">
				<View className="items-center gap-3">
					<Button
						style={{ backgroundColor: colors.primary, width: 214 }}
						disabled={loading}
						onPress={() => signInWithEmail()}>
						<Text className="font-bold" style={{ color: "#ffff" }}>
							Sign up for free
						</Text>
					</Button>

					<Button
						style={{ backgroundColor: colors.primary, width: 214 }}
						disabled={loading}
						onPress={() => setShowSignInModal(true)}>
						<Text className="font-bold" style={{ color: "#ffff" }}>
							Sign In
						</Text>
					</Button>
				</View>
			</View>
			<SignIn
				showSignInModal={showSignInModal}
				setShowSignInModal={setShowSignInModal}
			/>
			{/* <SignUp /> */}
		</View>
	);
};

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
});

export default Auth;
