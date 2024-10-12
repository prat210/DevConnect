const express = require('express');

const app = express();// creating express instance or server to listen incoming http requests
const {adminAuth, UserAuth} = require("./middlewares/auth");

// this app.get will only handle get call to /users meaning it will return some data from dB

// app.use("/users",(req,res)=>{
//     res.send("Hahahah I Dominate because im first and i handle all Http methods");
// })

app.use("/admin",adminAuth);

app.post("/user/login",(req,res)=>{
    res.send("User logged in successfully");
}
)

app.get("/user/data",UserAuth,(req,res)=>{
    res.send("give data to user");
} );
// next();



app.get("/admin/getAllData", (req, res,next)=>{
    res.send("Response gotten");

}


);



// this app.use will handle all Http methods to /test




app.listen(3000,()=>{
    console.log('listening on port 3000');
});//server is now listening to requests coming from users on port 3000