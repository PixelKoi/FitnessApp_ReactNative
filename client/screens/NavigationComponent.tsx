import HomeScreen from './authenticationScreens/HomeScreen';
import LoginScreen from './authenticationScreens/LoginScreen';
import Auth from "./authenticationScreens/LoginScreen_V1";
import SignUpScreen from './authenticationScreens/SignUpScreen';
import ForgotPassScreen from './authenticationScreens/ForgotPassScreen';
import ApplicationNavigator from "./applicationTabs/ApplicationNavigator";
import UserBioInput from "./userInfo/userBioInput";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

export default function NavigationComponent() {
    return(
    <NavigationContainer>
        <Stack.Navigator screenOptions={({ route }) => ({
            headerShown: route.name !== 'ApplicationNavigator' && route.name !== 'UserBioInput',
        })}>
            <Stack.Screen name="Home" component={HomeScreen} />
            {/*<Stack.Screen name="Login" component={LoginScreen} />*/}
            <Stack.Screen name="Login" component={Auth} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
            <Stack.Screen name="ForgotPass" component={ForgotPassScreen} />
            <Stack.Screen name="ApplicationNavigator" component={ApplicationNavigator} />
            <Stack.Screen name="UserBioInput" component={UserBioInput} />
        </Stack.Navigator>
    </NavigationContainer>)
}