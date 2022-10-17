import React from 'react';
import { View } from 'react-native'
import BoldText from '../../components/BoldText';

type LoginScreenProps = {

}

const LoginScreen = (props: LoginScreenProps) => {
    return (
        <View>
            <BoldText>{"Login Screen"}</BoldText>
        </View>
    )
}

export default LoginScreen
