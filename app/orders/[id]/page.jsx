import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import mongoose from "mongoose";
import Link from "next/link";

export default async function OrderDetailsPage({ params }) {
  await connectDB();

  // Next.js 15 fix
  const { id } = await params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">
            Invalid Order ID
          </h1>

          <Link
            href="/dashboard"
            className="inline-block px-5 py-3 mt-4 bg-cyan-600 rounded-xl"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const order = await Order.findById(id).lean();

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-slate-950">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-500">
            Order Not Found
          </h1>

          <Link
            href="/dashboard"
            className="inline-block px-5 py-3 mt-4 bg-cyan-600 rounded-xl"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 text-white bg-slate-950">
      <div className="max-w-5xl mx-auto">

        <div className="p-8 border bg-slate-900 rounded-3xl border-white/10">

          <h1 className="mb-6 text-4xl font-bold">
            Order Details
          </h1>

          <div className="grid gap-6 md:grid-cols-2">

            <div>
              <p className="text-slate-400">Order ID</p>
              <p>{order._id.toString()}</p>
            </div>

            <div>
              <p className="text-slate-400">Status</p>
              <p>{order.status}</p>
            </div>

            <div>
              <p className="text-slate-400">Payment Status</p>
              <p>{order.paymentStatus}</p>
            </div>

            <div>
              <p className="text-slate-400">Total Amount</p>
              <p>₹{order.total}</p>
            </div>

            <div>
              <p className="text-slate-400">Created At</p>
              <p>
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-2xl font-bold">
              Ordered Items
            </h2>

            {order.items?.length > 0 ? (
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-xl bg-slate-800 border-white/10"
                  >
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-slate-400">
                      Qty: {item.quantity || 1}
                    </p>

                    <p className="text-cyan-400">
                      ₹{item.price || 0}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No Items Found</p>
            )}
          </div>

          <Link
            href="/dashboard"
            className="inline-block px-6 py-3 mt-8 bg-cyan-600 rounded-xl hover:bg-cyan-500"
          >
            Back to Dashboard
          </Link>

        </div>
      </div>
    </div>
  );
}