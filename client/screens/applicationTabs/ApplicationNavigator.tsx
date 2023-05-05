import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import UserBioInput from '../userInfo/userBioInput';

import QuickLogTab from './QuickLogTab';
import DiaryTab from './DiaryTab';
import ExportTab from './ExportTab';
import ProfileTab from './ProfileTab';
const Tab = createBottomTabNavigator();
import { FireIcon, MagnifyingGlassIcon, BookOpenIcon, PaperClipIcon, UserCircleIcon } from 'react-native-heroicons/outline';
function ApplicationNavigator() {
	return (
		<NavigationContainer>
			<Tab.Navigator initialRouteName="QuickLogTab">
				<Tab.Screen
					name="QuickLogTab"
					component={QuickLogTab}
					options={{
						tabBarIcon: ({ color, size }) => <MagnifyingGlassIcon name="ios-add" size={20} color="black" />
					}}
				/>
				<Tab.Screen
					name="DiaryTab"
					component={DiaryTab}
					options={{
						tabBarIcon: ({ color, size }) => <BookOpenIcon name="ios-add" size={20} color="black" />
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={UserBioInput}
					options={{
						tabBarIcon: ({ color, size }) => <UserCircleIcon name="ios-add" size={20} color="black" />
					}}
				/>
				<Tab.Screen
					name="ExportTab"
					component={ExportTab}
					options={{
						tabBarIcon: ({ color, size }) => <PaperClipIcon name="ios-add" size={20} color="black" />
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}

export default ApplicationNavigator;
