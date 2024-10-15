
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String},
    LastName: {
        type: String
    },
    emailId: {
        type: String
    },
    Password: {
        type: String
    },
    age:{
        type: Number
    },
    gender: {
        type: String
    }
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;