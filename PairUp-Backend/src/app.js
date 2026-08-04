require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser=  require("cookie-parser");
const cors = require("cors");


app.use(cors({
    origin: process.env.CORS_ORIGIN, 
    credentials: true,
}    
));

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use(authRouter);
app.use(profileRouter);
app.use(requestRouter);
app.use("/", userRouter);



connectDB().then(() =>{
    console.log("Database Connection Estabished...");
    app.listen(process.env.PORT, ()=>{
    console.log("The Server is successfully listening.");
});
}).catch((err)=>{
    console.log("Connection to Database Couldn't be Established.");
    console.log(err);
})



//install nodemon to automatically start and close the server. Not necessary to close and start server after every change.
 
