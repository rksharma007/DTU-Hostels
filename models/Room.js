const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    hostelid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hostelid'
    },
    roomno: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true
    },
    beds: {
        type: Number,
        required: true
    },
    acstatus: {
        type: Boolean,
        default: false,
        required: true
    },
    studentcount:{
        type: Number,
        default: 0
    },
    vacant: {
        type: Boolean,
        default: true
    },
    studentid1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentid',
        default: null
    },
    studentid2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentid',
        default: null
    },
    studentid3: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentid',
        default: null
    },
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = Room = mongoose.model('room', RoomSchema);