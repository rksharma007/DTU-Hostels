const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    roomid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'roomid',
        default: null
    },
    name: {
        type: String,
        required: true
    },
    roll: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    applicationstatus: {
        type: Number,
        default: 0
    },
    feestatus: {
        type: Boolean,
        default: false,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Student = mongoose.model('student', StudentSchema);