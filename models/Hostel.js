const mongoose = require('mongoose');

const HostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    wardenname: {
        type: String,
        required: true
    },
    wardencontact: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    // room: [
    //     {
    //         roomno: {
    //             type: String,
    //             required: true
    //         },
    //         floor: {
    //             type: String,
    //             required: true
    //         },
    //         beds: {
    //             type: Number,
    //             required: true
    //         },
    //         acstatus: {
    //             type: Boolean,
    //             default: false
    //         },
    //         vacant: {
    //             type: Boolean,
    //             default: true
    //         },
    //         date : {
    //             type: Date,
    //             default: Date.now
    //         }
    //     }
    // ],
    date : {
        type: Date,
        default: Date.now
    }
});

module.exports = Hostel = mongoose.model('hostel', HostelSchema);