const moment = require('moment');

const generateMessage = (text, from = 'Server') => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    }
};

module.exports = {
    generateMessage,
};