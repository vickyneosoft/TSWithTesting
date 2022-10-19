import {Platform, ToastAndroid} from 'react-native';

export const ErrorToast = (message: string, _timeout = 2000) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, _timeout);
  }
};

export const SuccessToast = (message: string, _timeout = 2000) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(message, _timeout);
  }
};
