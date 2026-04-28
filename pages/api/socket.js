import { initSocket } from "@/lib/socket";

export default function handler(req, res) {
  if (!res.socket.server.io) {
    console.log("Initializing Socket.IO server...");
    const io = initSocket(res.socket.server);
    res.socket.server.io = io;
  }
  res.end();
}