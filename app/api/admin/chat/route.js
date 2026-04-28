import { connectDB } from "@/lib/db";
import Message from "@/models/Message";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // Get all users with their last message and unread count
    const users = await User.find();

    const usersWithChat = await Promise.all(
      users.map(async (user) => {
        // Get last message between admin and this user
        const admin = await User.findOne({ email: "admin@alphaaryx.com" });
        if (!admin) {
          return {
            ...user.toObject(),
            lastMessage: null,
            unreadCount: 0,
            hasChat: false,
          };
        }

        const lastMessage = await Message.findOne({
          $or: [
            { senderId: user._id, receiverId: admin._id },
            { senderId: admin._id, receiverId: user._id }
          ]
        })
        .sort({ timestamp: -1 })
        .populate("senderId", "name email")
        .populate("receiverId", "name email");

        // Count unread messages for admin
        const unreadCount = await Message.countDocuments({
          senderId: user._id,
          receiverId: admin._id,
          isRead: false,
        });

        return {
          ...user.toObject(),
          lastMessage,
          unreadCount,
          hasChat: !!lastMessage,
        };
      })
    );

    // Sort by last message timestamp (most recent first)
    usersWithChat.sort((a, b) => {
      if (!a.lastMessage && !b.lastMessage) return 0;
      if (!a.lastMessage) return 1;
      if (!b.lastMessage) return -1;
      return new Date(b.lastMessage.timestamp) - new Date(a.lastMessage.timestamp);
    });

    return Response.json({ users: usersWithChat });
  } catch (error) {
    console.error("Error fetching users with chat:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}