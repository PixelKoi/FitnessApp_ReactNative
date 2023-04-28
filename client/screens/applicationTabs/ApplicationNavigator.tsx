import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import QuickLogTab from "./QuickLogTab";
import DiaryTab from "./DiaryTab";
const Tab = createBottomTabNavigator();

function ApplicationNavigator() {
    return (
        <Tab.Navigator initialRouteName="QuickLogTab">
            <Tab.Screen name="QuickLogTab" component={QuickLogTab} />
            <Tab.Screen name="DiaryTab" component={DiaryTab} />
        </Tab.Navigator>
    );
}

export default ApplicationNavigator;
