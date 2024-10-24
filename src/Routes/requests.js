const express = require('express');

const requestRouter = express.Router();

const {UserAuth} = require("../middlewares/auth");

const ConnectionRequestModel = require("../models/connectionRequest");


const User = require("../models/user");



requestRouter.post("/request/send/:status/:toUserId", UserAuth, async(req,res)=>{

    try{

      const fromUserId = req.user._id
      const toUserId = req.params.toUserId;
      const status = req.params.status;
      
      const AllowedRequest= ["interested","notinterested"];

      if (!AllowedRequest.includes(status)){
        throw new Error(`Invalid status Type: ${status}`)

      }

      const toUser = await User.findById(toUserId)

      if(!toUser){
        return res.status(400).json({message:"User not Found"})
      }

      // if (fromUserId==toUserId){
      //   return res.status(400).json({message: "Bad Request: Cannot Send ConnectionRequest to Yourself"})
      // }



      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or:[
           {fromUserId, toUserId},
           {fromUserId: toUserId, toUserId: fromUserId},


        ],
      })

      if(existingConnectionRequest){
        throw new Error("Connection request Already Exists")
      }


      const ConnectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      })

      const data = await ConnectionRequest.save();

      res.json({
        message: req.user.firstName + " is "+ status + " in " + toUser.firstName,
        data,
      });

    }
    catch(err){

        res.status(400).send("Error! "+ err.message);
    }
})



module.exports = requestRouter;