const express = require("express");
const authRouter = express.Router();
const {validateSignUpData} = require("../utils/validators");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { userAuth } = require("../middlewares/auth");

authRouter.post("/signup", async (req, res)=>{
    try{
    validateSignUpData(req);    

    const {firstName, lastName, email, password} = req.body;
    //password hash is generated using bcrypt
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);
    const user = new User({
        firstName, 
        lastName, 
        email, 
        password: passwordHash,
    });
    await user.save();
    res.status(200).send("User Added Successfully...");
    }catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

authRouter.post("/login", async(req, res)=>{
    try{
    const {email, password} = req.body;
    const user = await User.findOne({email: email});
    if(!user){
        return res.status(401).send("Invalid Credentials");
    }

    //check for password and compare with hash in the db.
    const passwordValid = await user.validatePassword(password); //offloaded from the UserSchema 
    if(passwordValid){

        const token = await user.getJWT(); //offloaded from the UserSchema
        res.cookie("token", token);
        return res.send(user);
    }else{
        return res.status(401).send("Invalid Credentials");
    }}catch(err){
         return res.status(500).send("ERROR : " + err.message);
    }
    });

authRouter.post("/logout", userAuth, (req, res)=>{
    try{
    res.clearCookie("token");
    res.send("Logged Out Successfully.");
}catch(err){
    res.status(401).send("Something Went Wrong...");
}
});

module.exports = authRouter;