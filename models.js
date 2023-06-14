const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    balance: {type: Number, default: 100},
    isEmployee: {type: Boolean, default: false}
});
const User = mongoose.model('User', UserSchema);
module.exports = User;