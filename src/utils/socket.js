const socket = require("socket.io");

const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ firstName, userId, targetUserId }) => {
      const roomId = [userId, targetUserId].sort().join("_"); // this is the Unique id for clearing the room. we sort so that the id is same for the sender and receiver.
      console.log(firstName + " Joining Room: " + roomId);

      socket.join(roomId);
    });

    socket.on("sendMessage", ({ firstName, userId, targetUserId, text }) => {
      const roomId = [userId, targetUserId].sort().join("_");
      console.log(firstName +" "+ text)
      io.to(roomId).emit("messageReceived",{firstName,text}) // send to the specific room.
          
    });

    socket.on("disconnect", () => {});
  });
};

module.exports = initializeSocket;
