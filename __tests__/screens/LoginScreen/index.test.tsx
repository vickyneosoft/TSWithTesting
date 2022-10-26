import React from 'react';
import LoginScreen from '../../../screens/LoginScreen';

// Note: test renderer must be required after react-native.
import renderer, { act } from 'react-test-renderer';

describe('react native firebase auth implementation test', () => {
    const firebaseAuth = require('@react-native-firebase/auth')

    it('should login with valid credentials', async () => {
        const res = await firebaseAuth.signInWithEmailAndPassword('abc@gmail.com', '123456')
        expect(res).toBe('success')
    })

    it('should throw error on invalid email address', async () => {
        try {
            await firebaseAuth.signInWithEmailAndPassword('abc', '123456')
        } catch (err: any) {
            expect(err).toBe('Invalid email-address')
        }
    })

    it('should throw error on less then 6 characters password length', async () => {
        try {
            await firebaseAuth.signInWithEmailAndPassword('abc@gmail.com', '123')
        } catch (err: any) {
            expect(err).toBe('Password should minimum of 6 characters')
        }
    })

    it('should throw error on greater then 15 characters password length', async () => {
        try {
            await firebaseAuth.signInWithEmailAndPassword('abc@gmail.com', '123456789101010')
        } catch (err: any) {
            expect(err).toBe('Password should maximum of 15 characters')
        }
    })
})

describe('<LoginScreen /> rendering', () => {
    it('LoginScreen screen renders correctly', () => {
        const screen = renderer.create(<LoginScreen />);
        const tree = screen.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('LoginScreen screen renders correctly', async () => {
        const screen = renderer.create(<LoginScreen />);
        const emailInput = screen.root.findByProps({
            testID: 'txtEmail'
        })
        const passwordInput = screen.root.findByProps({
            testID: 'txtPassword'
        })

        const submitBtn = screen.root.findByProps({
            testID: 'btnSubmit'
        })
        await act(async () => {
            emailInput?._fiber?.ref?.current?.setText('abcd@gmail.com')
            passwordInput?._fiber?.ref?.current?.setText('123456')
            await submitBtn?._fiber?.memoizedProps?.onPress()
        })
        expect(screen.toJSON()).toMatchSnapshot();
    });
});