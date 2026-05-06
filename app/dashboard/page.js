"use client";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/auth";
import ChatComponent from "@/components/ChatComponent";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Dashboard() {
  const [user, setUser] = useState(undefined);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState("");

  const loadOrders = async (userId) => {
    setLoading(true);

    try {
      const res = await fetch("/api/user/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setOrders([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    const parsed = getUser();
    setUser(parsed);
    if (parsed) {
      loadOrders(parsed.id);
    } else {
      setLoading(false);
    }
  }, []);

  const cancelOrder = async (orderId) => {
    if (!user) return;

    const res = await fetch("/api/user/orders/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, orderId }),
    });

    const data = await res.json();
    if (data.success) {
      setFeedback("Order cancelled successfully.");
      loadOrders(user.id);
    } else {
      setFeedback(data.message || "Unable to cancel order.");
    }
  };

  const totalOrders = orders.length;
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  // ⏳ IMPORTANT (fix flash issue)
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        Loading...
      </div>
    );
  }

  // ❌ not logged in
  if (user === null) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        <div className="max-w-md p-8 text-center border rounded-3xl bg-white/5 border-white/10">
          <p className="mb-4 text-2xl font-semibold">🚫 Please login first</p>
          <p className="text-slate-400">You need to login to view and manage your orders.</p>
        </div>
      </div>
    );
  }

  // ✅ logged in
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Navbar />

      <div className="relative p-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Order dashboard</p>
            <h1 className="mt-2 text-4xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">Welcome back, {user.name}</h1>
            <p className="max-w-2xl mt-2 text-slate-400">Track your orders, cancel before completion, and follow every service delivery like a marketplace buyer.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-5 border rounded-3xl bg-white/5 border-white/10 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Total orders</p>
              <p className="mt-3 text-3xl font-semibold text-white">{totalOrders}</p>
            </div>
            <div className="p-5 border rounded-3xl bg-white/5 border-white/10 backdrop-blur-sm">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Total spent</p>
              <p className="mt-3 text-3xl font-semibold text-emerald-400">₹{totalSpent}</p>
            </div>
          </div>
        </div>

        {feedback && (
          <div className="p-4 mt-6 border rounded-3xl bg-emerald-500/10 border-emerald-500 text-emerald-200">
            {feedback}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {loading ? (
            <div className="p-6 border rounded-3xl bg-white/5 border-white/10 text-slate-400 backdrop-blur-sm">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="p-6 border rounded-3xl bg-white/5 border-white/10 text-slate-400 backdrop-blur-sm">
              No orders yet. Place your first service order to see it here.
            </div>
          ) : (
            orders.map((o) => (
              <div key={o._id} className="p-6 border rounded-3xl border-white/10 bg-white/5 backdrop-blur-sm">
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Order #{o._id.slice(-8)}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">₹{o.total}</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <span className="px-4 py-2 text-sm font-semibold rounded-full bg-slate-900/80 text-slate-200">{o.status || "PENDING"}</span>
                    <span className="px-4 py-2 text-sm font-semibold rounded-full bg-cyan-900/80 text-cyan-200">{o.paymentStatus || "PENDING"}</span>
                  </div>
                </div>

                <div className="grid gap-4 mt-6 text-sm sm:grid-cols-3 text-slate-400">
                  <div className="p-4 rounded-3xl bg-slate-900/80">
                    <p className="font-medium text-slate-200">Service / Item</p>
                    <p className="mt-2 text-white">{o.items?.map((item) => item.items ? item.items.map(sub => sub.name).join(", ") : (item.name || item.service)).join(", ") || "N/A"}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-slate-900/80">
                    <p className="font-medium text-slate-200">Placed</p>
                    <p className="mt-2 text-white">{new Date(o.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="p-4 rounded-3xl bg-slate-900/80">
                    <p className="font-medium text-slate-200">Items</p>
                    <p className="mt-2 text-white">{o.items?.length || 0}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 mt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="text-sm text-slate-400">Your order is currently <span className="text-white">{o.status || "PENDING"}</span>.</div>
                <button
                  disabled={o.status === "COMPLETED" || o.status === "CANCELLED"}
                  onClick={() => cancelOrder(o._id)}
                  className="inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white rounded-full bg-rose-500/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {o.status === "COMPLETED" || o.status === "CANCELLED" ? "Cannot Cancel" : "Cancel Order"}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Chat Section */}
      <div className="mt-12">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white">Chat with Admin</h2>
          <p className="mt-2 text-slate-400">Get instant support and ask questions about your orders.</p>
        </div>
        <ChatComponent userId={user.id} />
      </div>

      </div>

      <Footer />
    </div>
  );
}