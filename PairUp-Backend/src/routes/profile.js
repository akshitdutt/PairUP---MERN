const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const {validateProfileData, validateNewPassword} = require("../utils/validators");
const bcrypt =  require("bcrypt");
const User = require("../models/user");

profileRouter.get("/profile/view", userAuth, async (req, res)=>{
    try{
    const user = req.user;
    res.send(user);

    }catch(err){
        res.send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res)=>{
    try{
    validateProfileData(req);

    loggedInUser = req.user;

    Object.keys(req.body).forEach((field) =>{
    loggedInUser[field] = req.body[field];

    });

   await loggedInUser.save();
    
   res.send(loggedInUser);

   }catch(err){
    res.status(400).send(err.message);
}
});


profileRouter.patch("/profile/password/reset", userAuth, async (req, res)=>{
    try{
    validateNewPassword(req);
    const user = req.user;
    const {currentPassword, newPassword} = req.body;
    const isPasswordValid = await user.validatePassword(currentPassword);
    const isSamePassword = await user.validatePassword(newPassword);
    if(isSamePassword){
        throw new Error("New Password cannot be same as the Current Password.");
    }
    if(!isPasswordValid){
         return res.status(400).send("Current password is incorrect.");
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
        user.password = passwordHash;
        await user.save();
        res.send("Password Updated Successfully.");
}catch(err){
     res.send("ERROR : " + err.message);
}
});

module.exports = profileRouter;
