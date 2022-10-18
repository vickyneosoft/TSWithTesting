import React from 'react';
import {View} from 'react-native';
import BoldText from '../../components/BoldText';

type PostsScreenProps = {};

const PostsScreen = (_props: PostsScreenProps) => {
  return (
    <View>
      <BoldText>{'Posts Screen'}</BoldText>
    </View>
  );
};

export default PostsScreen;
