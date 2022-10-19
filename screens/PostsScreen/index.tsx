import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  InteractionManager,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import BoldText from '../../components/BoldText';
import PostItem from '../../components/PostItem';
import colors from '../../constants/colors';
import usePosts from '../../hooks/usePosts';
import {Post} from '../../types';
import {keyExtractorHandler} from '../../utils/miscUtils';

const PostsScreen = (props: NativeStackScreenProps<any, any>) => {
  const {navigation} = props;
  const {error, isLoading, posts, fetchPosts} = usePosts();

  useEffect(() => {
    InteractionManager.runAfterInteractions(fetchPosts);
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
    ({item}: {item: Post}) => {
      try {
        const {title, id} = item;
        return (
          <Pressable
            style={styles.itemStyle}
            onPress={onPostItemPressHandler.bind(null, id)}>
            <PostItem description={title} />
          </Pressable>
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
          <ActivityIndicator size={'large'} color={colors.black} />
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
    backgroundColor: colors.white,
  },
  itemStyle: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
  },
  noDataFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PostsScreen;
