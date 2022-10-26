import { describe, expect, test } from '@jest/globals';
import { isValidEmailAddress, keyExtractorHandler } from '../../utils/miscUtils';


describe('validation module', () => {
    test('check validity of email address', () => {
        expect(isValidEmailAddress('vicky.ahuja@neosoftmail.com')).toBeTruthy();
        expect(isValidEmailAddress('@@@@')).toBeFalsy();
        expect(isValidEmailAddress('asdasdad')).toBeFalsy();
        expect(isValidEmailAddress('sdfsfd12346')).toBeFalsy();
    });
});

// describe('Misc testing', () => {
//     test('testing keyExtract method', () => {
//         expect(keyExtractorHandler({}, 1)).toBe('1');
//     });
// });
