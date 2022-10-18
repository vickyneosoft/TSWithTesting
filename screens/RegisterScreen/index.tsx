import React from 'react';
import {View} from 'react-native';
import BoldText from '../../components/BoldText';

type RegisterScreenProps = {};

const RegisterScreen = (_props: RegisterScreenProps) => {
  return (
    <View>
      <BoldText>{'Register Screen'}</BoldText>
    </View>
  );
};

export default RegisterScreen;
