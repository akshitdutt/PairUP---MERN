//require validator library to validate email and passwords. 
const validator = require("validator");

//validateSignUp function
const validateSignUpData = (req) =>{
const{firstName, lastName, email, password} = req.body;
if(!firstName){
    throw new Error("Please Enter First Name");
} else if (!validator.isEmail(email)) {
    throw new Error("Please Enter a Valid Email Address.");
} else if (!validator.isStrongPassword(password)) {
    throw new Error("Please Enter a Strong Password.");
}
}

const validateProfileData = (req) =>{
    const allowedFields = [
        "firstName", 
        "lastName", 
        "age",
        "gender", 
        "about", 
        "skills", 
        "photoURL"
    ];

    const isEditAllowed = Object.keys(req.body).every((field) =>allowedFields.includes(field));
    if(!isEditAllowed){
        throw new Error("Invalid Edit Request");
    }
}

const validateNewPassword = (req) =>{
    const {newPassword, currentPassword} = req.body;
    if(!newPassword){
        throw new Error("Please Enter New Password.");
    }else if(!currentPassword){
        throw new Error("Please Enter Current Password.");
    }else if(currentPassword.length<8 || newPassword.length<8){
        throw new Error("Password Length Must Exceed 8 Characters.");
    }
}

module.exports = {
    validateSignUpData,
    validateProfileData, 
    validateNewPassword
}