import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// screen imports
import PostScreen from '../../screens/Posts';
import PostDetailsScreen from '../../screens/PostDetails';

const Stack = createNativeStackNavigator()

type AppNavigatorProps = {

}

const AppNavigator = (props: AppNavigatorProps) => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name='posts'
                component={PostScreen}
            />
            <Stack.Screen
                name='postDetails'
                component={PostDetailsScreen}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator