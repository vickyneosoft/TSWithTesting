import React from 'react';
import { StyleSheet, View } from 'react-native';
import RegularText from './RegularText';

type PostItemProps = {
  description: string | number;
};

const PostItem = (props: PostItemProps) => {
  const { description } = props;
  return (
    <View style={styles.container}>
      <RegularText style={styles.descriptionText}>{description}</RegularText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 5 },
  descriptionText: {
    flex: 1,
    fontSize: 16
  },
});

export default PostItem;
