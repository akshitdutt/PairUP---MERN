const socket = require("socket.io");

const initializeSocket = (server) =>{
    const io = socket(server, {
  cors:{
    origin: true,
  },
});

io.on("connection", (socket) => {
  //handle events
  socket.on("joinChat", ({userId, targetID})=>{
    const roomID = [userId, targetID].sort().join("_");
    console.log("Room Joined:" + roomID);
    socket.join(roomID);
  });

  socket.on("sendMessage", ({ userId, targetID, text }) => {
    const roomID = [userId, targetID].sort().join("_");

    io.to(roomID).emit("messageReceived", {
        text,
        senderId: userId
    });
    });

  socket.on("disconnect", ()=>{});
})
}

module.exports = initializeSocket;