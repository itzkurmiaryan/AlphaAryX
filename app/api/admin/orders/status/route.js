import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();

  const { id, status } = await req.json();

  const updated = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );

  return Response.json(updated);
}