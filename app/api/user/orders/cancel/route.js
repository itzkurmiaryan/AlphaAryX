import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();

    const { userId, orderId } = await req.json();
    const order = await Order.findById(orderId);

    if (!order) {
      return Response.json({ success: false, message: "Order not found" }, { status: 404 });
    }

    if (String(order.userId) !== String(userId)) {
      return Response.json({ success: false, message: "Not authorized" }, { status: 403 });
    }

    if (order.status === "COMPLETED") {
      return Response.json({ success: false, message: "Completed orders cannot be cancelled" }, { status: 400 });
    }

    if (order.status === "CANCELLED") {
      return Response.json({ success: true, order });
    }

    order.status = "CANCELLED";
    await order.save();

    return Response.json({ success: true, order });
  } catch (error) {
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}
