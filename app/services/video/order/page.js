"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";

// 🔥 ALL VIDEO SERVICES
const allServices = [
  { id: 1, name: "YouTube Cinematic Edit", price: 499 },
  { id: 2, name: "Reels Viral Edit", price: 299 },
  { id: 3, name: "Instagram Aesthetic Edit", price: 199 },
  { id: 4, name: "Color Grading", price: 399 },
  { id: 5, name: "Cinematic Cuts", price: 499 },
  { id: 6, name: "VFX Effects", price: 699 },
  { id: 7, name: "Sound Design", price: 299 },
  { id: 8, name: "Background Score", price: 199 },
  { id: 9, name: "Audio Sync & Enhancement", price: 249 },
  { id: 10, name: "YouTube Long Video Editing", price: 999 },
  { id: 11, name: "Short Film Editing", price: 1999 },
  { id: 12, name: "Podcast Editing", price: 799 },
  { id: 13, name: "Interview Editing", price: 699 },
  { id: 14, name: "10 Reels Pack", price: 1999 },
  { id: 15, name: "Monthly Video Editing Pack", price: 3999 },
  { id: 16, name: "YouTube Growth Pack", price: 4999 },
];

export default function VideoOrderPage() {
  const { addToCart } = useCart();

  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState(null);

  // 🔥 CUSTOM SERVICE STATES (ADDED ONLY)
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

  // 🔥 ADD CUSTOM SERVICE (ONLY ADDITION)
  const addCustomService = () => {
    if (!customName || !customPrice) return;

    const newService = {
      id: Date.now(), // unique id
      name: customName,
      price: Number(customPrice),
      isCustom: true,
    };

    setSelected([...selected, newService]);
    showToast(`✔ Custom service added`);

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
      service: "Video Editing Services",
      items: selected,
      total: finalTotal,
    });

    showToast("🚀 Checkout successful!");
  };

  return (
    <div className="min-h-screen text-white bg-black">
      <Navbar />

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

      <div className="px-6 py-10 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
          🎬 Video Editing Services Store
        </h1>
        <p className="mt-2 text-gray-400">
          Choose services like an eCommerce platform
        </p>
      </div>

      <div className="grid gap-8 px-6 pb-16 lg:grid-cols-[1fr_350px]">
        {/* PRODUCTS */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {allServices.map((service) => {
            const active = selected.some((x) => x.id === service.id);

            return (
              <motion.div
                key={service.id}
                whileHover={{ scale: 1.05 }}
                className={`rounded-2xl border p-5 transition-all ${
                  active
                    ? "border-purple-400 bg-purple-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-center justify-center h-32 text-5xl">
                  🎬
                </div>

                <h2 className="text-lg font-semibold">{service.name}</h2>

                <p className="mt-2 text-2xl font-bold text-purple-400">
                  ₹{service.price.toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => toggleService(service)}
                  className={`mt-4 w-full py-2 rounded-lg font-semibold ${
                    active
                      ? "bg-green-500"
                      : "bg-gradient-to-r from-purple-500 to-pink-500"
                  }`}
                >
                  {active ? "✔ Added" : "Add to Cart"}
                </button>
              </motion.div>
            );
          })}

          {/* 🔥 CUSTOM SERVICE CARD (ADDED ONLY) */}
          <div className="p-5 border rounded-2xl bg-white/5 border-white/10">
            <h2 className="mb-2 text-lg font-semibold text-cyan-400">
              Custom Service
            </h2>

            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Service Name"
              className="w-full p-2 mb-2 text-white bg-black border border-gray-600 rounded"
            />

            <input
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              type="number"
              placeholder="Price"
              className="w-full p-2 mb-2 text-white bg-black border border-gray-600 rounded"
            />

            <button
              onClick={addCustomService}
              className="w-full py-2 font-semibold text-white rounded-lg bg-cyan-500 hover:bg-cyan-600"
            >
              Add Custom
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
                  <span className="text-sm">
                    {item.name} {item.isCustom && "(Custom)"}
                  </span>

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
            className="flex items-center justify-center w-full gap-2 py-3 mt-5 font-semibold rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 disabled:opacity-50"
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
    </div>
  );
}