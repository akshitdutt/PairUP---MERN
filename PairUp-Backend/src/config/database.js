const mongoose = require("mongoose");

//always wrap connection in async function. 
const connectDB = async()=>{
    await mongoose.connect("mongodb+srv://akdutt:neBuLA8891@pairup.4hjiklk.mongodb.net/pairUp");
}

module.exports = connectDB;
