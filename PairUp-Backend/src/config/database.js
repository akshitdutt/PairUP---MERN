const mongoose = require("mongoose");

//always wrap connection in async function. 
const connectDB = async()=>{
    await mongoose.connect(process.env.MONGODB_URL);
}

module.exports = connectDB;
