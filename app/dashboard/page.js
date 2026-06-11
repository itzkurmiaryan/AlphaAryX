"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUser } from "@/utils/auth";
import ChatComponent from "@/components/ChatComponent";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = getUser();
    if (!currentUser) {
      router.replace("/login");
      return;
    }

    if (currentUser.role === "admin") {
      router.replace("/admin");
      return;
    }

    setUser(currentUser);
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const loadOrders = async () => {
      setLoading(true);
      const res = await fetch("/api/user/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id || user._id }),
      });
      const data = await res.json();
      setOrders(Array.isArray(data) ? data : []);
      setLoading(false);
    };

    loadOrders();
  }, [user]);

  const cancelOrder = async (orderId) => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      const res = await fetch("/api/user/orders/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id || user._id, orderId }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.map(o => (String(o._id || o.id) === String(orderId) ? { ...o, status: "CANCELLED" } : o)));
        alert("Order cancelled");
      } else {
        alert(data.message || "Failed to cancel order");
      }
    } catch (err) {
      console.error(err);
      alert("Error cancelling order");
    }
  };

  const deleteOrder = async (orderId) => {
    if (!confirm("Delete this order from your account? This cannot be undone.")) return;
    try {
      const res = await fetch("/api/user/orders/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id || user._id, orderId }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders((prev) => prev.filter(o => String(o._id || o.id) !== String(orderId)));
        alert("Order deleted");
      } else {
        alert(data.message || "Failed to delete order");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting order");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        <p className="text-lg">Checking your dashboard...</p>
      </div>
    );
  }

  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);

  return (
    <div className="min-h-screen p-6 text-white bg-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Your dashboard</p>
          <h1 className="mt-3 text-4xl font-bold">Welcome back, {user.name}</h1>
          <p className="mt-3 text-slate-300">This is your personal dashboard. Track orders, manage your services, and continue shopping anytime.</p>

          <div className="grid gap-4 mt-8 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Orders</p>
              <p className="mt-3 text-3xl font-semibold text-white">{orders.length}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Total spent</p>
              <p className="mt-3 text-3xl font-semibold text-emerald-400">{formatCurrency(totalSpent)}</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Email</p>
              <p className="mt-3 text-lg text-white">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">My Orders</h2>
              <p className="mt-2 text-slate-400">View the latest orders placed from your account.</p>
            </div>
            <Link href="/services" className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
              Browse services
            </Link>
          </div>

          {loading ? (
            <div className="mt-8 text-center text-slate-300">Loading your orders...</div>
          ) : orders.length === 0 ? (
            <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-slate-900/70 p-8 text-center text-slate-300">
              <p className="text-xl font-medium">No orders yet.</p>
              <p className="mt-2">Start by ordering a service from our marketplace.</p>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              {orders.map((order) => (
                <div key={order._id || order.id} className="rounded-3xl border border-white/10 bg-slate-900/80 p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-400">Order ID</p>
                      <p className="mt-2 font-medium text-white">{order._id || order.id}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-slate-400">Status</p>
                      <p className="mt-2 inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.15em] text-emerald-300">{order.status || "PENDING"}</p>
                    </div>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="text-sm text-slate-400">Total</p>
                      <p className="mt-2 text-lg font-semibold text-white">{formatCurrency(order.total || 0)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Placed</p>
                      <p className="mt-2 text-lg text-white">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Service</p>
                      <p className="mt-2 text-lg text-white">{order.items?.[0]?.name || order.service || "—"}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex gap-3">
                    {order.status !== "CANCELLED" && order.status !== "COMPLETED" && (
                      <button onClick={() => cancelOrder(order._id || order.id)} className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded-full hover:bg-red-700">
                        Cancel Order
                      </button>
                    )}

                    <button onClick={() => deleteOrder(order._id || order.id)} className="px-4 py-2 text-sm font-semibold text-slate-900 bg-white rounded-full hover:opacity-90">
                      Delete
                    </button>

                    <Link href={`/orders/${order._id || order.id}`} className="px-4 py-2 text-sm font-semibold text-white bg-cyan-600 rounded-full hover:bg-cyan-500">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-semibold mb-4">Chat with Admin</h2>
          <p className="text-slate-400 mb-6">Get direct support from our team</p>
          <ChatComponent 
            userId={user?.id || user?._id} 
            currentUser={user}
          />
        </div>
      </div>
    </div>
  );
}
