import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, Text, TextProps, TextStyle} from 'react-native';

type BoldTextProps = {
  children: string | React.ReactNode;
};

const BoldText = (props: BoldTextProps & TextProps) => {
  const mergedStyle = useMemo<StyleProp<TextStyle>>(
    () => StyleSheet.compose(styles.container as TextStyle, props.style),
    [props],
  );

  return (
    <Text {...props} style={mergedStyle}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default BoldText;
