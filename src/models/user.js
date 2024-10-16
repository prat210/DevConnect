
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4
    },
    LastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
    },
    Password: {
        type: String,
        required: true,
        unique: true,
    },
    age:{
        type: Number,
        min: 18,
    },
    gender: {
        type: String,
        validate(value){
        if (!['male', 'female','others'].includes(value)){
            throw new Error("Gender Data is not valid");
        }
        }
    },
    photUrl:{
        type: String
    },
    about:{
        type: String,
        default: "This is a default abput of the user!"
    },
    skills:{
        type: [String],
        validate(value){
            if (value.length>5){
                throw new Error("Please select 5 or less skills!");
            }
        }

    }
},{
    timestamps:true,
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;