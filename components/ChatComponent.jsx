"use client";
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { Send, MessageCircle, Trash2, Image, X } from "lucide-react";

const ChatComponent = ({ userId, isAdmin = false, adminId = null, currentUser, chatWithUser, isAdminView = false }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUserId, setAdminUserId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);
  const fileInputRef = useRef(null);
  const receivedMessageIdsRef = useRef(new Set());

  // Determine the actual user IDs based on props
  const chatUserId = chatWithUser ? chatWithUser._id : userId;
  const isAdminMode = isAdmin || isAdminView;
  const currentUserId = currentUser
    ? currentUser._id
    : isAdminMode
    ? adminId || adminUserId
    : userId;
  const actualCurrentUser = currentUser || {
    _id: currentUserId,
    name: isAdminMode ? "Admin" : "User",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // Fetch admin ID if not provided
    const fetchAdminId = async () => {
      if (!adminId) {
        try {
          const response = await fetch("/api/admin/get-admin-id");
          const data = await response.json();
          if (data.adminId) {
            setAdminUserId(data.adminId);
          }
        } catch (error) {
          console.error("Error fetching admin ID:", error);
        }
      }
    };

    fetchAdminId();
  }, [adminId, isAdminMode]);

  useEffect(() => {
    if (!chatUserId || !currentUserId) return;

    // Initialize socket connection
    const initSocket = async () => {
      try {
        // Initialize socket server
        await fetch("/api/socket");

        const socket = io("/", {
          path: "/api/socket/io",
          transports: ["websocket", "polling"],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
          timeout: 10000,
        });

        // Remove old listeners to prevent duplicates (important for React Strict Mode)
        socket.off("connect");
        socket.off("disconnect");
        socket.off("receiveMessage");
        socket.off("userJoined");
        socket.off("error");
        socket.off("connect_error");

        socket.on("connect", () => {
          console.log("✓ Connected to chat server, socket ID:", socket.id);
          setIsConnected(true);
          
          // Join conversation room with both user IDs
          console.log("Joining conversation with:", { userId: currentUserId, otherUserId: chatUserId });
          socket.emit("joinConversation", {
            userId: currentUserId,
            otherUserId: chatUserId,
          });
        });

        socket.on("disconnect", (reason) => {
          console.log("⚠️ Disconnected from chat server. Reason:", reason);
          setIsConnected(false);
        });

        socket.on("receiveMessage", (message) => {
          console.log("📨 Message received:", message);
          
          // Use a unique key for each message
          const messageKey = message._id ? String(message._id) : `${message.senderId}_${message.timestamp}_${message.message}`;
          
          // Check if we've already processed this message
          if (receivedMessageIdsRef.current.has(messageKey)) {
            console.log("✓ Duplicate message ignored, ID:", messageKey);
            return;
          }
          
          // Mark this message as received
          receivedMessageIdsRef.current.add(messageKey);
          
          // Add to state
          setMessages(prev => [...prev, message]);
        });

        socket.on("userJoined", (data) => {
          console.log("✓ User joined conversation:", data.userId);
        });
        
        socket.on("error", (error) => {
          console.error("❌ Socket error:", error);
        });
        
        socket.on("connect_error", (error) => {
          console.error("❌ Socket connection error:", error);
          setIsConnected(false);
        });

        socketRef.current = socket;
      } catch (error) {
        console.error("Socket initialization error:", error);
        setIsConnected(false);
      }
    };

    initSocket();

    // Load chat history
    loadMessages();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [chatUserId, currentUserId]);

  useEffect(() => {
    console.log("Chat component state updated:", {
      chatUserId,
      currentUserId,
      isConnected,
      messagesCount: messages.length,
      isAdminMode,
    });
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [chatUserId, currentUserId, isConnected, messages.length, isAdminMode, messages]);

  const loadMessages = async () => {
    try {
      // Reset received message IDs when loading new chat
      receivedMessageIdsRef.current.clear();
      
      const response = await fetch(`/api/chat?userId=${chatUserId}${isAdminMode ? "&admin=true" : ""}`);
      const data = await response.json();
      if (data.messages) {
        setMessages(data.messages);
        // Pre-populate received message IDs with existing messages
        data.messages.forEach(msg => {
          const key = msg._id ? String(msg._id) : `${msg.senderId}_${msg.timestamp}_${msg.message}`;
          receivedMessageIdsRef.current.add(key);
        });
      }
    } catch (error) {
      console.error("Error loading messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch("/api/chat", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messageId, userId: currentUserId }),
      });

      if (response.ok) {
        setMessages(prev => prev.filter(msg => msg._id !== messageId));
      } else {
        alert("Failed to delete message");
      }
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Error deleting message");
    }
  };

  const deleteEntireChat = async () => {
    if (!confirm("Are you sure you want to delete the entire chat? This action cannot be undone.")) return;

    try {
      const response = await fetch("/api/chat", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: chatUserId, deleteAll: true }),
      });

      if (response.ok) {
        setMessages([]);
      } else {
        alert("Failed to delete chat");
      }
    } catch (error) {
      console.error("Error deleting chat:", error);
      alert("Error deleting chat");
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadImage = async () => {
    if (!selectedImage) return null;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        return {
          image: data.imageUrl,
          imageName: data.filename
        };
      } else {
        alert(data.error || "Upload failed");
        return null;
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    
    // Comprehensive validation
    if (!newMessage.trim() && !selectedImage) {
      console.warn("Message is empty");
      return;
    }

    if (!socketRef.current) {
      console.error("Socket not initialized");
      alert("Chat connection failed. Please refresh the page.");
      return;
    }

    if (!socketRef.current.connected) {
      console.error("Socket not connected", { connected: socketRef.current.connected });
      alert("Not connected to chat server. Please wait...");
      return;
    }

    if (!currentUserId) {
      console.error("Current user ID not set");
      alert("User identity not loaded. Please refresh.");
      return;
    }

    if (!chatUserId) {
      console.error("Chat user ID not set");
      alert("Chat partner not identified. Please refresh.");
      return;
    }

    console.log("✓ Pre-flight checks passed. Preparing message...", {
      messageText: newMessage.trim().substring(0, 50),
      hasImage: !!selectedImage,
      currentUserId,
      chatUserId,
      isAdminMode,
    });

    setIsUploading(true);

    // Upload image if selected
    let imageData = null;
    if (selectedImage) {
      console.log("Uploading image...");
      imageData = await uploadImage();
      if (!imageData) {
        console.error("Image upload failed");
        setIsUploading(false);
        return;
      }
      console.log("Image uploaded successfully");
    }

    const messageData = {
      message: newMessage.trim() || "",
      senderId: currentUserId,
      senderType: isAdminMode ? "admin" : "user",
      receiverId: chatUserId,
      timestamp: new Date().toISOString(),
      ...(imageData && { image: imageData.image, imageName: imageData.imageName }),
    };

    try {
      console.log("📤 Emitting message via socket...");
      socketRef.current.emit("sendMessage", messageData);
      console.log("✓ Message emitted successfully");
    } catch (error) {
      console.error("❌ Error emitting message:", error);
      alert("Failed to send message: " + error.message);
      setIsUploading(false);
      return;
    }

    // Clean up
    setNewMessage("");
    removeImage();
    setIsUploading(false);
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-slate-400">Loading chat...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col border h-96 bg-slate-900/50 rounded-3xl border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-blue-400" />
          <div>
            <h3 className="font-semibold text-white">
              {isAdminView
                ? `Chat with ${chatWithUser?.name || chatWithUser?.email || "User"}`
                : isAdminMode
                ? "Chat with User"
                : "Chat with Admin"
              }
            </h3>
            <p className="text-xs text-slate-400">
              {isConnected ? "🟢 Connected" : "🔴 Disconnected"}
            </p>
          </div>
        </div>
        {isAdminMode && messages.length > 0 && (
          <button
            onClick={deleteEntireChat}
            className="flex items-center gap-2 px-3 py-1 text-xs text-white transition-colors bg-red-600 rounded-full hover:bg-red-700"
            title="Delete entire chat"
          >
            <Trash2 className="w-3 h-3" />
            Delete Chat
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={message._id ? `msg_${message._id}` : `temp_${index}_${message.timestamp}`}
              className={`flex ${message.senderId === actualCurrentUser._id ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-start gap-2">
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl relative group ${
                    message.senderId === actualCurrentUser._id
                      ? "bg-blue-600 text-white"
                      : "bg-slate-700 text-slate-200"
                  }`}
                >
                  {message.image && (
                    <div className="mb-2">
                      <img
                        src={message.image}
                        alt={message.imageName || "Shared image"}
                        className="h-auto max-w-full transition-opacity rounded-lg cursor-pointer hover:opacity-90"
                        onClick={() => window.open(message.image, '_blank')}
                      />
                      {message.imageName && (
                        <p className="mt-1 text-xs truncate opacity-70">{message.imageName}</p>
                      )}
                    </div>
                  )}
                  {message.message && <p className="text-sm">{message.message}</p>}
                  <p className="mt-1 text-xs opacity-70">
                    {formatTime(message.timestamp)}
                  </p>
                  {/* Delete button - only show for own messages or admin */}
                  {(message.senderId === actualCurrentUser._id || isAdminMode) && (
                    <button
                      onClick={() => deleteMessage(message._id)}
                      className="absolute p-1 transition-opacity bg-red-500 rounded-full opacity-0 -top-2 -right-2 group-hover:opacity-100 hover:bg-red-600"
                      title="Delete message"
                    >
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Image Preview */}
      {imagePreview && (
        <div className="px-4 py-2 border-t border-white/10">
          <div className="relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="border rounded-lg max-w-32 max-h-32 border-white/20"
            />
            <button
              onClick={removeImage}
              className="absolute p-1 transition-colors bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={sendMessage} className="p-4 border-t border-white/10">
        {!isConnected && (
          <div className="px-3 py-2 mb-2 text-xs text-red-400 rounded-lg bg-red-500/10">
            ⚠️ Connecting to chat server... Please wait
          </div>
        )}
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isConnected ? "Type your message..." : "Connecting to chat..."}
            className="flex-1 px-4 py-2 text-white border rounded-full bg-slate-800/50 border-white/10 placeholder-slate-400 focus:outline-none focus:border-blue-500 disabled:opacity-60"
            disabled={!isConnected || isUploading}
          />

          {/* Image Upload Button */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            disabled={!isConnected || isUploading}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={!isConnected || isUploading}
            className="p-2 transition-colors rounded-full bg-slate-600 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title={isConnected ? "Attach image" : "Wait for connection"}
          >
            <Image className="w-4 h-4 text-white" />
          </button>

          <button
            type="submit"
            disabled={(!newMessage.trim() && !selectedImage) || !isConnected || isUploading}
            className="p-2 transition-colors bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            title={!isConnected ? "Waiting for connection..." : "Send message"}
          >
            {isUploading ? (
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin" />
            ) : (
              <Send className="w-4 h-4 text-white" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatComponent;