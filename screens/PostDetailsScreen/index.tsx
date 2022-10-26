import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  InteractionManager,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import BoldText from '../../components/BoldText';
import PostDetailsItem from '../../components/PostDetailsItem';
import PostItem from '../../components/PostItem';
import constants from '../../constants';
import colors from '../../constants/colors';
import usePosts from '../../hooks/usePosts';

const PostDetailsScreen = (props: NativeStackScreenProps<any, any>) => {
  const { route } = useMemo(() => props, [props]);
  const selectedPostId = useMemo(() => route.params?.postId, [route]);

  const { error, isLoading, fetchPostDetails, postDetails } = usePosts();

  useEffect(() => {
    if (selectedPostId) {
      InteractionManager.runAfterInteractions(
        fetchPostDetails.bind(null, selectedPostId),
      );
    }
  }, [fetchPostDetails, selectedPostId]);

  const renderPostDetailsHandler = useCallback(
    (key: string, index: number) => {
      return (
        <PostDetailsItem
          key={index.toString()}
          title={`${key}: `.toUpperCase()}
          description={postDetails[key]}
        />
      );
    },
    [postDetails],
  );

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <BoldText>{error}</BoldText>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size={'large'} color={colors.grey} />
      </View>
    );
  }

  if (!postDetails || !Object.keys(postDetails).length) {
    return (
      <View style={styles.centerContainer}>
        <BoldText>{constants.SOMETHING_WENT_WRONG}</BoldText>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {Object.keys(postDetails).map(renderPostDetailsHandler)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: colors.white,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
});

export default PostDetailsScreen;
