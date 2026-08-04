const jwt = require("jsonwebtoken");
const User = require("../models/user");

//middleware to auhenticate the USER for every API request
const userAuth = async (req, res, next)=>{
    try{
    const {token} = req.cookies;
    if(!token){
        throw new Error("Session Expired! Please Login Again.");
    }
    const decodedObj = await jwt.verify(token, process.env.JWT_SECRET);
    const {_id} = decodedObj;
    const user = await User.findById(_id);
    if(!user){
        throw new Error("User not found.");
    }
    req.user = user;
    next(); 
    }catch(err){
        res.status(404).send("Error: " + err.message);
    }
};

    
module.exports = {
    userAuth,
};