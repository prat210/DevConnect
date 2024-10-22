const express = require('express');

const authRouter = express.Router();


const User = require("../models/user");

const bcrypt = require('bcrypt');

const validator = require('validator');
// const USer = require("./models/user");
const {ValidateCheck} = require("../utils/validation");



authRouter.post("/signup", async (req, res)=>{

    try{
       
        //Validation of data
        ValidateCheck(req);
    
        //encrypting password
        const {firstName,LastName,emailId,Password} = req.body;
    
        const Encrypted = await bcrypt.hash(Password, 10);
        console.log(Encrypted);
        //creating a new instance of User model
        const user = new User({
    
            firstName,
            LastName,
            emailId,
            Password: Encrypted,
    
    
        });
    
    
    
        await user.save();
      res.send("User Added Successfully!");
    }
    catch(err){
      res.status(400).send("Error saving the user: " + err.message);
    
    }
    });
authRouter.post("/login", async (req, res) => {

        const {emailId,Password} = req.body
           
       try{
       
           if (!validator.isEmail(emailId)){
               throw new Error("Invalid credentials");
           }
       ;
       
       const user = await User.findOne({emailId: emailId});
       
       if (!user){
           throw new Error("Invalid credentials");
       }
       
       const ValidatePassword = await user.validpassword(Password);
       
       if(ValidatePassword){
       
           //Create a JWT token
       
           const token = await user.getJWT();
           
           // console.log(token);
       
          //add the token to the cookie and send the response back to the user
           res.cookie("token", token,{expires:
               new Date(Date.now()+ 8*3600000)
           });
           res.send("Login successfully")
       }
       else{
           
           throw new Error("Invalid credentials");
       }
       
       
       
       
       
       }
       
       catch(err){
           console.log(err);
           res.status(400).send("Something went wrong :" + err.message);
       }
       
       
       
       
       })

module.exports = authRouter;