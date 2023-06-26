import React from "react";
//nav imports
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Supabse imports
import { Session } from "@supabase/supabase-js";
// Account setup imports
import ChooseGender from "../../screens/AccountSetup/ChooseGender";
import ChooseActivity from "../../screens/AccountSetup/ChooseActivity";
import ChooseWeight from "../../screens/AccountSetup/ChooseWeight";
import ChooseGoal from "../../screens/AccountSetup/ChooseGoal";
import FinishSetup from "../../screens/AccountSetup/FinishSetup";

const AccountSetupStack = ({ session }: { session: Session }) => {
	//Set navigation isntance
	const AccountSetupStack = createNativeStackNavigator();

	return (
		<AccountSetupStack.Navigator>
			<AccountSetupStack.Screen
				options={{ headerShown: false }}
				name="ChooseGender"
				component={ChooseGender}
			/>
			<AccountSetupStack.Screen
				options={{ headerShown: false }}
				name="ChooseActivity"
				component={ChooseActivity}
			/>
			<AccountSetupStack.Screen
				options={{ headerShown: false }}
				name="ChooseWeight"
				component={ChooseWeight}
			/>
			<AccountSetupStack.Screen
				options={{ headerShown: false }}
				name="ChooseGoal"
				component={ChooseGoal}
			/>
			<AccountSetupStack.Screen
				options={{ headerShown: false }}
				name="FinishSetup">
				{(props) => <FinishSetup {...props} session={session} />}
			</AccountSetupStack.Screen>
		</AccountSetupStack.Navigator>
	);
};

export default AccountSetupStack;
