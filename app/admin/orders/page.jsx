"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const res = await fetch("/api/admin/orders");
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // DELETE
  const deleteOrder = async (id) => {
    await fetch("/api/admin/orders", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    fetchOrders();
  };

  // UPDATE STATUS
  const updateStatus = async (id, status) => {
    await fetch("/api/admin/orders/status", {
      method: "POST",
      body: JSON.stringify({ id, status }),
    });

    fetchOrders();
  };

  return (
    <div className="min-h-screen p-6 text-white bg-black">

      <h1 className="mb-6 text-3xl font-bold">
        Admin Orders Panel 🧾
      </h1>

      <div className="grid gap-4">

        {orders.map((order) => (
          <motion.div
            key={order._id}
            className="p-4 border rounded-xl bg-white/5 border-white/10"
            whileHover={{ scale: 1.01 }}
          >

            {/* ITEMS */}
            <div className="text-sm">
              {order.items.map((i, idx) => (
                <p key={idx}>• {i.name} - ₹{i.price}</p>
              ))}
            </div>

            {/* TOTAL + STATUS */}
            <div className="flex justify-between mt-3">
              <p className="text-green-400">
                ₹{order.total}
              </p>

              <p className="text-yellow-400">
                {order.status}
              </p>
            </div>

            {/* ACTIONS */}
            <div className="flex gap-2 mt-3">

              <button
                onClick={() => updateStatus(order._id, "PLACED")}
                className="px-3 py-1 text-sm bg-blue-500 rounded"
              >
                Placed
              </button>

              <button
                onClick={() => updateStatus(order._id, "COMPLETED")}
                className="px-3 py-1 text-sm bg-green-500 rounded"
              >
                Completed
              </button>

              <button
                onClick={() => updateStatus(order._id, "CANCELLED")}
                className="px-3 py-1 text-sm bg-red-500 rounded"
              >
                Cancel
              </button>

              <button
                onClick={() => deleteOrder(order._id)}
                className="px-3 py-1 text-sm bg-gray-600 rounded"
              >
                Delete
              </button>

            </div>

          </motion.div>
        ))}

      </div>
    </div>
  );
}