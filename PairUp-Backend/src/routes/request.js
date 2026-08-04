const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const { Connection } = require("mongoose");
const User = require("../models/user");
const connectionRequest = require("../models/connectionRequest");

console.log("request.js loaded");

requestRouter.post("/request/send/:status/:toUserID", userAuth, async (req, res)=>{
    try{
        const fromUserID = req.user._id;
        const toUserID = req.params.toUserID;
        const status = req.params.status;

        //validation to only allow interested and ignored as status type in the API.
        const allowedStatus = ["interested", "ignored"];
        if(!allowedStatus.includes(status)){
            res.json({
                message: "Invalid Status Type."
            })
        }

        //validation to ensure the request is sent only once..
        const existingRequest = await ConnectionRequest.findOne({
            $or:[
                {fromUserID, toUserID}, 
                {fromUserID: toUserID, toUserID: fromUserID},
            ],
        });

        if(existingRequest){
            res.json({
                message: "Connection Request Already Exist."
            })
        }

        //validation to prevent request to user not in database. 
        const idExist = await User.findOne({_id: toUserID});
        if(!idExist){
            res.status(404).json({
                message:"User Doesn't Exist.",
            });
        }

        const connectionRequest = await new ConnectionRequest({
            fromUserID, 
            toUserID, 
            status,
    });

    const data = await connectionRequest.save();

    res.json({
        message: "Connection Request Has Been Sent...", 
        data,
        }
    )

    }catch(err){
        res.status(400).send("Error: " +err.message);
    }
});

requestRouter.post("/request/review/:status/:requestID", userAuth, async (req, res)=>{
    try{
    const loggedInUser = req.user;
    const { status, requestID} = req.params;
    
    const allowedStatus = ["accepted","rejected"];
    if(!allowedStatus.includes(status)){
        return res.status(400).send("Status Invalid.");
    }

    const ConnectionRequest = await connectionRequest.findOne({
        _id: requestID,
        toUserID: loggedInUser._id,
        status: "interested",
    });
    if(!ConnectionRequest){
        return res.status(404).send("Connection Request doesn't exist.");
    };

    ConnectionRequest.status = status;
    await ConnectionRequest.save();

    res.json({
        message:"Connect Request "+status
    });

}catch(err){
    res.status(500).send("Error: " +err.message);
}
})

module.exports = requestRouter;
