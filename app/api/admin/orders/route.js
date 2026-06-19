import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

// GET ALL ORDERS
export async function GET() {
  await connectDB();

  const orders = await Order.find().sort({ createdAt: -1 });

  return Response.json(orders);
}

// DELETE ORDER
export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();

  await Order.findByIdAndDelete(id);

  return Response.json({ success: true });
}