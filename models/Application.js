const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
    studentid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'studentid'
    },
    status: {
        type: String,
        default: "applied"
    },
    fullname:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    roll:{
        type: String,
        required: true
    },
    branch:{
        type: String,
        required: true
    },
    semester:{
        type: Number,
        require: true
    },
    email:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    gradyear:{
        type: Number,
        required: true
    },
    fathername:{
        type: String,
        required: true
    },
    fathermobile: {
        type: String,
        required: true
    },
    mothername:{
        type: String,
        required: true
    },
    mothermobile: {
        type: String,
        required: false
    },
    localguardianname:{
        type: String,
        required: true
    },
    localguardianmobile: {
        type: String,
        required: true
    },
    nationality: {
        type: String,
        required: true
    },
    permanentaddress_country: {
        type: String,
        required: true
    },
    permanentaddress_state: {
        type: String,
        required: true
    },
    permanentaddress_city: {
        type: String,
        required: true
    },
    permanentaddress_addressline1: {
        type: String,
        required: true
    },
    permanentaddress_addressline2: {
        type: String,
        required: true
    },
    correspondenceaddress_country: {
        type: String,
        required: true
    },
    correspondenceaddress_state: {
        type: String,
        required: true
    },
    correspondenceaddress_city: {
        type: String,
        required: true
    },
    correspondenceaddress_addressline1: {
        type: String,
        required: true
    },
    correspondenceaddress_addressline2: {
        type: String,
        required: true
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

module.exports = Application = mongoose.model('application', ApplicationSchema);