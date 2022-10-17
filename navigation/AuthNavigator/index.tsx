import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// screen imports
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/Register';

const Stack = createNativeStackNavigator()

type AuthNavigatorProps = {

}

const AuthNavigator = (props: AuthNavigatorProps) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='login'
                component={LoginScreen}
            />
            <Stack.Screen
                name='register'
                component={RegisterScreen}
            />
        </Stack.Navigator>
    )
}

export default AuthNavigator