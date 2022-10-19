jest.mock('@react-native-firebase/auth', () => ({
  signInWithEmailAndPassword: async (email: string, password: string) => {
    if (!email || !email.trim() || !password || !password.trim()) {
      Promise.reject('Invalid credentials');
    }

    if (!/^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,15}$/.test(email)) {
      Promise.reject('Invalid email-address');
    }

    if (password.length < 6) {
      Promise.reject('Password should minimum of 6 characters');
    } else if (password.length > 15) {
      Promise.reject('Password should maximum of 15 characters');
    }

    Promise.resolve('success')
  },
}));

describe('react native firebase auth implementation test', () => {
  require('@react-native-firebase/auth').
})