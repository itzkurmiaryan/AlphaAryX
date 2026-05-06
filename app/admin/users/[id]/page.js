"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FirebaseChatComponent from "@/components/FirebaseChatComponent";
import { motion } from "framer-motion";
import { Phone, Mail, Calendar, ShoppingBag, DollarSign, Clock, CheckCircle, XCircle, CreditCard, Edit3, Save, X as CloseIcon } from "lucide-react";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value || 0);

const STATUS_COLORS = {
  PENDING: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  CONFIRMED: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  SHIPPED: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  COMPLETED: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  CANCELLED: "bg-red-500/20 text-red-300 border-red-500/30",
};

const PAYMENT_COLORS = {
  PENDING: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  PAID: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  FAILED: "bg-red-500/20 text-red-300 border-red-500/30",
};

export default function UserDetailPage() {
  const params = useParams();
  const router = useRouter();
  const userId = params.id;

  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adminId, setAdminId] = useState(null);

  // Editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    aadhaar: ""
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadUserDetails();
    fetchAdminId();
  }, [userId]);

  const fetchAdminId = async () => {
    try {
      const response = await fetch("/api/admin/get-admin-id");
      const data = await response.json();
      if (data.adminId) {
        setAdminId(data.adminId);
      }
    } catch (error) {
      console.error("Error loading admin ID:", error);
    }
  };

  const loadUserDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/users/${userId}`);
      if (!response.ok) {
        throw new Error("Failed to load user details");
      }
      const data = await response.json();
      setUser(data.user);
      setOrders(data.orders);
      setStats(data.stats);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/orders/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });

      if (response.ok) {
        loadUserDetails(); // Reload data
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const updatePaymentStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/admin/orders/payment`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: orderId, status: newStatus }),
      });

      if (response.ok) {
        loadUserDetails(); // Reload data
      }
    } catch (error) {
      console.error("Error updating payment status:", error);
    }
  };

  const startEditing = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      aadhaar: user?.aadhaar || ""
    });
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditForm({
      name: "",
      email: "",
      phone: "",
      aadhaar: ""
    });
  };

  const saveUserDetails = async () => {
    if (!editForm.name.trim() || !editForm.email.trim()) {
      alert("Name and email are required");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/users/${userId}/update`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        setIsEditing(false);
        alert("User details updated successfully!");
      } else {
        alert(data.error || "Failed to update user details");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Failed to update user details");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="relative">
              <div className="w-16 h-16 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 rounded-full animate-ping"></div>
            </div>
            <p className="mt-6 text-xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Loading user details...
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
        <Navbar />
        <div className="flex items-center justify-center min-h-[80vh]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md mx-auto p-8 rounded-3xl bg-red-500/10 border border-red-500/20 backdrop-blur-sm"
          >
            <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-red-400 mb-2">Error Loading User</h2>
            <p className="text-slate-300 mb-6">{error}</p>
            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
            >
              Go Back
            </button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <Navbar />

      {/* Premium Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden border-b border-white/10 backdrop-blur-xl bg-white/5"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10"></div>
        <div className="relative z-10 p-6">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-white">
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-slate-400">User Profile</p>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                    {user?.name || "User Details"}
                  </h1>
                </div>
              </div>
              <p className="text-slate-400 max-w-2xl">
                Complete user information, order history, and live chat management.
              </p>
            </div>

            <button
              onClick={() => router.back()}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300 backdrop-blur-sm"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </motion.header>

      <div className="relative p-6">
        <div className="grid gap-8 xl:grid-cols-[1fr_2fr_1.5fr]">
          {/* User Information & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {/* User Stats Cards */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                User Statistics
              </h3>
              <div className="grid gap-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-slate-300">Total Orders</span>
                  </div>
                  <span className="text-2xl font-bold text-blue-400">{stats.totalOrders || 0}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm text-slate-300">Total Spent</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-400">{formatCurrency(stats.totalSpent || 0)}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-400" />
                    <span className="text-sm text-slate-300">Pending Orders</span>
                  </div>
                  <span className="text-2xl font-bold text-amber-400">{stats.pendingOrders || 0}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/50 border border-white/5">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-slate-300">Completed Orders</span>
                  </div>
                  <span className="text-2xl font-bold text-purple-400">{stats.completedOrders || 0}</span>
                </div>
              </div>
            </div>

            {/* Complete User Information */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Complete User Information
                </h3>
                {!isEditing ? (
                  <button
                    onClick={startEditing}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit User
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={saveUserDetails}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg hover:shadow-emerald-500/25 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      ) : (
                        <Save className="w-4 h-4" />
                      )}
                      Save
                    </button>
                    <button
                      onClick={cancelEditing}
                      disabled={saving}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all duration-300"
                    >
                      <CloseIcon className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 border border-white/5">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Full Name</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                        className="w-full bg-slate-800/80 border border-white/20 rounded-lg px-3 py-1 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                        placeholder="Enter full name"
                      />
                    ) : (
                      <p className="text-white font-medium">{user?.name || "N/A"}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 border border-white/5">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Email Address</p>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full bg-slate-800/80 border border-white/20 rounded-lg px-3 py-1 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                        placeholder="Enter email address"
                      />
                    ) : (
                      <p className="text-white font-medium">{user?.email || "N/A"}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 border border-white/5">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Phone Number</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editForm.phone}
                        onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                        className="w-full bg-slate-800/80 border border-white/20 rounded-lg px-3 py-1 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <p className="text-white font-medium">{user?.phone || "N/A"}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 border border-white/5">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Member Since</p>
                    <p className="text-white font-medium">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      }) : "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/50 border border-white/5">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-rose-500 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-400 uppercase tracking-wide">Aadhaar Number</p>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editForm.aadhaar}
                        onChange={(e) => setEditForm({ ...editForm, aadhaar: e.target.value })}
                        className="w-full bg-slate-800/80 border border-white/20 rounded-lg px-3 py-1 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50"
                        placeholder="Enter Aadhaar number"
                      />
                    ) : (
                      <p className="text-white font-medium">{user?.aadhaar || "N/A"}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Orders List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Order History
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {orders.length} order{orders.length !== 1 ? 's' : ''} found
              </p>
            </div>

            <div className="max-h-[600px] overflow-y-auto">
              {orders.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No orders found for this user.</p>
                </div>
              ) : (
                <div className="divide-y divide-white/10">
                  {orders.map((order, index) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-6 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="text-lg font-semibold text-white">
                            Order #{order._id.slice(-8)}
                          </h4>
                          <p className="text-sm text-slate-400">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })} at {new Date(order.createdAt).toLocaleTimeString('en-IN', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-400">
                            {formatCurrency(order.total)}
                          </div>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="mb-4">
                        <div className="text-sm text-slate-400 mb-2">Items:</div>
                        <div className="space-y-1">
                          {order.items?.map((item, idx) => (
                            <div key={idx} className="text-sm text-white bg-slate-900/50 px-3 py-2 rounded-lg">
                              • {item.name || item.service} {item.quantity ? `(x${item.quantity})` : ""}
                            </div>
                          )) || <div className="text-sm text-slate-500">No items listed</div>}
                        </div>
                      </div>

                      {/* Status Controls */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex-1">
                          <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">
                            Order Status
                          </label>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            className={`w-full px-3 py-2 rounded-xl border font-medium transition-colors ${STATUS_COLORS[order.status]}`}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="CONFIRMED">Confirmed</option>
                            <option value="SHIPPED">Shipped</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="CANCELLED">Cancelled</option>
                          </select>
                        </div>

                        <div className="flex-1">
                          <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">
                            Payment Status
                          </label>
                          <select
                            value={order.paymentStatus}
                            onChange={(e) => updatePaymentStatus(order._id, e.target.value)}
                            className={`w-full px-3 py-2 rounded-xl border font-medium transition-colors ${PAYMENT_COLORS[order.paymentStatus]}`}
                          >
                            <option value="PENDING">Pending</option>
                            <option value="PAID">Paid</option>
                            <option value="FAILED">Failed</option>
                          </select>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Live Chat */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Live Chat with User
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                Real-time communication
              </p>
            </div>
            <div className="h-[600px]">
              <FirebaseChatComponent
                currentUser={adminId ? { _id: adminId, name: "Admin", email: "admin@alphaaryx.com" } : undefined}
                chatWithUser={user}
                isAdminView={true}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}