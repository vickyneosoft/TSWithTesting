import React from 'react';
import {StyleSheet, View} from 'react-native';
import BoldText from './BoldText';
import RegularText from './RegularText';

type PostDetailsItemProps = {
  title: string;
  description: string | number;
};

const PostDetailsItem = (props: PostDetailsItemProps) => {
  const {title, description} = props;
  return (
    <View style={styles.container}>
      <BoldText>{title}</BoldText>
      <RegularText style={styles.descriptionText}>{description}</RegularText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {marginBottom: 5},
  title: {
    fontSize: 12,
  },
  descriptionText: {
    // flex: 1,
  },
});

export default PostDetailsItem;
