"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { X, ShoppingCart, LogIn, UserPlus } from "lucide-react";
import { getUser } from "@/utils/auth";

// 🏢 CSC SERVICES
const allServices = [
  { id: 1, name: "Income Certificate", price: 149 },
  { id: 2, name: "Caste Certificate", price: 149 },
  { id: 3, name: "Domicile Certificate", price: 149 },
  { id: 4, name: "PAN Card Apply", price: 299 },
  { id: 5, name: "Aadhaar Update", price: 149 },
  { id: 6, name: "Voter ID Apply", price: 199 },
  { id: 7, name: "Scholarship Form", price: 249 },
  { id: 8, name: "Job Form Apply", price: 199 },
  { id: 9, name: "Ayushman Card", price: 149 },
  { id: 10, name: "Ration Card", price: 199 },
  { id: 11, name: "Driving License Apply", price: 399 },
  { id: 12, name: "Vehicle RC Work", price: 299 },
  { id: 13, name: "Electricity Bill Payment", price: 99 },
  { id: 14, name: "Water Bill Payment", price: 99 },
  { id: 15, name: "AEPS Banking Service", price: 149 },
  { id: 16, name: "Full CSC Service Package", price: 1999 },
];

export default function CSCOrderPage() {
  const { addToCart } = useCart();

  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState(null);
  const [user, setUser] = useState(null);

  // Check authentication on mount
  useEffect(() => {
    const currentUser = getUser();
    setUser(currentUser);
  }, []);

  // ✅ CUSTOM SERVICE STATES (ADDED ONLY)
  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  const showToast = (message) => {
    setToast(message);

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    setTimeout(() => setToast(null), 2000);
  };

  const toggleService = (service) => {
    const exists = selected.some((x) => x.id === service.id);

    if (exists) {
      setSelected(selected.filter((x) => x.id !== service.id));
    } else {
      setSelected([...selected, service]);
      showToast(`✔ ${service.name} added to cart`);
    }
  };

  const removeItem = (item) => {
    setSelected(selected.filter((x) => x.id !== item.id));
  };

  // ✅ CUSTOM SERVICE ADD FUNCTION (ADDED ONLY)
  const addCustomService = () => {
    if (!customName || !customPrice) return;

    const newService = {
      id: Date.now(),
      name: customName,
      price: Number(customPrice),
    };

    setSelected([...selected, newService]);
    showToast(`✔ ${customName} added to cart`);

    setCustomName("");
    setCustomPrice("");
  };

  const total = useMemo(() => {
    return selected.reduce((sum, item) => sum + item.price, 0);
  }, [selected]);

  const discount = selected.length >= 5 ? 0.1 : 0;
  const finalTotal = total - total * discount;

  const handleCheckout = () => {
    addToCart({
      service: "CSC Services",
      items: selected,
      total: finalTotal,
    });

    showToast("🚀 Checkout successful!");
  };

  return (
    <div className="min-h-screen text-white bg-[#05080f]">
      <Navbar />

      {/* AUTHENTICATION CHECK */}
      {!user ? (
        <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
          <div className="max-w-md p-8 border rounded-2xl border-white/10 bg-white/5">
            <h1 className="mb-4 text-3xl font-bold text-green-400">
              🔒 Authentication Required
            </h1>
            <p className="mb-6 text-gray-400">
              You need to be logged in to order services. Please login or register to continue.
            </p>
            <div className="flex flex-col gap-3">
              <Link href="/login">
                <button className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white bg-green-500 rounded-xl hover:bg-green-600">
                  <LogIn size={18} />
                  Login
                </button>
              </Link>
              <Link href="/register">
                <button className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-white border border-green-500 rounded-xl hover:bg-green-500/10">
                  <UserPlus size={18} />
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* TOAST */}
          <AnimatePresence>
            {toast && (
              <motion.div
                initial={{ opacity: 0, y: -50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -50 }}
                className="fixed z-50 px-6 py-3 text-sm font-semibold text-white transform -translate-x-1/2 bg-green-500 shadow-lg left-1/2 top-5 rounded-xl"
              >
                {toast}
              </motion.div>
            )}
          </AnimatePresence>

          {/* HERO */}
          <div className="px-6 py-10 text-center">
            <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text">
              🏢 CSC Services Store
            </h1>
            <p className="mt-2 text-gray-400">
              Choose government services like an eCommerce platform
            </p>
          </div>

          {/* MAIN LAYOUT */}
          <div className="grid gap-8 px-6 pb-16 lg:grid-cols-[1fr_350px]">

            {/* PRODUCTS */}
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">

              {/* EXISTING SERVICES */}
              {allServices.map((service) => {
                const active = selected.some((x) => x.id === service.id);

                return (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.05 }}
                    className={`rounded-2xl border p-5 transition-all ${
                      active
                        ? "border-green-400 bg-green-500/10"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <div className="flex items-center justify-center h-32 text-5xl">
                      🏢
                    </div>

                    <h2 className="text-lg font-semibold line-clamp-2">
                      {service.name}
                    </h2>

                    <p className="mt-2 text-2xl font-bold text-green-400">
                      ₹{service.price.toLocaleString("en-IN")}
                    </p>

                    <button
                      onClick={() => toggleService(service)}
                      className={`mt-4 w-full py-2 rounded-lg font-semibold ${
                        active
                          ? "bg-green-500"
                          : "bg-gradient-to-r from-green-500 to-emerald-500"
                      }`}
                    >
                      {active ? "✔ Added" : "Add to Cart"}
                    </button>
                  </motion.div>
                );
              })}

              {/* ✅ CUSTOM SERVICE (ADDED BLOCK ONLY) */}
              <div className="p-5 border rounded-2xl bg-white/5 border-white/10">
                <h3 className="mb-2 font-semibold text-green-400">
                  Custom Service
                </h3>

                <input
                  type="text"
                  placeholder="Service Name"
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  className="w-full p-2 mb-2 text-white bg-black border rounded border-white/10"
                />

                <input
                  type="number"
                  placeholder="Price ₹"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="w-full p-2 mb-2 text-white bg-black border rounded border-white/10"
                />

                <button
                  onClick={addCustomService}
                  className="w-full py-2 mt-2 font-semibold text-white transition bg-green-500 rounded-lg hover:scale-105"
                >
                  Add Custom Service
                </button>
              </div>
            </div>

            {/* CART */}
            <div className="p-6 border rounded-3xl border-white/10 bg-white/5">

              <h2 className="text-2xl font-semibold">Cart Summary 🧾</h2>

              <p className="mt-2 text-sm text-gray-400">
                {selected.length} services selected
              </p>

              <div className="mt-3">
                <AnimatePresence>
                  {selected.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex justify-between p-2 mt-2 rounded bg-white/5"
                    >
                      <span className="text-sm">{item.name}</span>
                      <X
                        className="w-4 h-4 text-red-400 cursor-pointer"
                        onClick={() => removeItem(item)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <h2 className="mt-6 text-2xl font-bold">
                ₹{total.toLocaleString("en-IN")}
              </h2>

              {discount > 0 && (
                <p className="text-sm text-green-400">
                  🎉 10% Discount Applied!
                </p>
              )}

              <h2 className="text-3xl font-bold text-green-400">
                ₹{finalTotal.toLocaleString("en-IN")}
              </h2>

              <motion.button
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.05 }}
                onClick={handleCheckout}
                disabled={selected.length === 0}
                className="flex items-center justify-center w-full gap-2 py-3 mt-5 font-semibold rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 disabled:opacity-50"
              >
                <ShoppingCart size={18} />
                Checkout
              </motion.button>

              <Link href="/cart">
                <button className="w-full py-2 mt-3 border rounded-xl hover:bg-white/10">
                  View Cart →
                </button>
              </Link>
            </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
}