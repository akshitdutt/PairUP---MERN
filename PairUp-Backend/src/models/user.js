//Step1: Require Mongoose
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { maxLength } = require("cookieparser");

//Create SCHEMA and this is the structure
const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        maxLength: 20,
        minLength: 3,
        required: true
    }, 
    lastName:{
        type: String
    },
    email:{
        type: String, 
        trim: true,
        lowercase: true,
        required: true, 
        unique: true
    },
    photoURL: {
    type: String,
    trim: true
    },
    age:{
        type: Number,
        min: 18
    }, 
    gender:{
        type: String, 
        //custom validation function.
        validate(value){
            if(!["Male", "Female", "Others"].includes(value)){
                throw new Error("Please put valid Gender.");
                
            }
        }
    },
    about:{
        type: String, 
        maxLength: 300
    },
    skills:{
        type: Array, 
        required: true,
        maxLength: 5
    },
    password:{
        type: String, 
        required: true,
        minLength: 8
    }
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function(){
    const user = this;

    const token = await jwt.sign({_id: user._id}, process.env.JWT_SECRET);
    return token;
}

userSchema.methods.validatePassword = async function(passwordByUser){
    const user = this;
    const passwordHash = this.password;

    const isPassWordValid = await bcrypt.compare(passwordByUser, passwordHash);
    return isPassWordValid;
}

//export the user model
module.exports = mongoose.model("User", userSchema);

//Above is the process of how a schema is created in mongodb using mongoose. 