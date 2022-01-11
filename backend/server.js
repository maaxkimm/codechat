const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/ messageRoutes");
const chatRoutes = require("./routes/chatRoutes");

dotenv.config();

connectDB();

const app = express();

//add routes -->

//allows acceptance of JSON data
app.use(express.json());

//callback takes request, response

//add endpoint for user
app.use("/api/user", userRoutes);

app.use("/api/message", messageRoutes);

app.use("/api/chat", chatRoutes);

const PORT = process.env.PORT || 5000;

//start server
const server = app.listen(PORT, console.log(`Server Begin on PORT ${PORT}`));

//from socket.io documentation
const io = require("socket.io")(server, {
  //prevent cross-origin errors
  pingTimeout: 50000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      //once in room, emit/send message
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("User Disconnected");
    socket.leave(userData._id);
  });
});
