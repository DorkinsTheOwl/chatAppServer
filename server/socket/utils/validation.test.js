const { isNameTaken, isRealString } = require('./validation');

describe('isNameTaken', () => {
    let users;
    beforeEach(() => {
        users = [{
            id: '1',
            name: 'Mark'
        }, {
            id: '2',
            name: 'Batman'
        }, {
            id: '3',
            name: 'Tony'
        }]
    });

    test('should return false if there are no users when calling isNameTaken()', () => {
        expect(isNameTaken([], 'Mark')).toEqual(false);
    });

    test('should return false if there are no users with the provided user name when calling isNameTaken()', () => {
        expect(isNameTaken(users, 'Tom')).toEqual(false);
    });

    test('should return true if there is user with the same name as provided user name when calling isNameTaken()', () => {
        expect(isNameTaken(users, 'Mark')).toEqual(true);
    });
});

describe('isRealString', () => {
    test('should reject non-string value when calling isRealString()', () => {
        const res = isRealString(11);
        expect(res).toEqual(false);
    });

    test('should reject string with only spaces when calling isRealString()', () => {
        const res = isRealString('    ');
        expect(res).toEqual(false);
    });

    test('should allow string with non-space characters when calling isRealString()', () => {
        const res = isRealString('   wdawd    ');
        expect(res).toEqual(true);
    });
});