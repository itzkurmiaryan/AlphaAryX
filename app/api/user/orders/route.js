import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();

  const { userId } = await req.json();

  const orders = await Order.find({ userId }).sort({
    createdAt: -1,
  });

  return Response.json(orders);
}