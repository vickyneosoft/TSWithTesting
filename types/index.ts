export type UserData = {
  email: string;
};

export type State = {
  isLoading: boolean;
  userData: UserData | null;
};

export enum ActionKind {
  SAVE_DATA = 'SAVE_DATA',
  CLEAR_DATA = 'CLEAR_DATA',
  TOGGLE_LOADER = 'TOGGLE_LOADER',
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  LOGOUT = 'LOGOUT',
}

export type Action = {
  type: ActionKind;
  payload?: any;
};

export type CredentialInfo = {
  email: string;
  password: string;
};

export type AuthContextTypes = {
  state: State;
  saveData: (data: UserData) => void;
  clearData: () => void;
  authActionHandler: (
    action: ActionKind,
    credentialInfo?: CredentialInfo,
  ) => any;
};

export type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export interface MyFormValues {
  email: string;
  password: string;
}
