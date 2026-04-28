"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { X, ShoppingCart, LogIn, UserPlus } from "lucide-react";
import { getUser } from "@/utils/auth";

/* ================= TECH SERVICES ================= */

const allServices = [
  { id: 1, name: "Full Stack Web App", price: 4999 },
  { id: 2, name: "Landing Page Development", price: 1999 },
  { id: 3, name: "Portfolio Website", price: 2499 },
  { id: 4, name: "E-commerce Website", price: 6999 },
  { id: 5, name: "SaaS Platform Development", price: 9999 },

  { id: 6, name: "Backend API Development", price: 3999 },
  { id: 7, name: "Authentication System", price: 1999 },
  { id: 8, name: "Database Design & Setup", price: 1499 },
  { id: 9, name: "REST / GraphQL API", price: 2999 },

  { id: 10, name: "Mobile App (React Native)", price: 6999 },
  { id: 11, name: "Flutter App Development", price: 7499 },

  { id: 12, name: "AI Chatbot Development", price: 4999 },
  { id: 13, name: "AI Automation System", price: 7999 },
  { id: 14, name: "Custom AI Tool", price: 9999 },

  { id: 15, name: "Cloud Deployment (AWS/Vercel)", price: 1999 },
  { id: 16, name: "Docker Setup", price: 1499 },
  { id: 17, name: "CI/CD Pipeline Setup", price: 2499 },

  { id: 18, name: "Website Optimization", price: 1999 },
  { id: 19, name: "SEO Optimization", price: 1499 },
  { id: 20, name: "Security Hardening", price: 2999 },

  { id: 21, name: "Web3 DApp Development", price: 14999 },
  { id: 22, name: "Smart Contract Development", price: 9999 },

  { id: 23, name: "Startup MVP Build", price: 14999 },
  { id: 24, name: "Enterprise System Development", price: 19999 },

  { id: 25, name: "Monthly Maintenance", price: 4999 },
  { id: 26, name: "DevOps Monthly Support", price: 7999 },
  { id: 27, name: "AI System Maintenance", price: 9999 },
  { id: 28, name: "Dedicated Developer (Monthly)", price: 24999 },
];

/* ================= PAGE ================= */

export default function TechOrderPage() {
  const { addToCart } = useCart();

  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null);

  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  useEffect(() => {
    setUser(getUser());
  }, []);

  const showToast = (message) => {
    setToast(message);
    if (navigator.vibrate) navigator.vibrate(100);
    setTimeout(() => setToast(null), 2000);
  };

  const toggleService = (service) => {
    const exists = selected.some((x) => x.id === service.id);

    if (exists) {
      setSelected(selected.filter((x) => x.id !== service.id));
    } else {
      setSelected([...selected, service]);
      showToast(`✔ ${service.name} added`);
    }
  };

  const removeItem = (item) => {
    setSelected(selected.filter((x) => x.id !== item.id));
  };

  const total = useMemo(() => {
    return selected.reduce((sum, item) => sum + item.price, 0);
  }, [selected]);

  const discount = selected.length >= 5 ? 0.1 : 0;
  const finalTotal = total - total * discount;

  const handleCheckout = () => {
    addToCart({
      service: "Tech Services",
      items: selected,
      total: finalTotal,
    });

    showToast("🚀 Order Placed!");
  };

  if (!user) {
    return (
      <div className="min-h-screen text-white bg-[#060913]">
        <Navbar />
        <div className="px-6 py-24">
          <div className="max-w-xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
            <h1 className="text-4xl font-bold mb-4">🔒 Authentication Required</h1>
            <p className="text-gray-300">
              You need to be logged in to order services. Please login or register to continue.
            </p>
            <div className="flex flex-col gap-3 mt-8 sm:flex-row sm:justify-center">
              <Link href="/login" className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-black rounded-lg bg-yellow-400 sm:w-auto">
                Login
                <LogIn className="w-4 h-4 ml-2" />
              </Link>
              <Link href="/register" className="inline-flex items-center justify-center w-full px-6 py-3 text-sm font-semibold text-black rounded-lg bg-white/10 border border-white/20 sm:w-auto">
                Register
                <UserPlus className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const addCustomService = () => {
    if (!customName || !customPrice) return;

    const newService = {
      id: Date.now(),
      name: customName,
      price: Number(customPrice),
    };

    setSelected([...selected, newService]);
    showToast("✔ Custom service added");

    setCustomName("");
    setCustomPrice("");
  };

  return (
    <div className="min-h-screen text-white bg-[#060913]">

      <Navbar />

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="fixed z-50 px-6 py-3 text-sm font-semibold text-white transform -translate-x-1/2 shadow-lg bg-cyan-500 left-1/2 top-5 rounded-xl"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <div className="px-6 py-10 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
          ⚡ Tech Services Store
        </h1>
        <p className="mt-2 text-gray-400">
          Build your tech stack like an eCommerce order
        </p>
      </div>

      <div className="grid gap-8 px-6 pb-16 lg:grid-cols-[1fr_350px]">

        {/* SERVICES GRID */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {allServices.map((service) => {
            const active = selected.some((x) => x.id === service.id);

            return (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.05 }}
                className={`rounded-2xl border p-5 ${
                  active
                    ? "border-cyan-400 bg-cyan-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-center justify-center h-32 text-5xl">
                  ⚙️
                </div>

                <h2 className="text-lg font-semibold">{service.name}</h2>

                <p className="mt-2 text-2xl font-bold text-cyan-400">
                  ₹{service.price.toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => toggleService(service)}
                  className={`mt-4 w-full py-2 rounded-lg font-semibold ${
                    active
                      ? "bg-green-500"
                      : "bg-gradient-to-r from-cyan-500 to-blue-600"
                  }`}
                >
                  {active ? "✔ Added" : "Add to Cart"}
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* CART */}
        <div className="p-6 border rounded-3xl border-white/10 bg-white/5">
          <h2 className="text-2xl font-semibold">Cart Summary 🧾</h2>

          <p className="mt-2 text-sm text-gray-400">
            {selected.length} services selected
          </p>

          {/* CUSTOM */}
          <div className="p-3 mt-4 border rounded-xl border-white/10">
            <p className="mb-2 text-sm text-gray-300">Custom Service</p>

            <input
              type="text"
              placeholder="Service name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full p-2 mb-2 bg-black border rounded"
            />

            <input
              type="number"
              placeholder="Price"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              className="w-full p-2 mb-2 bg-black border rounded"
            />

            <button
              onClick={addCustomService}
              className="w-full py-2 bg-blue-500 rounded-lg"
            >
              + Add
            </button>
          </div>

          {/* ITEMS */}
          <div className="mt-3">
            {selected.map((item) => (
              <div key={item.id}
                className="flex justify-between p-2 mt-2 rounded bg-white/5">
                <span className="text-sm">{item.name}</span>
                <X className="w-4 h-4 text-red-400 cursor-pointer"
                  onClick={() => removeItem(item)} />
              </div>
            ))}
          </div>

          {/* TOTAL */}
          <h2 className="mt-6 text-2xl font-bold">
            ₹{total.toLocaleString("en-IN")}
          </h2>

          {discount > 0 && (
            <p className="text-sm text-green-400">
              🎉 10% Discount Applied
            </p>
          )}

          <h2 className="text-3xl font-bold text-green-400">
            ₹{finalTotal.toLocaleString("en-IN")}
          </h2>

          <button
            disabled={selected.length === 0}
            onClick={handleCheckout}
            className="flex items-center justify-center w-full gap-2 py-3 mt-5 font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 disabled:opacity-50"
          >
            <ShoppingCart size={18} />
            Checkout
          </button>

          <Link href="/cart">
            <button className="w-full py-2 mt-3 border rounded-xl hover:bg-white/10">
              View Cart →
            </button>
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
}