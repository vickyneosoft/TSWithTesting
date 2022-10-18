import React, {useMemo} from 'react';
import {StyleProp, StyleSheet, Text, TextStyle} from 'react-native';

type BoldTextProps = {
  style: TextStyle;
  children: string;
};

const RegularText = (props: BoldTextProps) => {
  const mergedStyle = useMemo<StyleProp<TextStyle>>(
    () => StyleSheet.compose(styles.container as TextStyle, props.style),
    [props],
  );

  return <Text style={mergedStyle}>{props.children}</Text>;
};

const styles = StyleSheet.create({
  container: {
    fontSize: 12,
  },
});

export default RegularText;
