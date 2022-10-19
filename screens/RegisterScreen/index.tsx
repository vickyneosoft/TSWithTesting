import React, {useCallback, useRef} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {StyleSheet, View} from 'react-native';
import {useFormik} from 'formik';

// * Constants
import appConstants from '../../constants';
import colors from '../../constants/colors';

// * Components
import AppInput, {AppInputAPIs} from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import BoldText from '../../components/BoldText';
import AuthFooter from '../../components/AuthFooter';
import AppLoader from '../../components/AppLoader';

// * HOC component
import withSafeArea from '../../HOC/withSafeArea';
import withAuthContextConsumer from '../../HOC/withAuthContextConsumer';

// * Utils
import {ErrorToast} from '../../utils/toastUtils';
import {ActionKind, AuthContextTypes, MyFormValues} from '../../types';

const initialValues: MyFormValues = {email: '', password: ''};

const initialErrors: MyFormValues = {
  email: 'Email address required.',
  password: 'Password required',
};

const RegisterScreen = (
  props: NativeStackScreenProps<any, any> & AuthContextTypes,
) => {
  const {navigation, authActionHandler, state} = props;
  const {isLoading} = state;

  const emailRef = useRef<AppInputAPIs>(null);
  const passwordRef = useRef<AppInputAPIs>(null);

  const validate = useCallback((values: MyFormValues) => {
    let hasErrors = true;
    const errors: MyFormValues = initialValues;

    if (!values.email) {
      errors.email = 'Email address required.';
    } else if (
      !/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/.test(values.email)
    ) {
      errors.email = 'Entered invalid email address.';
    } else {
      hasErrors = false;
    }

    if (!values.password) {
      errors.password = 'Password required';
    } else if (values.password.length < 6) {
      errors.password = 'Password should minimum of 6 characters';
    } else if (values.password.length > 15) {
      errors.password = 'Password should maximum of 15 characters';
    } else {
      hasErrors = false;
    }

    return hasErrors ? errors : undefined;
  }, []);

  const formSubmitHandler = useCallback(
    ({email, password}: MyFormValues) => {
      authActionHandler(ActionKind.REGISTER, {
        email,
        password,
      });
    },
    [authActionHandler],
  );

  const {errors, handleSubmit, handleChange} = useFormik({
    initialValues,
    initialErrors,
    onSubmit: formSubmitHandler,
    validate,
  });

  const onSubmitHandler = useCallback(() => {
    try {
      if (errors) {
        const errorMsgs = Object.keys(errors).filter(key => errors[key]);
        if (errorMsgs.length) {
          ErrorToast(errors[errorMsgs[0]]);
          return;
        }
      }
      handleSubmit();
    } catch (err: any) {
      ErrorToast(err?.message);
    }
  }, [errors, handleSubmit]);

  const onChangeTextHandler = useCallback(
    (inputId: string, enteredText: string) => {
      switch (inputId) {
        case appConstants.EMAIL:
          handleChange('email')(enteredText);
          break;
        case appConstants.PASSWORD:
          handleChange('password')(enteredText);

          break;
      }
    },
    [handleChange],
  );

  const onSubmitEditingHandler = useCallback(
    (inputId: string) => {
      switch (inputId) {
        case appConstants.EMAIL:
          passwordRef.current?.focus();
          break;
        case appConstants.PASSWORD:
          onSubmitHandler();
          break;
      }
    },
    [onSubmitHandler],
  );

  const onLoginRequestHandler = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <AppLoader isVisible={isLoading} />
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.placeholderContainer}>
            <BoldText style={styles.placeholderText}>{'Signup'}</BoldText>
          </View>
          <AppInput
            ref={emailRef}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={onChangeTextHandler.bind(null, appConstants.EMAIL)}
            onSubmitEditing={onSubmitEditingHandler.bind(
              null,
              appConstants.EMAIL,
            )}
          />
          <AppInput
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry
            onChangeText={onChangeTextHandler.bind(null, appConstants.PASSWORD)}
            onSubmitEditing={onSubmitEditingHandler.bind(
              null,
              appConstants.PASSWORD,
            )}
          />
          <AppButton
            text="REGISTER"
            onPress={onSubmitHandler}
            style={styles.btn}
          />
        </View>
        <AuthFooter
          btnText="Login Here"
          placeholderText={'Already have an account? '}
          onPress={onLoginRequestHandler}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  placeholderContainer: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {alignSelf: 'center', fontSize: 22},
  btn: {
    marginTop: 20,
  },
});

export default withSafeArea(withAuthContextConsumer(RegisterScreen));
