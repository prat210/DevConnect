const express = require('express');

const connectDb = require("./config/database");
const app = express();// creating express instance or server to listen incoming http requests



const cookieParser = require('cookie-parser');

const User = require("./models/user");


app.use(express.json());

app.use(cookieParser());


const authRouter = require("./Routes/auth")

const profileRouter = require("./Routes/profile")

const requestRouter = require("./Routes/requests")


app.use("/", authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);


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
