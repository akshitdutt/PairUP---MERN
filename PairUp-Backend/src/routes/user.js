const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");


userRouter.get("/user/requests/received", userAuth, async (req, res)=>{
    try{
        const loggedUser = req.user;

        const connectionRequests = await connectionRequest.find({
            toUserID: loggedUser._id, 
            status: "interested",
        }).populate("fromUserID", ["firstName", "lastName", "photoURL", "gender", "age"]);

        res.json({
            message: "Available Connection Requests.", 
            data: connectionRequests,
        });

    }catch(err){
        res.status(404).send("ERROR: "+err.message);
    }
})

userRouter.get("/user/connections", userAuth, async(req, res)=>{
    try{
        const loggedInUser = req.user;
        const availableConnections = await connectionRequest.find({
            $or:[
                {toUserID: loggedInUser._id, status:"accepted"}, 
                {fromUserID: loggedInUser._id, status:"accepted"}
            ]
        }).populate("fromUserID", ["firstName", "lastName", "age", "about", "photoURL", "gender", "skills"]).populate("toUserID", 
    ["firstName",
    "lastName",
    "age",
    "about",
    "photoURL",
    "gender",
    "skills"]);

        const data = availableConnections.map((row)=>{
            if(row.fromUserID._id.toString()===loggedInUser._id.toString()){
                return row.toUserID;
            }
            return row.fromUserID;
        });
        res.json({data});
    }catch(err){
        res.send("Error: "+err.message);   
    }
})

userRouter.get("/feed", userAuth, async(req, res)=>{
    try{
        //pagination concept
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 20;
    limit = limit > 30 ? 30 : limit;
    const skip = (page-1)*limit; 

    const loggedInUser = req.user;

    const connectionRequests = await connectionRequest.find({
        $or:[
            {toUserID: loggedInUser._id}, {fromUserID: loggedInUser._id}
        ]
    });

    const hiddenUsers = new Set();
    connectionRequests.forEach((req)=>{
        hiddenUsers.add(req.toUserID.toString());
        hiddenUsers.add(req.fromUserID.toString());
    })

    const users = await User.find({
        $and: [
            {_id: {$nin: Array.from(hiddenUsers)}}, 
            {_id: {$ne: loggedInUser._id}}
        ],
    }).select("firstName lastName photoURL age gender about skills").skip(skip).limit(limit);

    res.send(users);

    }catch(err){
        res.status(400).send("ERROR: "+err.message);
    }
})
module.exports = userRouter;