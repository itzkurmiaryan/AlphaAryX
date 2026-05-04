"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ChatComponent from "@/components/ChatComponent";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const STATUS_OPTIONS = ["PENDING", "CONFIRMED", "SHIPPED", "COMPLETED", "CANCELLED"];
const PAYMENT_OPTIONS = ["PENDING", "PAID", "FAILED"];

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [filterUser, setFilterUser] = useState("ALL");
  const [filterService, setFilterService] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [chatUsers, setChatUsers] = useState([]);
  const [selectedChatUser, setSelectedChatUser] = useState(null);
  const [chatSearch, setChatSearch] = useState("");
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user && user.role === "admin") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loginForm),
    });

    const data = await res.json();

    if (res.ok && data.user.role === "admin") {
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials or not an admin");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen text-white bg-black">
        <div className="p-6 border w-96 rounded-xl">
          <h1 className="mb-4 text-2xl">Admin Login</h1>
          <input
            placeholder="Email"
            className="w-full p-2 mb-2 bg-gray-900"
            value={loginForm.email}
            onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 mb-2 bg-gray-900"
            value={loginForm.password}
            onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-blue-600 rounded"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  const loadData = async () => {
    setLoading(true);
    try {
      const [userRes, orderRes, chatRes, adminRes] = await Promise.all([
        fetch("/api/admin/users"),
        fetch("/api/admin/orders"),
        fetch("/api/admin/chat"),
        fetch("/api/admin/get-admin-id"),
      ]);

      // Check if user is authenticated (if any response is 401, logout)
      if (userRes.status === 401 || orderRes.status === 401 || chatRes.status === 401 || adminRes.status === 401) {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
        return;
      }

      if (!userRes.ok || !orderRes.ok || !chatRes.ok || !adminRes.ok) {
        console.error("Error fetching admin data:", {
          users: userRes.status,
          orders: orderRes.status,
          chat: chatRes.status,
          admin: adminRes.status,
        });
        setLoading(false);
        return;
      }

      const userData = await userRes.json();
      const orderData = await orderRes.json();
      const chatData = await chatRes.json();
      const adminData = await adminRes.json();

      setUsers(userData.users || []);
      setOrders(orderData || []);
      setChatUsers(chatData.users || []);
      if (adminData.adminId) {
        setAdminId(adminData.adminId);
      }
    } catch (error) {
      console.error("Error loading admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) return;
    await fetch("/api/admin/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadData();
  };

  const deleteOrder = async (id) => {
    await fetch("/api/admin/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadData();
  };

  const updateStatus = async (id, status, paymentStatus) => {
    await fetch("/api/admin/orders/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status, paymentStatus }),
    });
    loadData();
  };

  const ordersByUser = useMemo(
    () =>
      users.map((user) => ({
        ...user,
        orders: orders.filter((order) => order.userId === user._id),
      })),
    [users, orders]
  );

  const userMap = useMemo(
    () => users.reduce((acc, user) => ({ ...acc, [user._id]: user }), {}),
    [users]
  );

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const statusMatch = filterStatus === "ALL" || (order.status || "PENDING") === filterStatus;
      const userMatch = filterUser === "ALL" || order.userId === filterUser;
      const serviceText = (order.items || [])
        .map((item) => (item.name || item.service || ""))
        .join(" ")
        .toLowerCase();
      const serviceMatch = !filterService || serviceText.includes(filterService.toLowerCase());
      const created = new Date(order.createdAt);
      const fromMatch = !dateFrom || created >= new Date(dateFrom);
      const toMatch = !dateTo || created <= new Date(dateTo);
      return statusMatch && userMatch && serviceMatch && fromMatch && toMatch;
    });
  }, [orders, filterStatus, filterUser, filterService, dateFrom, dateTo]);

  const totalRevenue = useMemo(
    () => orders.reduce((sum, order) => sum + (order.total || 0), 0),
    [orders]
  );

  const statusCounts = useMemo(() => {
    const counts = { PENDING: 0, CONFIRMED: 0, SHIPPED: 0, COMPLETED: 0, CANCELLED: 0 };
    orders.forEach((order) => {
      const key = order.status || "PENDING";
      counts[key] = (counts[key] || 0) + 1;
    });
    return counts;
  }, [orders]);

  const topUsers = useMemo(
    () =>
      [...ordersByUser]
        .sort((a, b) => b.orders.length - a.orders.length)
        .slice(0, 5),
    [ordersByUser]
  );

  const totalOrders = orders.length;
  const averageOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

  return (
    <div className="min-h-screen p-6 text-white bg-slate-950">
      <header className="mb-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Seller dashboard</p>
            <h1 className="mt-2 text-4xl font-bold">Admin Dashboard</h1>
            <p className="mt-3 text-slate-400 max-w-2xl">Full order management for all users, with filters, order tracking, and status updates.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
              <p className="text-sm text-slate-400">Total Users</p>
              <p className="mt-3 text-3xl font-semibold text-white">{users.length}</p>
            </div>
            <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
              <p className="text-sm text-slate-400">Total Orders</p>
              <p className="mt-3 text-3xl font-semibold text-white">{totalOrders}</p>
            </div>
            <div className="p-4 rounded-3xl bg-white/5 border border-white/10">
              <p className="text-sm text-slate-400">Total Revenue</p>
              <p className="mt-3 text-3xl font-semibold text-emerald-400">{formatCurrency(totalRevenue)}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-6 xl:grid-cols-[2fr_1fr_1.5fr]">
        {/* Orders Section */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Orders view</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">Search and manage orders</h2>
                <p className="mt-2 text-slate-400">Use filters to find orders by status, date, user or service type.</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</label>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="w-full mt-2 rounded-3xl bg-slate-900/80 border border-white/10 px-4 py-3 text-sm text-white"
                  >
                    <option value="ALL">All statuses</option>
                    {STATUS_OPTIONS.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400">User</label>
                  <select
                    value={filterUser}
                    onChange={(e) => setFilterUser(e.target.value)}
                    className="w-full mt-2 rounded-3xl bg-slate-900/80 border border-white/10 px-4 py-3 text-sm text-white"
                  >
                    <option value="ALL">All users</option>
                    {users.map((user) => (
                      <option key={user._id} value={user._id}>{user.name || user.email}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Service</label>
                  <input
                    value={filterService}
                    onChange={(e) => setFilterService(e.target.value)}
                    placeholder="Search service"
                    className="w-full mt-2 rounded-3xl bg-slate-900/80 border border-white/10 px-4 py-3 text-sm text-white"
                  />
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-3xl bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Pending</p>
                <p className="mt-3 text-3xl font-semibold text-amber-300">{statusCounts.PENDING}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Confirmed</p>
                <p className="mt-3 text-3xl font-semibold text-sky-300">{statusCounts.CONFIRMED}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Completed</p>
                <p className="mt-3 text-3xl font-semibold text-emerald-400">{statusCounts.COMPLETED}</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Cancelled</p>
                <p className="mt-3 text-3xl font-semibold text-rose-400">{statusCounts.CANCELLED}</p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Date from</label>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full mt-2 rounded-3xl bg-slate-900/80 border border-white/10 px-4 py-3 text-sm text-white"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-slate-400">Date to</label>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full mt-2 rounded-3xl bg-slate-900/80 border border-white/10 px-4 py-3 text-sm text-white"
                />
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white/5 border border-white/10">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-900/80 text-slate-400">
                <tr>
                  <th className="px-4 py-3">Order</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Order status</th>
                  <th className="px-4 py-3">Payment</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400">Loading orders...</td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400">No matching orders found.</td>
                  </tr>
                ) : (
                  filteredOrders.map((order) => {
                    const user = userMap[order.userId];
                    const statusClass =
                      order.status === "COMPLETED"
                        ? "bg-emerald-500/10 text-emerald-300"
                        : order.status === "CANCELLED"
                        ? "bg-rose-500/10 text-rose-300"
                        : order.status === "SHIPPED"
                        ? "bg-sky-500/10 text-sky-300"
                        : order.status === "CONFIRMED"
                        ? "bg-cyan-500/10 text-cyan-300"
                        : "bg-amber-500/10 text-amber-300";

                    return (
                      <tr key={order._id} className="border-t border-white/10">
                        <td className="px-4 py-4 font-semibold">#{order._id.slice(-6)}</td>
                        <td className="px-4 py-4">
                          <div>{user?.name || "Unknown"}</div>
                          <div className="text-xs text-slate-500">{user?.email || "unknown"}</div>
                        </td>
                        <td className="px-4 py-4">{(order.items || []).map((item) => item.items ? item.items.map(sub => sub.name).join(", ") : (item.name || item.service)).join(", ")}</td>
                        <td className="px-4 py-4">{formatCurrency(order.total)}</td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-black bg-slate-50/10">
                            {order.status || "PENDING"}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <span className="inline-flex rounded-full bg-slate-900/90 px-3 py-1 text-xs font-semibold text-cyan-200">
                            {order.paymentStatus || "PENDING"}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td className="px-4 py-4 space-y-2">
                          <div className="grid gap-2">
                            {STATUS_OPTIONS.map((status) => (
                              <button
                                key={status}
                                onClick={() => updateStatus(order._id, status)}
                                disabled={order.status === status}
                                className="rounded-full bg-slate-900/80 px-3 py-2 text-xs text-white disabled:opacity-50"
                              >
                                {status}
                              </button>
                            ))}
                          </div>
                          <button
                            onClick={() => updateStatus(order._id, order.status, "PAID")}
                            disabled={order.paymentStatus === "PAID"}
                            className="w-full rounded-full bg-cyan-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"
                          >
                            Mark Paid
                          </button>
                          <button
                            onClick={() => deleteOrder(order._id)}
                            className="w-full rounded-full bg-rose-500 px-3 py-2 text-xs font-semibold text-white"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Chat Users List */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Chat with Users</h2>
              <p className="mt-2 text-sm text-slate-400">Manage customer conversations</p>
              <input
                type="text"
                placeholder="Search users..."
                value={chatSearch}
                onChange={(e) => setChatSearch(e.target.value)}
                className="w-full mt-3 rounded-3xl bg-slate-900/80 border border-white/10 px-4 py-2 text-sm text-white placeholder-slate-400"
              />
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {chatUsers
                .filter(user =>
                  user.name?.toLowerCase().includes(chatSearch.toLowerCase()) ||
                  user.email?.toLowerCase().includes(chatSearch.toLowerCase())
                )
                .map((user) => (
                  <div
                    key={user._id}
                    className="group p-3 rounded-2xl cursor-pointer transition-colors"
                  >
                    <div
                      onClick={() => setSelectedChatUser(user)}
                      className={`p-3 rounded-2xl cursor-pointer transition-colors ${
                        selectedChatUser?._id === user._id
                          ? "bg-blue-600/20 border border-blue-500/50"
                          : "bg-slate-900/80 hover:bg-slate-800/80"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-white">{user.name || user.email}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                        {user.unreadCount > 0 && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {user.unreadCount}
                          </span>
                        )}
                      </div>
                      {user.lastMessage && (
                        <p className="text-xs text-slate-500 mt-1 truncate">
                          {user.lastMessage.message}
                        </p>
                      )}
                    </div>
                    <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => window.open(`/admin/users/${user._id}`, '_blank')}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full transition-colors"
                      >
                        View Profile
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-full transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Top Users Section */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold">Top Users</h2>
              <p className="mt-2 text-sm text-slate-400">Users with most orders</p>
            </div>
            <div className="space-y-3">
              {topUsers.slice(0, 5).map((user, index) => (
                <div
                  key={user._id}
                  onClick={() => window.open(`/admin/users/${user._id}`, '_blank')}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/80 hover:bg-slate-800/80 cursor-pointer transition-colors group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-white">{user.name || user.email}</p>
                      <p className="text-xs text-slate-400">{user.orders.length} orders</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-400">
                      {formatCurrency(user.orders.reduce((sum, order) => sum + (order.total || 0), 0))}
                    </p>
                    <button className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="space-y-6">
          {selectedChatUser ? (
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Chat with {selectedChatUser.name || selectedChatUser.email}</h2>
                <p className="text-sm text-slate-400">{selectedChatUser.email}</p>
              </div>
              <ChatComponent
                userId={selectedChatUser._id}
                isAdmin={true}
                currentUser={{ _id: adminId, name: "Admin", email: "admin@alphaaryx.com" }}
                chatWithUser={selectedChatUser}
                isAdminView={true}
              />
            </div>
          ) : (
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 flex items-center justify-center h-96">
              <div className="text-center text-slate-400">
                <p className="text-lg font-medium">Select a user to start chatting</p>
                <p className="text-sm mt-2">Click on any user from the list to view their conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
