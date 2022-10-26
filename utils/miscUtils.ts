import { Alert } from 'react-native';

export const keyExtractorHandler = (_item: any, index: number) =>
  index.toString();

export const getUserConfirmation = (title: string, message: string) => {
  return new Promise((res, _rej) => {
    Alert.alert(title, message, [
      {
        text: 'Ok',
        style: 'destructive',
        onPress: res.bind(null, true),
      },
      {
        text: 'Cancel',
        style: 'cancel',
        onPress: res.bind(null, false),
      },
    ]);
  });
};

export const isValidEmailAddress = (email: string) => {
  return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/.test(email)
}