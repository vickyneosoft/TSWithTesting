import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

import {
  Action,
  ActionKind,
  AuthContextTypes,
  CredentialInfo,
  State,
} from '../types';
import constants from '../constants';
import {ErrorToast} from '../utils/toastUtils';

// type Reducer<State, Action> = (state: State, action: Action) => State;

export const AuthContext = createContext<AuthContextTypes>({
  state: {
    isLoading: false,
    userData: null,
  },
  saveData: () => {},
  clearData: () => {},
  authActionHandler: (_action: ActionKind) => {},
});

const authReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionKind.TOGGLE_LOADER:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionKind.SAVE_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    case ActionKind.CLEAR_DATA:
      return {
        ...state,
        userData: null,
      };
    default:
      return state;
  }
};

export const initialState: State = {
  isLoading: false,
  userData: null,
};

const AuthContextComponent = (props: any) => {
  const {children} = props;

  const [state, dispatch] = useReducer(authReducer, initialState);

  const saveData = useCallback((data: any) => {
    dispatch({
      type: ActionKind.SAVE_DATA,
      payload: data,
    });
  }, []);

  const clearData = useCallback(async () => {
    try {
      await auth().signOut();
    } catch (err: any) {
    } finally {
      dispatch({
        type: ActionKind.CLEAR_DATA,
      });
    }
  }, []);

  const toggleLoading = useCallback((newStatus: boolean) => {
    dispatch({
      type: ActionKind.TOGGLE_LOADER,
      payload: newStatus,
    });
  }, []);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      if (user) {
        saveData({
          email: user.email,
          userId: user.uid,
        });
      } else {
        clearData();
      }
    });
  }, [clearData, saveData]);

  const authActionHandler = useCallback(
    async (action: ActionKind, credentialInfo?: CredentialInfo) => {
      try {
        switch (action) {
          case ActionKind.LOGIN:
            if (credentialInfo) {
              const {email, password} = credentialInfo;
              toggleLoading(true);
              await auth().signInWithEmailAndPassword(email, password);
              toggleLoading(false);
            }
            break;
          case ActionKind.REGISTER:
            if (credentialInfo) {
              const {email, password} = credentialInfo;
              toggleLoading(true);
              await auth().createUserWithEmailAndPassword(email, password);
              toggleLoading(false);
            }
            break;
          case ActionKind.LOGOUT:
            clearData();
            break;
        }
      } catch (err: any) {
        console.log('[register] Error : ', err.message);
        toggleLoading(false);
        let errMsg = constants.SOMETHING_WENT_WRONG;
        switch (err?.code) {
          case 'auth/invalid-email':
            errMsg = 'The email address is badly formatted.';
            break;
          case 'auth/weak-password':
            errMsg = 'Password should be at least 6 characters.';
            break;
          case 'auth/email-already-in-use':
            errMsg = 'The email address is already in use by another account.';
            break;
          case 'auth/wrong-password':
            errMsg =
              'The password is invalid or the user does not have a password.';
            break;
          case 'auth/network-request-failed':
            errMsg = 'Please check your network connection.';
            break;
          case 'auth/user-not-found':
            errMsg =
              'There is no user record corresponding to this identifier. The user may have been deleted.';
            break;
        }
        ErrorToast(errMsg);
      }
    },
    [clearData, toggleLoading],
  );

  const contextValue = useMemo(
    () => ({state, saveData, clearData, authActionHandler}),
    [state, saveData, clearData, authActionHandler],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContextComponent;
