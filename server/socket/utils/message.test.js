const { generateMessage } = require('./message');

describe('generateMessage', () => {
    test('should generate the correct message object with sender being Server if no sender is passed when calling generateMessage()', () => {
        const text = 'Hello there';
        const message = generateMessage(text);

        expect(typeof message.createdAt).toEqual('number');
        expect(message).toMatchObject({ from: 'Server', text });
    });

    test('should generate the correct message object with sender name if sender is passed when calling generateMessage()', () => {
        const text = 'Hello there';
        const from = 'General Kenobi';
        const message = generateMessage(text, from);

        expect(typeof message.createdAt).toEqual('number');
        expect(message).toMatchObject({ from, text });
    });
});