const mongoose = require("mongoose");

//creating connection request schema
const connectionRequestSchema = new mongoose.Schema({

    fromUserID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    }, 
    toUserID:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true,
    }, 
    status:{
        type: String, 
        required: true, 
        enum:{
            values:["accepted", "rejected", "ignored", "interested"],
            message:'{VALUE} is not valid.'
        },
    },
},
{ timestamps : true}
);


//schema.pre is a schema method which acts as a middleware 
connectionRequestSchema.pre("save", async function(){
    const connectionRequest = this;
    if(connectionRequest.fromUserID.equals(connectionRequest.toUserID)){
        res.status(404).json({
            message:"Request cannot be sent to Yourself!",
        })
    }
})

module.exports = new mongoose.model("connectionRequest", connectionRequestSchema);