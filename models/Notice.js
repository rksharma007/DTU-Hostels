const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    document: {
        data: Buffer,
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Notice = mongoose.model('notice', NoticeSchema);