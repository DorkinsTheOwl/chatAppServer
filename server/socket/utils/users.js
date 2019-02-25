class Users {
    constructor() {
        this.users = [];
        // configurable inactivity timer, currently set for 10 min (min * sec * ms)
        this.inactivityTime = 10 * 60 * 1000;
    }

    addUser(id, name) {
        const user = { id, name };
        this.users.push(user);
    }

    removeUser(id) {
        const user = this.getUser(id);

        if (user) {
            this.users = this.users.filter(user => user.id !== id);
        }

        return user;
    }

    getUser(id) {
        return this.users.filter(user => user.id === id)[0];
    }

    getUserList() {
        return this.users;
    }

    startInactivityTimeout(socket, user, timeout = null) {
        if (timeout) {
            clearTimeout(timeout);
        }

        return setTimeout(() => {
            socket.disconnect(true);
        }, this.inactivityTime)
    }
}

module.exports = {
    Users
};