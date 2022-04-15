const mongoogse = require('mongoose');
// const validate = require('validator');
const UserSchema = new mongoogse.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});
const User = mongoogse.model('User', UserSchema);
module.exports = User;