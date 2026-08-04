const mongoose = require("mongoose");

//always wrap connection in async function. 
const connectDB = async()=>{
    await mongoose.connect(process.env.MONGODB_URL);
     console.log("Connected Database:", mongoose.connection.name);
     const collections = await mongoose.connection.db.listCollections().toArray();
console.log(collections.map(c => c.name));
}

module.exports = connectDB;
