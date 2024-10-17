const validator = require('validator');


const ValidateCheck = (req) =>{
    const {firstName,LastName,emailId,Password} = req.body;

    if (!firstName || !LastName){
        throw new Error("Please Enter Name");
    }

   else if (!validator.isEmail(emailId)){
    throw new Error("Please Enter Email");
   }
   else if (!validator.isStrongPassword(Password)){
throw new Error("Please Enter Strong Password");
}}


module.exports = {ValidateCheck};