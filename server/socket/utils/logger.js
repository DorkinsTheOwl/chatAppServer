const moment = require('moment');
const { LogItem } = require('../../db/models/log-item');

class Logger {
    constructor(writeStream = null) {
        this.writeStream = writeStream;
    }

    writeEntry(text, sender = 'Server') {
        if (!!this.writeStream) {
            this.writeStream.write(`${moment()} - [${sender}] ${text}\n`);
        } else {
            new LogItem({ sender, text, timeStamp: moment().unix() }).save();
        }
    }

    closeStream() {
        if (!!this.writeStream) {
            this.writeEntry('Server shutting down. All clients disconnected.');
            this.writeStream.end();
        }
    }
}

module.exports = {
    Logger
};