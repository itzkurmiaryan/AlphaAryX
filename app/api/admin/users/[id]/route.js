import { connectDB } from "@/lib/db";
import User from "@/models/User";
import Order from "@/models/Order";

export async function GET(req, { params }) {
  await connectDB();
  const { id } = await params;

  try {
    // Get user details
    const user = await User.findById(id);
    if (!user) {
      return Response.json({ error: "User not found" }, { status: 404 });
    }

    // Get all orders for this user
    const orders = await Order.find({ userId: id }).sort({ createdAt: -1 });

    // Calculate user statistics
    const stats = {
      totalOrders: orders.length,
      totalSpent: orders.reduce((sum, order) => sum + (order.total || 0), 0),
      pendingOrders: orders.filter(order => order.status === 'PENDING').length,
      completedOrders: orders.filter(order => order.status === 'COMPLETED').length,
    };

    return Response.json({
      user,
      orders,
      stats
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}