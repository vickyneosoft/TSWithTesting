import React, { useCallback, useRef } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { StyleSheet, View } from 'react-native';
import { useFormik } from 'formik';

// * Constants
import appConstants from '../../constants';
import colors from '../../constants/colors';

// * Components
import AppInput, { AppInputAPIs } from '../../components/AppInput';
import AppButton from '../../components/AppButton';
import BoldText from '../../components/BoldText';
import AuthFooter from '../../components/AuthFooter';
import AppLoader from '../../components/AppLoader';

// * HOC
import withSafeArea from '../../HOC/withSafeArea';
import withAuthContextConsumer from '../../HOC/withAuthContextConsumer';

// * Misc
import { ActionKind, AuthContextTypes, MyFormValues } from '../../types';
import RegularText from '../../components/RegularText';
import { isValidEmailAddress } from '../../utils/miscUtils';
import withKeyboardHandling from '../../HOC/withKeyboardHandling';
// * - END of Imports Statements - *

type FormFieldValueTypes = {
  email: string
  password: string
}

type FormFieldErrorTypes = {
  email: string
  password: string
}

const initialValues: MyFormValues = { email: '', password: '' };

let hasSubmitted = false

const RegisterScreen = (
  props: NativeStackScreenProps<any, any> & AuthContextTypes,
) => {
  const { navigation, authActionHandler, state } = props;
  const { isLoading } = state;

  const emailRef = useRef<AppInputAPIs>(null);
  const passwordRef = useRef<AppInputAPIs>(null);

  const onLoginRequestHandler = useCallback(() => {
    navigation.goBack()
  }, [navigation]);

  const onSubmit = useCallback(
    (_formValues: FormFieldValueTypes) => {
      if (isLoading) {
        return
      }
      authActionHandler(ActionKind.REGISTER, _formValues)
    },
    [isLoading, navigation],
  );

  const validate = useCallback((formValues: FormFieldValueTypes) => {
    const {
      email,
      password
    } = formValues;

    const validationErrors: FormFieldErrorTypes = {
      email: '',
      password: ''
    };

    if (!email) {
      validationErrors.email = 'Email address required.';
    } else if (!isValidEmailAddress(email)) {
      validationErrors.email = 'Please enter a valid email address.';
    }
    if (!password) {
      validationErrors.password = 'Password required.';
    } else if (password.length < 6 || password.length > 15) {
      validationErrors.password =
        'Password should have min 6 length or max 15 length.';
    }

    const errorKeys = Object.keys(validationErrors).filter(
      key => validationErrors[key],
    );

    return errorKeys.length ? validationErrors : undefined;
  }, []);

  const {
    errors,
    handleSubmit,
    handleChange,
    values,
    setFieldValue,
  } = useFormik({
    initialValues,
    onSubmit,
    validate,
    validateOnBlur: false,
    validateOnChange: false,
    validateOnMount: false,
  });


  const onChangeTextHandler = useCallback(
    (inputId: string, _enteredText: string) => {
      if (hasSubmitted) {
        setFieldValue(inputId, _enteredText, true)
      } else {
        handleChange(inputId)(_enteredText);
      }
    },
    [handleChange, setFieldValue],
  );

  const onSubmitEditingHandler = useCallback(
    (inputId: string) => {
      switch (inputId) {
        case appConstants.EMAIL:
          passwordRef.current?.focus();
          break;
        case appConstants.PASSWORD:
          handleSubmit();
          break;
      }
    },
    [handleSubmit],
  );

  const onSubmitPressHandler = useCallback(() => {
    hasSubmitted = true
    handleSubmit()
  }, [handleSubmit])

  return (
    <>
      <AppLoader isVisible={isLoading} />
      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.placeholderContainer}>
            <BoldText
              style={styles.placeholderText}
            >
              {'Sign Up'}
            </BoldText>
            <RegularText
              style={styles.subPlaceholderText}
            >
              {'Enter your credentials to create new account.'}
            </RegularText>
          </View>
          <AppInput
            testID='txtEmail'
            ref={emailRef}
            placeholder="Email"
            keyboardType="email-address"
            onChangeText={onChangeTextHandler.bind(null, appConstants.EMAIL)}
            onSubmitEditing={onSubmitEditingHandler.bind(
              null,
              appConstants.EMAIL,
            )}
            errorMsg={errors.email}
          />
          <AppInput
            testID='txtPassword'
            ref={passwordRef}
            placeholder="Password"
            secureTextEntry
            blurOnSubmit={true}
            onChangeText={onChangeTextHandler.bind(null, appConstants.PASSWORD)}
            onSubmitEditing={onSubmitEditingHandler.bind(
              null,
              appConstants.PASSWORD,
            )}
            errorMsg={errors.password}
          />
          <AppButton
            testID='btnSubmit'
            text="SIGNUP"
            onPress={onSubmitPressHandler}
            style={styles.btn}
          />
        </View>
        <AuthFooter
          testID='btnLogin'
          btnText="Login"
          placeholderText={"Already have an account? "}
          onPress={onLoginRequestHandler}
          style={{ color: colors.white, fontSize: 16 }}
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
    backgroundColor: colors.grey,
  },
  placeholderContainer: {
    flex: 0.3,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 22,
    color: colors.white
  },
  subPlaceholderText: {
    color: colors.white
  },
  btn: {
    marginTop: 20,
  },
  signupText: {
    flexShrink: 1,
    alignSelf: 'center',
    marginBottom: 10,
    fontSize: 14,
    color: colors.white
  },
});

export default withKeyboardHandling(withAuthContextConsumer(RegisterScreen));
