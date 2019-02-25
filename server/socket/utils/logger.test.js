const { Logger } = require('./logger');
const moment = require('moment');

describe('Logger for txt', () => {
    let logger;
    const writeStream = { write: jest.fn(), end: jest.fn() };
    beforeEach(() => {
        logger = new Logger(writeStream);
    });

    test('should call writeStream.write() with Server as sender when calling writeEntry() without passing sender', () => {
        const spy = spyOn(writeStream, 'write');
        const message = 'Test text';
        logger.writeEntry(message);
        expect(spy).toHaveBeenCalledWith(`${moment()} - [Server] ${message}\n`);
    });

    test('should call writeStream.write() with passed sender name as sender when calling writeEntry()', () => {
        const spy = spyOn(writeStream, 'write');
        const message = 'Test text';
        const sender = 'Robin';
        logger.writeEntry(message, sender);
        expect(spy).toHaveBeenCalledWith(`${moment()} - [${sender}] ${message}\n`);
    });

    test('should call writeEntry() when calling closeStream()', () => {
        const spy = spyOn(logger, 'writeEntry');
        logger.closeStream();
        expect(spy).toHaveBeenCalled();
    });

    test('should call writeStream.end() when calling closeStream()', () => {
        const spy = spyOn(writeStream, 'end');
        logger.closeStream();
        expect(spy).toHaveBeenCalled();
    });
});