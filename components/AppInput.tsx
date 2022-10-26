import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
} from 'react-native';
import colors from '../constants/colors';
import RegularText from './RegularText';

export type AppInputAPIs = {
  setText: (value: string) => void;
  getText: () => string;
  focus: () => void;
};

type AppInputProps = {
  errorMsg?: string
  onChangeText: (inputId: string, enteredText: string) => void;
  onSubmitEditing: (inputId: string) => void;
};

/*
 * Custom Input component with advance APIs
 */
const AppInput = forwardRef(
  (props: AppInputProps & TextInputProps, ref: any) => {
    const { onChangeText, onSubmitEditing, style, defaultValue, errorMsg } = props;

    const [value, setValue] = useState<string>(defaultValue ?? '');

    const textInputRef = useRef<TextInput>(null);

    // * To set state value from parent component
    const setText = useCallback((enteredText: string) => {
      setValue(enteredText);
    }, []);

    // * To get state value in parent component
    const getText = useCallback(() => {
      return value;
    }, [value]);

    // * To focus input from parent
    const focus = useCallback(() => {
      textInputRef.current?.focus();
    }, []);

    // * manage component state from parent component using ref
    const initHandler = useCallback(
      () => ({ setText, getText, focus }),
      [setText, getText, focus],
    );

    // * manage text input changes
    const onChangeTextHandler = useCallback(
      (enteredText: string) => {
        onChangeText(enteredText);
        setText(enteredText);
      },
      [onChangeText, setText],
    );

    // * manage text input submit
    const onSubmitEditingHandler = useCallback(onSubmitEditing, [
      onSubmitEditing,
    ]);

    // * bind ref with component APIs
    useImperativeHandle(ref, initHandler);

    // * combine prop styles and default component styles
    const combinedStyles = useMemo<StyleProp<TextStyle>>(
      () => StyleSheet.compose(styles.container as TextStyle, style),
      [style],
    );

    return (
      <View style={{ marginVertical: 10 }}>
        <TextInput
          returnKeyType="next"
          keyboardType="default"
          blurOnSubmit={false}
          {...props}
          placeholderTextColor={colors.white}
          value={value}
          ref={textInputRef}
          onChangeText={onChangeTextHandler}
          onSubmitEditing={onSubmitEditingHandler}
          style={combinedStyles}
        />
        {errorMsg
          ? <RegularText
            style={styles.errorMsg}
          >
            {errorMsg}
          </RegularText>
          : null
        }
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    height: 55,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.white,
    overflow: 'hidden',
    paddingLeft: 20,
    color: colors.white
  },
  errorMsg: {
    color: colors.danger,
    paddingLeft: 20,
    marginTop: 2
  }
});

export default AppInput;
