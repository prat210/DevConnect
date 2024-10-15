const mongoose = require('mongoose');


const connectDb = async ()=>{

   await  mongoose.connect(
        "mongodb+srv://Prat:HeyME3421@cluster0.hdrfm.mongodb.net/DevConnection");

   }

module.exports = connectDb;

