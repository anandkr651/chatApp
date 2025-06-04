import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

//realtime message code goes here
export const getReciverSocketId = (reciverId) => {
  //message.controllers.jsx call
  return users[reciverId];
};

const users = {};

// used to listen events on server side.
io.on("connection", (socket) => {
  // console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId; //query.userId comes from provider/globalProvider.js

  // this place const wala userId hai
  if (userId) {
    //userId mi mongodb ka user._id hai
    users[userId] = socket.id;
    // console.log("online User", users);

    //used to send the events to all connected user. it is used for broadcasting
    io.emit("getOnlineUser", Object.keys(users)); //go to the globalProvider.jsx
  }

  // used to listen client side events emitted by server side (server & client)
  socket.on("disconnect", () => {
    // console.log("a user disconnected", socket.id);

    delete users[userId];
    io.emit("getOnlineUser", Object.keys(users));
  });
});

export { app, io, server };
