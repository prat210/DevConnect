
const mongoose = require('mongoose');

const validator = require('validator');


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50
    },
    LastName: {
        type: String
    },
    emailId: {
        type: String,
        lowercase: true,
        required: true,
        validate(value){
         if(!validator.isEmail(value)){
            throw new Error("Email invalid");
         }
        }
    },
    Password: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong password");
        }
    }
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