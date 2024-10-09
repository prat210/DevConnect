const express = require('express');

const app = express();// creating express instance or server to listen incoming http requests

// this app.get will only handle get call to /users meaning it will return some data from dB

app.use("/users",(req,res)=>{
    res.send("Hahahah I Dominate because im first and i handle all Http methods");
})

app.get("/users", (req, res) => {
    res.send({firstName: "Pratyush", lastName: "Sinha"});
});


app.post("/users", (req, res) =>{
    res.send("Data Saved Successfully in Db");
});

app.delete("/users", (req, res) =>{
    res.send("user deleted successfully");
});


// this app.use will handle all Http methods to /test
app.use("/test",(req,res)=>{
    res.send("hello from munshi");
});




app.listen(3000,()=>{
    console.log('listening on port 3000');
});//server is now listening to requests coming from users on port 3000