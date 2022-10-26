import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  FlatList,
  InteractionManager,
  StyleSheet,
  View,
} from 'react-native';
import BoldText from '../../components/BoldText';
import PostComponent from '../../components/PostComponent';
import colors from '../../constants/colors';
import usePosts from '../../hooks/usePosts';
import { Post } from '../../types';
import { keyExtractorHandler } from '../../utils/miscUtils';

const PostsScreen = (props: NativeStackScreenProps<any, any>) => {
  const { navigation } = props;
  const { error, isLoading, posts, fetchPosts } = usePosts();

  useEffect(() => {
    InteractionManager.runAfterInteractions(fetchPosts)
  }, [fetchPosts]);

  const onPostItemPressHandler = useCallback(
    (selectedPostId: number) => {
      navigation.navigate('postDetails', {
        postId: selectedPostId,
      });
    },
    [navigation],
  );

  const renderItemHandler = useCallback(
    ({ item }: { item: Post }) => {
      try {
        const { title, id } = item;
        return (
          <PostComponent
            title={title}
            onPress={onPostItemPressHandler.bind(null, id)} />
        );
      } catch (err: any) {
        console.log('Error : ', err.message);
        return null;
      }
    },
    [onPostItemPressHandler],
  );

  const listEmptyComponent = useMemo(() => {
    if (error) {
      return (
        <View style={styles.noDataFoundContainer}>
          <BoldText>{error}</BoldText>
        </View>
      );
    } else if (isLoading) {
      return (
        <View style={styles.noDataFoundContainer}>
          <ActivityIndicator size={'large'} color={colors.grey} />
        </View>
      );
    } else {
      return (
        <View style={styles.noDataFoundContainer}>
          <BoldText>{'No data found!'}</BoldText>
        </View>
      );
    }
  }, [isLoading, error]);

  return (
    <FlatList
      testID='lstPosts'
      data={posts}
      keyExtractor={keyExtractorHandler}
      renderItem={renderItemHandler}
      contentContainerStyle={styles.container}
      ListEmptyComponent={listEmptyComponent}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    paddingBottom: 20,
    backgroundColor: colors.grey,
  },
  noDataFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostsScreen;
