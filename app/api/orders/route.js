import  {connectDB}  from "@/lib/db";
import Order from "@/models/Order";

export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    console.log("BODY:", body);

    const order = await Order.create({
      userId: body.userId || null,
      items: body.items,
      total: body.total,
      status: body.status || "PENDING",
      paymentStatus: body.paymentStatus || "PENDING",
    });

    return Response.json({ success: true, order });

  } catch (error) {
    console.log("ERROR:", error);

    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}