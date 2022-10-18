import React, {useCallback, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {StyleSheet, TextInput, View} from 'react-native';
import appConstants from '../../constants';
import AppInput from '../../components/AppInput';
import AppButton from '../../components/AppButton';

const LoginScreen = (_props: NativeStackScreenProps<any, any>) => {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const onChangeTextHandler = useCallback(
    (inputId: string, _enteredText: string) => {
      console.log(inputId, _enteredText);
      switch (inputId) {
        case '':
          break;
        default:
      }
    },
    [],
  );

  const onSubmitEditingHandler = useCallback((inputId: string) => {
    console.log(inputId);

    switch (inputId) {
      case '':
        break;
      default:
    }
  }, []);

  return (
    <View style={styles.container}>
      <AppInput
        ref={emailRef}
        placeholder="Email"
        onChangeText={onChangeTextHandler.bind(null, appConstants.EMAIL)}
        onSubmitEditing={onSubmitEditingHandler.bind(null, appConstants.EMAIL)}
      />
      <AppInput
        ref={passwordRef}
        placeholder="Password"
        onChangeText={onChangeTextHandler.bind(null, appConstants.PASSWORD)}
        onSubmitEditing={onSubmitEditingHandler.bind(
          null,
          appConstants.PASSWORD,
        )}
      />
      <AppButton
        text="LOGIN"
        onPress={() => {
          console.log('btn pressed');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default LoginScreen;
