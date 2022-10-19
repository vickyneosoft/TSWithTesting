import React from 'react';
import {StyleSheet} from 'react-native';

// * Components
import BoldText from './BoldText';
import RegularText from './RegularText';

type AuthFooterProps = {
  placeholderText: string;
  btnText: string;
  onPress: () => any;
};

const AuthFooter = (props: AuthFooterProps) => {
  const {onPress, btnText, placeholderText} = props;
  return (
    <RegularText onPress={onPress} style={styles.signupText}>
      {placeholderText}
      <BoldText>{btnText}</BoldText>
    </RegularText>
  );
};

const styles = StyleSheet.create({
  signupText: {
    flexShrink: 1,
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
});

export default AuthFooter;
