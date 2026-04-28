import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  await connectDB();

  const { id, status, paymentStatus } = await req.json();

  const updateData = {};
  if (status) updateData.status = status;
  if (paymentStatus) updateData.paymentStatus = paymentStatus;

  const updated = await Order.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  return Response.json(updated);
}