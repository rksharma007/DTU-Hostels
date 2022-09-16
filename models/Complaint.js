const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ComplaintSchema = new Schema({
    studentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'id'
    },
    name: {
        type: String,
        required: true
    },
    roll:{
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    resolved: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Complaint = mongoose.model('complaint', ComplaintSchema);