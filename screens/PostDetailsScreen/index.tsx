import React from 'react';
import {View} from 'react-native';
import BoldText from '../../components/BoldText';

type PostDetailsScreenProps = {};

const PostDetailsScreen = (_props: PostDetailsScreenProps) => {
  return (
    <View>
      <BoldText>{'PostDetails Screen'}</BoldText>
    </View>
  );
};

export default PostDetailsScreen;
