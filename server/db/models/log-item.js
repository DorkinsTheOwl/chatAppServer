const mongoose = require('mongoose');

const LogItem = mongoose.model('LogItem', {
    sender: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    timeStamp: {
        type: Number,
        required: true
    }
});

module.exports = {
    LogItem
};