import Auth from './authenticationScreens/Auth';
import SignUpScreen from './authenticationScreens/SignUpScreen';
import ForgotPassScreen from './authenticationScreens/ForgotPassScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import QuickLog from './applicationTabs/QuickLog';
import Profile from "./applicationTabs/Profile";
import Export from "./applicationTabs/Export";
import {BookOpenIcon, ClockIcon, MagnifyingGlassIcon, UserCircleIcon} from "react-native-heroicons/outline";
import Diary from "./applicationTabs/Diary";
import profile from "./applicationTabs/Profile";
import React from "react";
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function NavigationComponent() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Food Log" component={QuickLog} />
                <Stack.Screen name="Login" component={Auth} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
                <Stack.Screen name="Export" component={Export} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export function ApplicationContainer(){
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName="QuickLog">
                <Tab.Screen
                    name="QuickLog"
                    component={QuickLog}
                    options={{
                        tabBarIcon: ({ color, size }) => <MagnifyingGlassIcon name="ios-add" size={20} color="black" />
                    }}
                />
                <Tab.Screen
                    name="Diary"
                    component={Diary}
                    options={{
                        tabBarIcon: ({ color, size }) => <BookOpenIcon name="ios-add" size={20} color="black" />
                    }}
                />
                <Tab.Screen
                    name="Zero"
                    component={Export}
                    options={{
                        tabBarIcon: ({ color, size }) => <ClockIcon name="ios-add" size={20} color="black" />
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={profile}
                    options={{
                        tabBarIcon: ({ color, size }) => <UserCircleIcon name="ios-add" size={20} color="black" />
                    }}
                />


            </Tab.Navigator>
        </NavigationContainer>
    );
}