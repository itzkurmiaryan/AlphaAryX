import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import User from "@/models/User";
import { getUser } from "@/utils/auth";

export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const adminView = url.searchParams.get("admin") === "true";

    if (adminView) {
      // Admin viewing all messages with a specific user
      if (!userId) {
        return Response.json({ error: "User ID required for admin view" }, { status: 400 });
      }

      const messages = await Message.find({
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      })
      .populate("senderId", "name email")
      .populate("receiverId", "name email")
      .sort({ timestamp: 1 });

      return Response.json({ messages });
    } else {
      // User viewing their messages with admin
      const user = getUser();
      if (!user) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
      }

      // Find admin user (assuming admin has a specific role or email)
      const admin = await User.findOne({ email: "admin@alphaaryx.com" });
      if (!admin) {
        return Response.json({ messages: [] });
      }

      const messages = await Message.find({
        $or: [
          { senderId: user.id, receiverId: admin._id },
          { senderId: admin._id, receiverId: user.id }
        ]
      })
      .populate("senderId", "name email")
      .populate("receiverId", "name email")
      .sort({ timestamp: 1 });

      return Response.json({ messages });
    }
  } catch (error) {
    console.error("Error fetching messages:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const user = getUser();
    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message, receiverId } = await req.json();

    if (!message || !receiverId) {
      return Response.json({ error: "Message and receiver ID required" }, { status: 400 });
    }

    const newMessage = new Message({
      senderId: user.id,
      receiverId,
      message,
      senderType: "user",
    });

    await newMessage.save();

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId", "name email")
      .populate("receiverId", "name email");

    return Response.json({ message: populatedMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    await connectDB();

    const { messageId, userId, deleteAll } = await req.json();

    // Check if user is authenticated
    const user = getUser();
    if (!user && !deleteAll) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (deleteAll) {
      // Delete entire chat - only admin can do this
      if (!userId) {
        return Response.json({ error: "User ID required for deleting entire chat" }, { status: 400 });
      }

      // Find admin
      const admin = await User.findOne({ email: "admin@alphaaryx.com" });
      if (!admin) {
        return Response.json({ error: "Admin not found" }, { status: 404 });
      }

      // Delete all messages between admin and the specified user
      await Message.deleteMany({
        $or: [
          { senderId: userId, receiverId: admin._id },
          { senderId: admin._id, receiverId: userId }
        ]
      });

      return Response.json({ message: "Chat deleted successfully" });
    } else {
      // Delete single message
      if (!messageId) {
        return Response.json({ error: "Message ID required" }, { status: 400 });
      }

      // Find the message
      const message = await Message.findById(messageId);
      if (!message) {
        return Response.json({ error: "Message not found" }, { status: 404 });
      }

      // Check if user can delete this message (only sender can delete their own messages)
      if (message.senderId.toString() !== user.id) {
        return Response.json({ error: "You can only delete your own messages" }, { status: 403 });
      }

      await Message.findByIdAndDelete(messageId);
      return Response.json({ message: "Message deleted successfully" });
    }
  } catch (error) {
    console.error("Error deleting:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}