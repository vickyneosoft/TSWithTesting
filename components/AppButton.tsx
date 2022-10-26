import React, { useMemo } from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';
import colors from '../constants/colors';
import BoldText from './BoldText';

type AppButtonProps = {
  testID?: string;
  text: string;
  onPress: () => any;
  style?: ViewStyle;
};

const AppButton = (props: AppButtonProps) => {
  const { text, onPress, style, testID } = props;

  const combinedStyles = useMemo(
    () => StyleSheet.compose(styles.container as ViewStyle, style),
    [style],
  );

  return (
    <Pressable testID={testID} onPress={onPress} style={combinedStyles}>
      <BoldText>{text}</BoldText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 55,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});

export default AppButton;
