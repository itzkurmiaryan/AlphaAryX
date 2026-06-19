import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function PUT(req) {
  await connectDB();

  const { id, status } = await req.json();

  const updated = await Order.findByIdAndUpdate(id, { paymentStatus: status }, {
    new: true,
  });

  return Response.json(updated);
}
