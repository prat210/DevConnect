const express = require('express');

const app = express();// creating express instance or server to listen incoming http requests


app.use("/git",(req,res)=>{
    res.send("hello ind");
});


app.use("/test",(req,res)=>{
    res.send("hello from munshi");
});

app.listen(3000,()=>{
    console.log('listening on port 3000');
});//server is now listening to requests coming from users on port 3000