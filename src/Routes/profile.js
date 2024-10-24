const express = require('express');

const validator = require('validator');
const profileRouter = express.Router();

const {UserAuth} = require("../middlewares/auth");

const {ValidateProfile} = require("../utils/validation");

const bcrypt = require('bcrypt');

profileRouter.get("/profile/view",UserAuth, async(req,res)  =>{

    try{
   const user = req.user;
   res.send(user);
    }

    catch(err){

        res.status(400).send("Something went Wrong " + err.message);
    }

  
    
    
})

profileRouter.patch("/profile/edit", UserAuth, async(req,res) =>{
    

    try{
        if (!ValidateProfile(req)){
            throw new Error("Invalid Edit Request");
        }
        loggedInuser = req.user;

        Object.keys(req.body).forEach(key =>{
            loggedInuser[key]=req.body[key];
        })
        loggedInuser.save();

        res.send("Profile Updated Successfully");




    }

    catch(err){
res.status(400).send("Error!! " + err.message);
    }



})


profileRouter.patch("/profile/password", UserAuth, async (req, res) => {
    try {
        // Implement password update logic here
        const {Password}= req.body;
        if (!validator.isStrongPassword(Password)){
            throw new Error("Invalid Password Change Request");
        };

        const loggedInuser = req.user;;
        // console.log(user.Password);
        console.log(loggedInuser.Password);
        const Encrypted = await bcrypt.hash(req.body.Password, 10);
        loggedInuser["Password"] = Encrypted
        console.log(loggedInuser.Password);
        res.send("Password changed successfully");

        loggedInuser.save();
    } catch (err) {
        res.status(400).send("Error!! " + err.message);
    }
});

module.exports = profileRouter;