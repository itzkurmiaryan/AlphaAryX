import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import User from "@/models/User";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    await connectDB();

    const url = new URL(req.url);
    const currentUserId = url.searchParams.get("currentUserId");
    const otherUserId = url.searchParams.get("otherUserId");
    const adminView = url.searchParams.get("admin") === "true";
    const userId = url.searchParams.get("userId");

    const baseQuery = adminView
      ? {
          $or: [
            { senderId: userId },
            { receiverId: userId }
          ]
        }
      : {
          $or: [
            { senderId: currentUserId, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: currentUserId }
          ]
        };

    if (adminView && !userId) {
      return Response.json({ error: "User ID required for admin view" }, { status: 400 });
    }

    if (!adminView && (!currentUserId || !otherUserId)) {
      return Response.json({ error: "Current user and other user IDs are required" }, { status: 400 });
    }

    const query = { ...baseQuery };
    if (currentUserId) {
      // Convert to ObjectId to ensure proper comparison
      try {
        query.deletedBy = { $nin: [new ObjectId(currentUserId)] };
      } catch (e) {
        query.deletedBy = { $nin: [currentUserId] };
      }
    }

    const messages = await Message.find(query).sort({ timestamp: 1 });

    return Response.json({ messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    const { senderId, message, receiverId, senderType } = await req.json();

    if (!senderId || !message || !receiverId) {
      return Response.json({ error: "Sender, message, and receiver IDs are required" }, { status: 400 });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      senderType: senderType || "user",
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

    const { messageId, deletedById, otherUserId, deleteAll, senderType } = await req.json();

    if (deleteAll) {
      if (!deletedById || !otherUserId) {
        return Response.json({ error: "deletedById and otherUserId are required" }, { status: 400 });
      }

      // Convert to ObjectId for proper storage
      let deletedByObjectId = deletedById;
      try {
        deletedByObjectId = new ObjectId(deletedById);
      } catch (e) {
        // If conversion fails, use as-is
      }

      await Message.updateMany(
        {
          $or: [
            { senderId: deletedById, receiverId: otherUserId },
            { senderId: otherUserId, receiverId: deletedById }
          ]
        },
        { $addToSet: { deletedBy: deletedByObjectId } }
      );

      return Response.json({ message: "Chat deleted successfully" });
    }

    if (!messageId || !deletedById) {
      return Response.json({ error: "Message ID and user ID are required" }, { status: 400 });
    }

    const message = await Message.findById(messageId);
    if (!message) {
      return Response.json({ error: "Message not found" }, { status: 404 });
    }

    const isAdmin = senderType === "admin";

    // Allow deletion if user is the sender or if user is admin
    if (!isAdmin && String(message.senderId) !== String(deletedById)) {
      return Response.json({ error: "You can only delete your own messages" }, { status: 403 });
    }

    // Convert to ObjectId for proper storage
    let deletedByObjectId = deletedById;
    try {
      deletedByObjectId = new ObjectId(deletedById);
    } catch (e) {
      // If conversion fails, use as-is
    }

    // Mark message as deleted by this user instead of permanently deleting
    await Message.findByIdAndUpdate(messageId, { $addToSet: { deletedBy: deletedByObjectId } });
    return Response.json({ message: "Message deleted successfully" });
  } catch (error) {
    console.error("Error deleting:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}