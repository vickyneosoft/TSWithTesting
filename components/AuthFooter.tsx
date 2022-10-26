import React, { useMemo } from 'react';
import { StyleSheet, TextStyle } from 'react-native';

// * Components
import BoldText from './BoldText';
import RegularText from './RegularText';

type AuthFooterProps = {
  testID?: string;
  placeholderText: string;
  btnText: string;
  onPress: () => any;
  style?: TextStyle
};

const AuthFooter = (props: AuthFooterProps) => {
  const { onPress, btnText, testID, placeholderText, style } = props;
  const combinedStyle = useMemo(() => StyleSheet.compose(style, styles.signupText), [style])
  return (
    <RegularText
      testID={testID}
      onPress={onPress}
      style={combinedStyle}
    >
      {placeholderText}
      <BoldText style={{ textDecorationLine: 'underline' }}>{btnText}</BoldText>
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
