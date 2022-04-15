const mongoogse = require('mongoose');
// const validate = require('validator');
const OtpSchema = new mongoogse.Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
const Otp = mongoogse.model('Otp', OtpSchema);
module.exports = Otp;