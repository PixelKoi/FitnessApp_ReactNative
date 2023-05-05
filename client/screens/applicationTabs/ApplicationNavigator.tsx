import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import profile from "./Profile";
import QuickLog from './QuickLog';
import Diary from './Diary';
import Export from './Export';
import Profile from './Profile';
const Tab = createBottomTabNavigator();
import { FireIcon, MagnifyingGlassIcon, BookOpenIcon, PaperClipIcon, UserCircleIcon } from 'react-native-heroicons/outline';
function ApplicationNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="QuickLog">
				<Tab.Screen
					name="QuickLogTab"
					component={QuickLog}
					options={{
						tabBarIcon: ({ color, size }) => <MagnifyingGlassIcon name="ios-add" size={20} color="black" />
					}}
				/>
				<Tab.Screen
					name="DiaryTab"
					component={Diary}
					options={{
						tabBarIcon: ({ color, size }) => <BookOpenIcon name="ios-add" size={20} color="black" />
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={profile}
					options={{
						tabBarIcon: ({ color, size }) => <UserCircleIcon name="ios-add" size={20} color="black" />
					}}
				/>
				<Tab.Screen
					name="ExportTab"
					component={Export}
					options={{
						tabBarIcon: ({ color, size }) => <PaperClipIcon name="ios-add" size={20} color="black" />
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
