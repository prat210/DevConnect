const express = require('express');

const app = express();// creating express instance or server to listen incoming http requests

// this app.get will only handle get call to /users meaning it will return some data from dB

// app.use("/users",(req,res)=>{
//     res.send("Hahahah I Dominate because im first and i handle all Http methods");
// })



app.use("/users", [(req, res,next)=>{
    console.log("Handling the route user1!!");
    next();
    // res.send("Response");
    
},
(req,res,next)=>{
    console.log("Handling the route user 2!!");
    // res.send("2nd response");
    next();
}],
(req,res,next)=>{
    console.log("Handling the route user 3!!");
    // res.send("2nd response");
    next();
},
(req,res,next)=>{
    console.log("Handling the route user 4!!");
    // res.send("2nd response");
    res.send("4th Response")
}

);



// this app.use will handle all Http methods to /test




app.listen(3000,()=>{
    console.log('listening on port 3000');
});//server is now listening to requests coming from users on port 3000