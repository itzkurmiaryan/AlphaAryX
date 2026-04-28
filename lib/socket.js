import { Server as NetServer } from "http";
import { NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";
import { connectDB } from "@/lib/db";
import Message from "@/models/Message";

let io;

export const initSocket = (httpServer) => {
  if (io) return io; // Return existing instance

  io = new ServerIO(httpServer, {
    path: "/api/socket/io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
    transports: ['websocket', 'polling'],
  });

  // Connect to database
  connectDB();

  // Store online users
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    let currentRoom = null;
    let currentUserId = null;

    // User joins conversation room
    socket.on("joinConversation", (data) => {
      try {
        const { userId, otherUserId } = data;
        currentUserId = userId;
        
        // Create unique room ID for this conversation (sorted so it's same for both)
        const roomId = [userId, otherUserId].sort().join("_");
        currentRoom = roomId;
        
        socket.join(roomId);
        onlineUsers.set(userId, socket.id);
        
        console.log(`User ${userId} joined conversation room ${roomId}`);
        
        // Notify others in the room that someone joined
        io.to(roomId).emit("userJoined", { userId });
      } catch (error) {
        console.error("Error joining conversation:", error);
        socket.emit("error", { message: "Failed to join conversation" });
      }
    });

    // Handle sending messages
    socket.on("sendMessage", async (data) => {
      try {
        const { senderId, receiverId, message, senderType, image, imageName } = data;
        
        console.log(`Sending message from ${senderId} to ${receiverId} in room ${currentRoom}`);

        // Save message to database
        const newMessage = new Message({
          senderId,
          receiverId,
          message,
          senderType,
          ...(image && { image, imageName }),
        });

        await newMessage.save();

        const messagePayload = {
          _id: newMessage._id,
          senderId,
          receiverId,
          message,
          image,
          imageName,
          timestamp: newMessage.timestamp,
          senderType,
          isRead: false,
        };

        // Emit to the entire conversation room (both users will receive it)
        if (currentRoom) {
          console.log(`Broadcasting message to room ${currentRoom}`);
          io.to(currentRoom).emit("receiveMessage", messagePayload);
        } else {
          console.warn("No current room set, using fallback delivery");
          // Fallback: emit to both users
          io.to(receiverId).emit("receiveMessage", messagePayload);
          io.to(senderId).emit("receiveMessage", messagePayload);
        }

      } catch (error) {
        console.error("Error sending message:", error);
        socket.emit("error", { message: "Failed to send message" });
      }
    });

    // Handle message read
    socket.on("markAsRead", async (data) => {
      try {
        const { messageId, userId } = data;
        await Message.findByIdAndUpdate(messageId, { isRead: true });
        // Notify sender that message was read
        socket.emit("messageRead", { messageId });
      } catch (error) {
        console.error("Error marking message as read:", error);
      }
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      // Remove from online users
      for (const [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      console.log("User disconnected:", socket.id);
    });
  });

  return io;
};