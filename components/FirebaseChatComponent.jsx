"use client";
import { useState, useEffect, useRef } from "react";
import { database, ref, onValue, push, set, update, get } from "@/lib/firebase";
import { Send, MessageCircle, Trash2, Image, X, Wifi, WifiOff, Check, CheckCheck, Phone, Mail, User, Edit3, Save, X as CloseIcon } from "lucide-react";

const FirebaseChatComponent = ({ userId, isAdmin = false, adminId = null, currentUser, chatWithUser, isAdminView = false }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminUserId, setAdminUserId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [lastSeen, setLastSeen] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

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

    // Create a unique conversation ID (sorted to ensure consistency)
    const conversationId = [currentUserId, chatUserId].sort().join('_');
    const conversationRef = ref(database, `conversations/${conversationId}/messages`);
    const onlineRef = ref(database, `users/${chatUserId}/online`);
    const lastSeenRef = ref(database, `users/${chatUserId}/lastSeen`);

    console.log("Setting up Firebase chat for conversation:", conversationId);

    // Listen for messages in real-time
    const unsubscribeMessages = onValue(conversationRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.entries(data).map(([key, value]) => ({
          id: key,
          ...value
        })).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setMessages(messagesArray);
        setIsConnected(true);
        setIsLoading(false);
      } else {
        setMessages([]);
        setIsConnected(true);
        setIsLoading(false);
      }
    }, (error) => {
      console.error("Firebase error:", error);
      setIsConnected(false);
      setIsLoading(false);
    });

    // Listen for online status
    const unsubscribeOnline = onValue(onlineRef, (snapshot) => {
      setOnlineStatus(snapshot.val() === true);
    });

    // Listen for last seen
    const unsubscribeLastSeen = onValue(lastSeenRef, (snapshot) => {
      const lastSeenTime = snapshot.val();
      if (lastSeenTime) {
        setLastSeen(new Date(lastSeenTime));
      }
    });

    // Set current user as online
    const currentUserOnlineRef = ref(database, `users/${currentUserId}`);
    set(currentUserOnlineRef, {
      online: true,
      lastSeen: new Date().toISOString()
    });

    return () => {
      unsubscribeMessages();
      unsubscribeOnline();
      unsubscribeLastSeen();
      // Set offline when leaving
      update(currentUserOnlineRef, {
        online: false,
        lastSeen: new Date().toISOString()
      });
    };
  }, [chatUserId, currentUserId]);

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      const conversationId = [currentUserId, chatUserId].sort().join('_');
      const typingRef = ref(database, `conversations/${conversationId}/typing/${currentUserId}`);
      set(typingRef, true);

      // Clear typing after 3 seconds
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      typingTimeoutRef.current = setTimeout(() => {
        set(typingRef, false);
        setIsTyping(false);
      }, 3000);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      const conversationId = [currentUserId, chatUserId].sort().join('_');
      const messageRef = ref(database, `conversations/${conversationId}/messages/${messageId}`);

      await set(messageRef, null); // Delete from Firebase
      console.log("Message deleted successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
      alert("Error deleting message");
    }
  };

  const deleteEntireChat = async () => {
    if (!confirm("Are you sure you want to delete the entire chat? This action cannot be undone.")) return;

    try {
      const conversationId = [currentUserId, chatUserId].sort().join('_');
      const conversationRef = ref(database, `conversations/${conversationId}`);

      await set(conversationRef, null); // Delete entire conversation
      setMessages([]);
      console.log("Chat deleted successfully");
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

    if (!newMessage.trim() && !selectedImage) {
      console.warn("Message is empty");
      return;
    }

    if (!currentUserId || !chatUserId) {
      alert("Chat setup incomplete. Please refresh.");
      return;
    }

    setIsUploading(true);

    // Upload image if selected
    let imageData = null;
    if (selectedImage) {
      console.log("Uploading image...");
      imageData = await uploadImage();
      if (!imageData) {
        setIsUploading(false);
        return;
      }
    }

    try {
      const conversationId = [currentUserId, chatUserId].sort().join('_');
      const messagesRef = ref(database, `conversations/${conversationId}/messages`);
      const newMessageRef = push(messagesRef);

      const messageData = {
        message: newMessage.trim() || "",
        senderId: currentUserId,
        senderType: isAdminMode ? "admin" : "user",
        receiverId: chatUserId,
        timestamp: new Date().toISOString(),
        status: "sent",
        ...(imageData && { image: imageData.image, imageName: imageData.imageName }),
      };

      await set(newMessageRef, messageData);

      // Clear typing indicator
      const typingRef = ref(database, `conversations/${conversationId}/typing/${currentUserId}`);
      set(typingRef, false);
      setIsTyping(false);

      console.log("Message sent successfully via Firebase");

      // Clean up
      setNewMessage("");
      removeImage();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message: " + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) { // Less than 1 minute
      return "now";
    } else if (diff < 3600000) { // Less than 1 hour
      return `${Math.floor(diff / 60000)}m ago`;
    } else if (diff < 86400000) { // Less than 1 day
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString();
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-slate-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-slate-400" />;
      case "read":
        return <CheckCheck className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-sm">Loading chat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10 rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {chatWithUser?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>
            {onlineStatus && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
            )}
          </div>
          <div>
            <h3 className="font-semibold text-white">
              {isAdminView
                ? chatWithUser?.name || "User"
                : isAdminMode
                ? "Chat with User"
                : "Chat with Admin"
              }
            </h3>
            <p className="text-xs text-slate-400">
              {onlineStatus ? (
                <span className="text-green-400 flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  Online
                </span>
              ) : lastSeen ? (
                <span>Last seen {formatTime(lastSeen)}</span>
              ) : (
                "Offline"
              )}
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
      <div className="flex-1 p-4 space-y-2 overflow-y-auto bg-slate-900/30">
        {!isConnected && (
          <div className="p-3 text-sm text-yellow-400 border border-yellow-500/30 bg-yellow-500/10 rounded-lg">
            ⚠️ Realtime connection lost. Messages may not update automatically.
          </div>
        )}
        {messages.length === 0 ? (
          <div className="py-8 text-center text-slate-400">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.senderId === actualCurrentUser._id ? "justify-end" : "justify-start"}`}
            >
              <div className="flex items-start gap-2 max-w-[80%]">
                <div
                  className={`px-4 py-3 rounded-2xl relative group max-w-full break-words ${
                    message.senderId === actualCurrentUser._id
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-12"
                      : "bg-slate-700/80 text-slate-200 mr-12 border border-white/10"
                  }`}
                >
                  {message.image && (
                    <div className="mb-3">
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
                  {message.message && <p className="text-sm leading-relaxed">{message.message}</p>}
                  <div className={`flex items-center justify-end gap-1 mt-2 text-xs ${
                    message.senderId === actualCurrentUser._id ? "text-blue-200" : "text-slate-400"
                  }`}>
                    <span>{formatTime(message.timestamp)}</span>
                    {message.senderId === actualCurrentUser._id && getStatusIcon(message.status)}
                  </div>
                  {/* Delete button - only show for own messages or admin */}
                  {(message.senderId === actualCurrentUser._id || isAdminMode) && (
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="absolute top-2 right-2 p-1 text-xs text-red-400 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-300"
                      title="Delete message"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-white/10 bg-slate-900/50">
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-3 relative inline-block">
            <img
              src={imagePreview}
              alt="Preview"
              className="h-20 w-20 object-cover rounded-lg border border-white/20"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        )}

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-slate-800/80 border border-white/10 rounded-2xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
            disabled={isUploading}
          />

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageSelect}
            accept="image/*"
            className="hidden"
          />

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-slate-400 hover:text-indigo-400 transition-colors bg-slate-800/80 border border-white/10 rounded-2xl hover:bg-slate-700/80"
            disabled={isUploading}
            title="Attach image"
          >
            <Image className="w-5 h-5" />
          </button>

          <button
            type="submit"
            disabled={isUploading || (!newMessage.trim() && !selectedImage)}
            className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-2xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/25 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isUploading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FirebaseChatComponent;