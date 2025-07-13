import { Server } from "socket.io";
import http from "http";
import express from "express";
import { env } from "../config/env.config";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: [env.ORIGIN_URL],
    credentials: true,
  },
});

export function getReceiverSocketId(userId : string){
  return userSocketMap[userId];
}

//for online users
const userSocketMap : Record<string, string> = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId as string | undefined;
  if(userId){
    userSocketMap[userId] = socket.id;
  }

  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId as string];
    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };