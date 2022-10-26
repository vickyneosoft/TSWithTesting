require('jest-fetch-mock').enableMocks()

jest.mock('@react-native-firebase/auth', () => ({
  signInWithEmailAndPassword: async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      if (!email || !email.trim() || !password || !password.trim()) {
        reject('Invalid credentials');
      }

      if (!/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/.test(email)) {
        reject('Invalid email-address');
      }

      if (password.length < 6) {
        reject('Password should minimum of 6 characters');
      } else if (password.length > 15) {
        reject('Password should maximum of 15 characters');
      }
      resolve('success')
    })
  },
  createUserWithEmailAndPassword: async (email: string, password: string) => {
    return new Promise((resolve, reject) => {
      if (!email || !email.trim() || !password || !password.trim()) {
        reject('Invalid credentials');
      }

      if (!/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/.test(email)) {
        reject('Invalid email-address');
      }

      if (password.length < 6) {
        reject('Password should minimum of 6 characters');
      } else if (password.length > 15) {
        reject('Password should maximum of 15 characters');
      }
      resolve('success')
    })
  },
  signOut: async () => {
    return new Promise((resolve, _reject) => {
      resolve(true)
    })
  }
}));

jest.mock('@react-navigation/native-stack');

jest.mock('react-native-keyboard-aware-scroll-view', () => {
  return {
    KeyboardAwareScrollView: jest
      .fn()
      .mockImplementation(({ children }) => children),
  };
});

jest.mock('./node_modules/react-native/Libraries/Interaction/InteractionManager.js', () => {
  return {
    runAfterInteractions: (callback: any) => {
      return {
        then: () => { },
        cancel: () => { }
      }
    }
  }
});

// require('jest-fetch-mock').enableMocks()
/**
 * mocking the api call
 */
(global as any).fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(
      {}
    )
  })
);