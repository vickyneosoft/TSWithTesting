import React, { useCallback } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screen imports
import PostScreen from '../../screens/PostsScreen';
import PostDetailsScreen from '../../screens/PostDetailsScreen';
import BoldText from '../../components/BoldText';
import { getUserConfirmation } from '../../utils/miscUtils';
import withAuthContextConsumer from '../../HOC/withAuthContextConsumer';
import { AuthContextTypes } from '../../types';
import { StyleSheet } from 'react-native';
import colors from '../../constants/colors';

const Stack = createNativeStackNavigator();

type AppNavigatorProps = {};

const AppNavigator = (props: AppNavigatorProps & AuthContextTypes) => {
  const { clearData } = props;
  const logoutHandler = useCallback(async () => {
    const promptRes = await getUserConfirmation(
      'Are you sure?',
      'You are about to logout from the app.',
    );
    if (promptRes) {
      clearData();
    }
  }, [clearData]);

  const renderHeaderRightHandler = useCallback(() => {
    return (
      <BoldText onPress={logoutHandler} style={styles.headerRightBtn}>
        {'LOGOUT'}
      </BoldText>
    );
  }, [logoutHandler]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.grey
        },
        headerTitleStyle: {
          color: colors.white
        },
        headerShadowVisible: false,
        headerTintColor: colors.white
      }}
    >
      <Stack.Screen
        name="posts"
        component={PostScreen}
        options={{
          title: 'Posts',
          headerRight: renderHeaderRightHandler,
        }}
      />
      <Stack.Screen
        name="postDetails"
        component={PostDetailsScreen}
        initialParams={{ postId: -1 }}
        options={{ title: 'Post Details' }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerRightBtn: { padding: 10, color: colors.white },
});

export default withAuthContextConsumer(AppNavigator);
