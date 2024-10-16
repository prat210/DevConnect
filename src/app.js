const express = require('express');

const connectDb = require("./config/database");
const app = express();// creating express instance or server to listen incoming http requests

const User = require("./models/user");

app.use(express.json());


// add a user to db
app.post("/signup", async (req, res)=>{

    const user = new User(req.body);
try{
    await user.save();
  res.send("User Added Successfully!");
}
catch(err){
  res.status(400).send("Error saving the user: " + err.message);

}
});

//get a single user from db
app.get("/user", async (req, res)=>{
    
    const userEmail = req.body.emailId;

    try{

        const user = await User.findOne({ emailId: userEmail });
        if (!user){
            res.status(404).send("User Not Found");
        }
        res.send(user);

    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
}
)

//get all users from db
app.get("/feed", async (req,res)=>{
    try{

        const user = await User.find({});
        if (user.length===0){
            res.status(404).send("User Not Found");
        }
        res.send(user);

    }
    catch(err){
        res.status(400).send("Something went wrong");
    }
})

//delete a user from db
app.delete("/user", async(req,res)=>{
    const userId = req.body.userId;

    try{
     
        const user = await User.findByIdAndDelete(userId);

        res.send("User Deleted")
    }
    catch(err){
        res.status(400).send("Something went wrong");

    }
})

app.patch("/user/:userId", async(req,res)=>{

    const userId = req.params?.userId;
        const data = req.body

    try {

        const Allowed = ["about","firstName","gender","skills"]

    const isupdateAllowed = Object.keys(data).every((K)=>
        Allowed.includes(K)
    );

    if (!isupdateAllowed){
        throw new Error("Update is not allowed");
    }

        await User.findByIdAndUpdate(userId,data,{
        runValidators:true,});
        // console.log(user);
        res.send("Data Updated")
    }
catch(err){
       res.status(400).send("something went wrong"+ err.message);
}

})

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
