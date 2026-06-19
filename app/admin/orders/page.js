"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  const fetchAll = async () => {
    const u = await fetch("/api/admin/users").then(res => res.json());
    const o = await fetch("/api/admin/orders").then(res => res.json());

    setUsers(u.users);
    setOrders(o);
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const deleteOrder = async (id) => {
    await fetch("/api/admin/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchAll();
  };

  const updateStatus = async (id, status) => {
    await fetch("/api/admin/orders/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    fetchAll();
  };

  return (
    <div className="min-h-screen p-6 text-white bg-black">

      <h1 className="mb-6 text-4xl font-bold">
        Admin Dashboard 👑
      </h1>

      {/* USERS */}
      <div className="mb-10">
        <h2 className="mb-4 text-2xl">
          Users ({users.length})
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {users.map((u) => (
            <div key={u._id} className="p-4 border rounded-xl bg-white/5">
              <p><b>Name:</b> {u.name}</p>
              <p><b>Email:</b> {u.email}</p>
              <p><b>Phone:</b> {u.phone || "N/A"}</p>
              <p><b>Aadhaar:</b> {u.aadhaar || "N/A"}</p>

              <p className="text-sm text-gray-400">
                Joined: {new Date(u.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ORDERS */}
      <div>
        <h2 className="mb-4 text-2xl">
          Orders ({orders.length})
        </h2>

        <div className="grid gap-4">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              className="p-4 border rounded-xl bg-white/5"
              whileHover={{ scale: 1.02 }}
            >
              {/* ITEMS */}
              <div className="text-sm">
                {order.items?.map((i, idx) => (
                  <p key={idx}>• {i.name} - ₹{i.price}</p>
                ))}
              </div>

              {/* INFO */}
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

    </div>
  );
}