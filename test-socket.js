const io = require("socket.io-client");

const adminId = "69e4b4ddfe2d6d0a0d4c0508"; // Actual admin ID from database
const userId = "69db8ae6a646867ad4f22c16";  // Actual user ID from database

// Admin socket
const adminSocket = io("http://localhost:3000", {
  path: "/api/socket/io",
  transports: ["websocket", "polling"],
});

// User socket
const userSocket = io("http://localhost:3000", {
  path: "/api/socket/io",
  transports: ["websocket", "polling"],
});

let adminConnected = false;
let userConnected = false;
let messagesReceived = 0;

adminSocket.on("connect", () => {
  console.log("✓ Admin connected with socket ID:", adminSocket.id);
  adminConnected = true;
  
  // Admin joins conversation
  adminSocket.emit("joinConversation", {
    userId: adminId,
    otherUserId: userId,
  });
  console.log("→ Admin joining conversation room");
});

userSocket.on("connect", () => {
  console.log("✓ User connected with socket ID:", userSocket.id);
  userConnected = true;
  
  // User joins conversation
  userSocket.emit("joinConversation", {
    userId: userId,
    otherUserId: adminId,
  });
  console.log("→ User joining conversation room");
});

adminSocket.on("receiveMessage", (message) => {
  console.log("\n📨 Admin received message:");
  console.log("  From:", message.senderType);
  console.log("  Text:", message.message);
  console.log("  Sender:", message.senderId);
  messagesReceived++;
});

userSocket.on("receiveMessage", (message) => {
  console.log("\n📨 User received message:");
  console.log("  From:", message.senderType);
  console.log("  Text:", message.message);
  console.log("  Sender:", message.senderId);
  messagesReceived++;
});

adminSocket.on("userJoined", (data) => {
  console.log("→ User joined:", data.userId);
});

userSocket.on("userJoined", (data) => {
  console.log("→ Other user joined:", data.userId);
});

// Wait for connections and then test
setTimeout(() => {
  if (!adminConnected || !userConnected) {
    console.log("\n❌ Connection failed. Admin connected:", adminConnected, "User connected:", userConnected);
    process.exit(1);
  }
  
  console.log("\n--- Testing message flow ---\n");
  
  // Admin sends message to user
  console.log("1️⃣  Admin sending message to user...");
  adminSocket.emit("sendMessage", {
    senderId: adminId,
    receiverId: userId,
    message: "Hello from admin! 👋",
    senderType: "admin",
    timestamp: new Date().toISOString(),
  });
  
  // User sends message to admin
  setTimeout(() => {
    console.log("\n2️⃣  User sending message to admin...");
    userSocket.emit("sendMessage", {
      senderId: userId,
      receiverId: adminId,
      message: "Hello from user! 👋",
      senderType: "user",
      timestamp: new Date().toISOString(),
    });
  }, 1000);
  
  // Check results
  setTimeout(() => {
    console.log("\n--- Results ---");
    console.log("Total messages received:", messagesReceived);
    console.log(messagesReceived === 4 ? "✅ SUCCESS: Real-time chat is fully working!" : "❌ FAILED: Expected 4 messages");
    
    adminSocket.disconnect();
    userSocket.disconnect();
    process.exit(messagesReceived === 4 ? 0 : 1);
  }, 3000);
}, 2000);

adminSocket.on("disconnect", () => {
  console.log("Admin disconnected");
});

userSocket.on("disconnect", () => {
  console.log("User disconnected");
});

adminSocket.on("error", (error) => {
  console.error("Admin socket error:", error);
});

userSocket.on("error", (error) => {
  console.error("User socket error:", error);
});
