"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";

// ⚖️ ALL LEGAL SERVICES
const allServices = [
  { id: 1, name: "Legal Advice", price: 299 },
  { id: 2, name: "Online Consultation", price: 199 },
  { id: 3, name: "Case Guidance", price: 499 },
  { id: 4, name: "Affidavit Drafting", price: 149 },
  { id: 5, name: "Agreement Drafting", price: 499 },
  { id: 6, name: "Legal Notice", price: 399 },
  { id: 7, name: "Property Documents", price: 699 },
  { id: 8, name: "Company Registration", price: 2999 },
  { id: 9, name: "GST Registration Support", price: 1499 },
  { id: 10, name: "Startup Legal Setup", price: 3999 },
  { id: 11, name: "Court Case Support", price: 1999 },
  { id: 12, name: "Full Legal Consultation Package", price: 2999 },
  { id: 13, name: "Monthly Legal Retainer", price: 4999 },
];

export default function LegalOrderPage() {
  const { addToCart } = useCart();

  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState(null);

  // ✅ CUSTOM SERVICE STATES (ADDED ONLY)
  const [customName, setCustomName] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  // ✅ TOAST SYSTEM (SAME AS MARKETING/VIDEO)
  const showToast = (message) => {
    setToast(message);

    if (navigator.vibrate) {
      navigator.vibrate(100);
    }

    setTimeout(() => setToast(null), 2000);
  };

  // ✅ TOGGLE LOGIC (SAFE ID BASED)
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

  // ➕ CUSTOM SERVICE ADD (ONLY ADDITION)
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

  // ✅ TOTAL
  const total = useMemo(() => {
    return selected.reduce((sum, item) => sum + item.price, 0);
  }, [selected]);

  // ✅ DISCOUNT SYSTEM
  const discount = selected.length >= 5 ? 0.1 : 0;
  const finalTotal = total - total * discount;

  // ✅ CHECKOUT (SAME SYSTEM)
  const handleCheckout = () => {
    addToCart({
      service: "Legal Services",
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

      {/* HERO */}
      <div className="px-6 py-10 text-center">
        <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
          ⚖️ Legal Services Store
        </h1>
        <p className="mt-2 text-gray-400">
          Choose legal services like an eCommerce platform
        </p>
      </div>

      {/* MAIN LAYOUT */}
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
                    ? "border-yellow-400 bg-yellow-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-center justify-center h-32 text-5xl">
                  ⚖️
                </div>

                <h2 className="text-lg font-semibold line-clamp-2">
                  {service.name}
                </h2>

                <p className="mt-2 text-2xl font-bold text-yellow-400">
                  ₹{service.price.toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => toggleService(service)}
                  className={`mt-4 w-full py-2 rounded-lg font-semibold ${
                    active
                      ? "bg-green-500"
                      : "bg-gradient-to-r from-yellow-500 to-orange-500"
                  }`}
                >
                  {active ? "✔ Added" : "Add to Cart"}
                </button>
              </motion.div>
            );
          })}

          {/* ➕ CUSTOM SERVICE UI (ADDED ONLY) */}
          <div className="p-5 border rounded-2xl bg-white/5 border-white/10">
            <h3 className="mb-2 text-yellow-400">Custom Service</h3>

            <input
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              placeholder="Service Name"
              className="w-full p-2 mb-2 text-white bg-black border rounded"
            />

            <input
              type="number"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              placeholder="Price ₹"
              className="w-full p-2 mb-2 text-white bg-black border rounded"
            />

            <button
              onClick={addCustomService}
              className="w-full py-2 font-semibold text-black bg-yellow-400 rounded hover:scale-105"
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
                  <span className="text-sm">{item.name}</span>
                  <X
                    className="w-4 h-4 text-red-400 cursor-pointer"
                    onClick={() => removeItem(item)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* PRICE */}
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

          {/* CHECKOUT */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={handleCheckout}
            disabled={selected.length === 0}
            className="flex items-center justify-center w-full gap-2 py-3 mt-5 font-semibold rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 disabled:opacity-50"
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