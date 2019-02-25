const fs = require('fs');

const { generateMessage } = require('./utils/message');
const { isNameTaken, isRealString } = require('./utils/validation');
const { Users } = require('./utils/users');
const { Logger } = require('./utils/logger');
const { mongoose } = require('../db/mongoose');

class Socket {
    constructor(io) {
        this.users = new Users();
        this.inactivityTimeouts = {};
        this.io = io;
        this.writeStream = fs.createWriteStream(`server/socket/log${io.path().replace('/', '-')}.txt`, { flags: 'a' });
        this.logger = new Logger(this.writeStream);
        // I'm assuming you don't have mongoDB set up locally, thus using writeStream
        // To use mongoDB simply call new Logger class without writeStream
        // Entries in mongoDB could then be used to retrieve and display them on web-page or any other source
        // this.logger = new Logger();
        this.logger.writeEntry('Server started.');
    }

    initialize() {
        this.io.on('connection', socket => {
            socket.on('join', (params, callback) => {
                if (isNameTaken(this.users.getUserList(), params.name)) {
                    this.logger.writeEntry(`${params.name} tried to connect, but name was already taken.`);
                    return callback('Failed to connect. Nickname already taken.');
                }

                // if we connect through front-end this will never be called, since we have validation on front-end
                if (!isRealString(params.name)) {
                    return callback('Name required');
                }

                callback();

                this.users.removeUser(socket.id);
                this.users.addUser(socket.id, params.name);

                const message = `${params.name} has joined.`;

                this.io.emit('updateUserList', this.users.getUserList());
                socket.emit('newMessage', generateMessage('Welcome to the chat app.'));
                socket.broadcast.emit('newMessage', generateMessage(message));
                this.logger.writeEntry(message);

                this.inactivityTimeouts[params.name] = this.users.startInactivityTimeout(socket, params.name);
            });

            socket.on('createMessage', (msg, callback) => {
                const user = this.users.getUser(socket.id);

                if (user) {
                    this.io.emit('newMessage', generateMessage(msg.text, user.name));
                    this.logger.writeEntry(msg.text, user.name);
                    this.inactivityTimeouts[user.name] =
                        this.users.startInactivityTimeout(socket, user.name, this.inactivityTimeouts[user.name]);
                }

                callback();
            });

            socket.on('disconnect', reason => {
                const user = this.users.removeUser(socket.id);

                if (user) {
                    delete this.inactivityTimeouts[user.name];

                    // if there is no reason it means process has been terminated
                    if (!!reason) {
                        let message;
                        switch (reason) {
                            case 'server namespace disconnect':
                                message = `${user.name} was disconnected due to inactivity.`;
                                break;
                            default:
                                message = `${user.name} left the chat, connection lost.`;
                        }

                        this.io.emit('updateUserList', this.users.getUserList());
                        this.io.emit('newMessage', generateMessage(message));
                        this.logger.writeEntry(message);
                    }
                }
            })
        });

        process.on('SIGINT', this.handleTermination.bind(this));
        process.on('SIGTERM', this.handleTermination.bind(this));
    }

    handleTermination() {
        this.logger.closeStream();
        this.io.close();
    }
}

module.exports = {
    Socket
};
