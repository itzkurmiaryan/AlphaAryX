import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    required: function() {
      return !this.image; // Message is required only if there's no image
    },
  },
  image: {
    type: String, // URL or path to the image
  },
  imageName: {
    type: String, // Original filename
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  senderType: {
    type: String,
    enum: ["user", "admin"],
    required: true,
  },
});

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);