const express = require('express');

const connectDb = require("./config/database");
const app = express();// creating express instance or server to listen incoming http requests

const User = require("./models/user");

app.use(express.json());


app.post("/signup", async (req, res)=>{

    const user = new User(req.body);
try{
    await user.save();
  res.send("User Added Successfully!");
}
catch(err){
  await user.save();
  res.send("User Added Successfully!");
    

}
});


connectDb()
.then(()=>{
    console.log("Database connection established");
    
    app.listen(3000,()=>{
        console.log('listening on port 3000');
    });//server is now listening to requests coming from users on port 3000


})
.catch(err=>{
    console.error("Database connection cannot be established")
})
