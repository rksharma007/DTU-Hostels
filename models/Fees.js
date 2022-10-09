const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeeSchema = new Schema({
    applicationid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'applicationid'
    },
    amount:{
        type: Number,
        required: true,
    },
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Fee = mongoose.model('fee', FeeSchema);