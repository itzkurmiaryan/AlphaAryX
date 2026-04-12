"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);

  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : null;

  const fetchOrders = async () => {
    const res = await fetch("/api/user/orders", {
      method: "POST",
      body: JSON.stringify({ userId: user.id }),
    });

    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, []);

  if (!user) {
    return (
      <div className="p-10 text-white bg-black">
        ❌ Please login first
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 text-white bg-black">

      <h1 className="text-3xl font-bold">
        Welcome {user.name} 👋
      </h1>

      <h2 className="mt-6 text-xl">
        Your Orders 📦
      </h2>

      <div className="mt-4 space-y-4">

        {orders.map((o) => (
          <div
            key={o._id}
            className="p-4 border rounded-xl bg-white/5"
          >

            <p className="text-yellow-400">
              Status: {o.status}
            </p>

            <p className="text-green-400">
              Total: ₹{o.total}
            </p>

            {o.items?.map((i, idx) => (
              <p key={idx}>
                • {i.name} - ₹{i.price}
              </p>
            ))}

          </div>
        ))}

      </div>
    </div>
  );
}