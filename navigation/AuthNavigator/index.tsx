import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// screen imports
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';

const Stack = createNativeStackNavigator();

type AuthNavigatorProps = {};

const AuthNavigator = (_props: AuthNavigatorProps) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
