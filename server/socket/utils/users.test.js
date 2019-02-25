const { Users } = require('./users');

describe('Users', () => {
    let users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mark'
        }, {
            id: '2',
            name: 'Batman'
        }, {
            id: '3',
            name: 'Tony'
        }];
        users.inactivityTime = 1000;

        jest.useFakeTimers();
    });

    test('should add new user when calling addUser()', () => {
        const users = new Users();
        const user = {
            id: '123',
            name: 'Tony'
        };

        users.addUser(user.id, user.name);

        expect(users.users).toEqual([user])
    });

    test('should remove a user when calling removeUser() with existing id', () => {
        const usersLength = users.users.length;
        const userId = '1';
        const user = users.removeUser(userId);

        expect(user.id).toEqual(userId);
        expect(users.users.length).toEqual(usersLength - 1);
    });

    test('should not remove user when calling removeUser() with non existing id', () => {
        const usersLength = users.users.length;
        const userId = '123';
        const user = users.removeUser(userId);

        expect(user).toBeFalsy();
        expect(users.users.length).toEqual(usersLength);
    });

    test('should find user when calling getUser() with existing id', () => {
        const userId = '2';
        const user = users.getUser(userId);

        expect(user.id).toEqual(userId);
    });

    test('should not find user when calling getUser() with non existing id', () => {
        const userId = '123';
        const user = users.getUser(userId);

        expect(user).toBeFalsy();
    });

    test('should get all users when calling getUserList()', () => {
        const userList = users.getUserList();

        expect(userList).toEqual(users.users);
    });

    test('should return setTimeout when calling startInactivityTimeout()', () => {
        const timeout = users.startInactivityTimeout({
            disconnect: jest.fn()
        }, 'Mark');
        jest.runAllTimers();
        // expect(typeof timeout).toEqual('number');
        expect(timeout).toBeDefined();
    });

    test('should call socket.disconnect() after set amount of time when calling startInactivityTimeout()', () => {
        const socket = {
            disconnect: () => {
            }
        };
        const spy = jest.spyOn(socket, 'disconnect');
        users.startInactivityTimeout(socket, 'Mark');

        jest.runAllTimers();
        expect(spy).toHaveBeenCalled();
    });

    test('should call clearTimeout if timeout is passed when calling startInactivityTimeout()', () => {
        const socket = {
            disconnect: () => {
            }
        };
        users.startInactivityTimeout(socket, 'Mark', 1);
        expect(clearTimeout).toHaveBeenCalled();
    });
});