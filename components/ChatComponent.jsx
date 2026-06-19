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

  const isAdminMode = isAdmin || isAdminView;
  const resolvedCurrentUserId = currentUser
    ? (currentUser._id || currentUser.id)
    : userId;
  const resolvedAdminId = adminId || adminUserId;
  const chatUserId = chatWithUser
    ? (chatWithUser._id || chatWithUser.id)
    : isAdminMode
    ? userId
    : resolvedAdminId;
  const currentUserId = resolvedCurrentUserId;
  const actualCurrentUser = currentUser
    ? { ...currentUser, _id: resolvedCurrentUserId }
    : {
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

          // Auto-mark incoming messages as read
          if (String(message.receiverId) === String(currentUserId) && socketRef.current?.connected) {
            socketRef.current.emit("markAsRead", {
              messageId: message._id,
              userId: currentUserId,
            });
          }

          // Add to state
          setMessages((prev) => [...prev, message]);
        });

        socket.on("userJoined", (data) => {
          console.log("✓ User joined conversation:", data.userId);
        });

        socket.on("messageRead", ({ messageId, readerId }) => {
          setMessages((prev) =>
            prev.map((msg) =>
              msg._id === messageId ? { ...msg, isRead: true } : msg
            )
          );
        });
        
        socket.on("error", (error) => {
          console.error("❌ Socket error:", error);
        });
        
        socket.on("connect_error", (error) => {
          console.error("❌ Socket connection error:", error);
        });

        socketRef.current = socket;
      } catch (error) {
        console.error("Socket initialization error:", error);
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
  }, [chatUserId, currentUserId, isConnected, messages.length, isAdminMode]);

  useEffect(() => {
    if (!isConnected || messages.length === 0 || !currentUserId) return;

    const unreadIds = messages
      .filter((message) =>
        String(message.receiverId) === String(currentUserId) && !message.isRead
      )
      .map((message) => message._id)
      .filter(Boolean);

    if (unreadIds.length > 0 && socketRef.current?.connected) {
      socketRef.current.emit("markAsRead", {
        messageIds: unreadIds,
        userId: currentUserId,
      });
    }
  }, [messages, isConnected, currentUserId]);

  const loadMessages = async () => {
    try {
      // Reset received message IDs when loading new chat
      receivedMessageIdsRef.current.clear();
      
      const endpoint = isAdminMode
        ? `/api/chat?admin=true&userId=${chatUserId}&currentUserId=${currentUserId}`
        : `/api/chat?currentUserId=${currentUserId}&otherUserId=${chatUserId}`;
      const response = await fetch(endpoint);
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
        body: JSON.stringify({ messageId, deletedById: currentUserId, senderType: isAdminMode ? "admin" : "user" }),
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
        body: JSON.stringify({ deletedById: currentUserId, otherUserId: chatUserId, deleteAll: true }),
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
    <div className="flex flex-col border min-h-[24rem] h-96 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border-emerald-500/30 shadow-lg">
      {/* Header - WhatsApp Style */}
      <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between border-b border-emerald-500/20 bg-gradient-to-r from-emerald-900/30 to-transparent">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-emerald-500/20">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">
              {isAdminView
                ? `${chatWithUser?.name || chatWithUser?.email || "User"}`
                : isAdminMode
                ? "User Support"
                : "Admin Support"
              }
            </h3>
            <p className="text-xs text-emerald-400 font-medium">
              {isConnected ? "● Online" : "● Offline"}
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={deleteEntireChat}
            className="flex items-center gap-2 px-3 py-2 text-xs text-white transition-all bg-red-600 rounded-full hover:bg-red-700 hover:shadow-lg"
            title="Clear chat history"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        )}
      </div>

      {/* Messages - WhatsApp Style */}
      <div className="flex-1 min-h-0 p-3 space-y-1 overflow-y-auto bg-opacity-50">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto text-emerald-500/30 mb-2" />
              <p className="text-slate-400 text-sm">No messages yet. Start the conversation!</p>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((message, index) => {
              const isOwnMessage = String(message.senderId) === String(actualCurrentUser._id);
              const showTimestamp = index === 0 || 
                new Date(messages[index - 1]?.timestamp).toDateString() !== 
                new Date(message.timestamp).toDateString();
              
              return (
                <div key={message._id ? `msg_${message._id}` : `temp_${index}_${message.timestamp}`}>
                  {showTimestamp && (
                    <div className="flex justify-center my-2">
                      <span className="text-[10px] text-slate-500 px-3 py-1 rounded-full bg-slate-800/50">
                        {new Date(message.timestamp).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  <div className={`flex ${isOwnMessage ? "justify-end" : "justify-start"} mb-1 group`}>
                    <div className="flex items-end gap-1">
                      <div
                        className={`max-w-xs px-3 py-2 rounded-2xl relative transition-all ${
                          isOwnMessage
                            ? "bg-emerald-600 text-white rounded-br-none shadow-md hover:bg-emerald-700"
                            : "bg-slate-700 text-slate-100 rounded-bl-none shadow-md hover:bg-slate-600"
                        }`}
                      >
                        {message.image && (
                          <div className="mb-2 max-w-full">
                            <img
                              src={message.image}
                              alt={message.imageName || "Shared image"}
                              className="h-auto max-w-xs transition-opacity rounded-lg cursor-pointer hover:opacity-90"
                              onClick={() => window.open(message.image, '_blank')}
                            />
                            {message.imageName && (
                              <p className="mt-1 text-xs truncate opacity-70">{message.imageName}</p>
                            )}
                          </div>
                        )}
                        {message.message && (
                          <p className="text-sm leading-relaxed break-words">{message.message}</p>
                        )}
                        <div className="mt-1 flex items-center justify-end gap-2 text-[11px] opacity-70">
                          <span className="whitespace-nowrap">{formatTime(message.timestamp)}</span>
                          {isOwnMessage && (
                            <span className="flex gap-px text-emerald-200">
                              {message.isRead ? (
                                <>
                                  <span>✓</span>
                                  <span>✓</span>
                                </>
                              ) : (
                                <span>✓</span>
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                      {/* Delete button - hover to show */}
                      {(isOwnMessage || isAdminMode) && (
                        <button
                          onClick={() => deleteMessage(message._id)}
                          className="p-1.5 transition-all opacity-0 group-hover:opacity-100 bg-red-500 hover:bg-red-600 rounded-full shadow-lg"
                          title="Delete message"
                        >
                          <Trash2 className="w-3 h-3 text-white" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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

      {/* Input - WhatsApp Style */}
      <form onSubmit={sendMessage} className="p-3 border-t border-emerald-500/20 bg-gradient-to-t from-slate-950 to-transparent">
        {!isConnected && (
          <div className="px-3 py-2 mb-2 text-xs text-amber-400 rounded-lg bg-amber-500/10 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            Connecting to chat server...
          </div>
        )}
        <div className="flex items-end gap-2">
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
            className="p-2 transition-all rounded-full bg-slate-700 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
            title={isConnected ? "Attach image" : "Wait for connection"}
          >
            <Image className="w-4 h-4 text-white" />
          </button>

          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder={isConnected ? "Aa" : "Connecting..."}
            className="flex-1 px-4 py-2 text-white border rounded-full bg-slate-800 border-emerald-500/30 placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500/20 disabled:opacity-60 transition-all"
            disabled={!isConnected || isUploading}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage(e)}
          />

          <button
            type="submit"
            disabled={(!newMessage.trim() && !selectedImage) || !isConnected || isUploading}
            className="p-2 transition-all bg-emerald-600 rounded-full hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
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