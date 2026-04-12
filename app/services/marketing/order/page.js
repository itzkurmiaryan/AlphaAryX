"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { X, ShoppingCart } from "lucide-react";

// ✅ SERVICES
const allServices = [
  { id: 1, name: "Social Media Marketing", price: 999 },
  { id: 2, name: "Instagram Growth Strategy", price: 799 },
  { id: 3, name: "Facebook Page Setup", price: 499 },
  { id: 4, name: "Content Marketing", price: 999 },
  { id: 5, name: "Email Marketing", price: 799 },
  { id: 6, name: "WhatsApp Marketing", price: 699 },
  { id: 7, name: "Facebook Ads Setup", price: 1499 },
  { id: 8, name: "Google Ads Setup", price: 1999 },
  { id: 9, name: "Lead Generation Campaign", price: 2999 },
  { id: 10, name: "Sales Funnel Setup", price: 3999 },
  { id: 11, name: "Retargeting Ads", price: 2499 },
  { id: 12, name: "SEO Optimization", price: 1499 },
  { id: 13, name: "Keyword Research", price: 699 },
  { id: 14, name: "On-Page SEO", price: 999 },
  { id: 15, name: "Off-Page SEO", price: 1299 },
  { id: 16, name: "Technical SEO", price: 1999 },
  { id: 17, name: "Brand Strategy", price: 1999 },
  { id: 18, name: "Competitor Analysis", price: 999 },
  { id: 19, name: "Market Research", price: 1499 },
  { id: 20, name: "Business Growth Plan", price: 2499 },
  { id: 21, name: "Full Business Marketing Setup", price: 4999 },
  { id: 22, name: "Startup Launch Strategy", price: 6999 },
  { id: 23, name: "Corporate Marketing Plan", price: 8999 },
  { id: 24, name: "Agency Level Campaign Setup", price: 9999 },
  { id: 25, name: "Monthly Social Media Management", price: 3999 },
  { id: 26, name: "Monthly Ads Management", price: 4999 },
  { id: 27, name: "Complete Digital Marketing Monthly", price: 7999 },
  { id: 28, name: "Full Brand Growth Package", price: 9999 },
];

export default function MarketingOrderPage() {
  const { addToCart } = useCart();

  const [selected, setSelected] = useState([]);
  const [toast, setToast] = useState(null);

  // ✅ NEW: CUSTOM SERVICE STATE (ADDED ONLY)
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

  const total = useMemo(() => {
    return selected.reduce((sum, item) => sum + item.price, 0);
  }, [selected]);

  const discount = selected.length >= 5 ? 0.1 : 0;
  const finalTotal = total - total * discount;

  const handleCheckout = () => {
    addToCart({
      service: "Marketing Services",
      items: selected,
      total: finalTotal,
    });

    showToast("🚀 Checkout successful!");
  };

  // ✅ NEW: ADD CUSTOM SERVICE FUNCTION
  const addCustomService = () => {
    if (!customName || !customPrice) return;

    const newService = {
      id: Date.now(),
      name: customName,
      price: Number(customPrice),
    };

    setSelected([...selected, newService]);
    showToast(`✔ Custom service added`);

    setCustomName("");
    setCustomPrice("");
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
        <h1 className="text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text">
          🚀 Marketing Services Store
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
                className={`rounded-2xl border p-5 ${
                  active
                    ? "border-blue-400 bg-blue-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-center justify-center h-32 text-5xl">
                  📊
                </div>

                <h2 className="text-lg font-semibold">{service.name}</h2>

                <p className="mt-2 text-2xl font-bold text-blue-400">
                  ₹{service.price.toLocaleString("en-IN")}
                </p>

                <button
                  onClick={() => toggleService(service)}
                  className={`mt-4 w-full py-2 rounded-lg font-semibold ${
                    active
                      ? "bg-green-500"
                      : "bg-gradient-to-r from-blue-500 to-purple-500"
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

          {/* ✅ NEW: CUSTOM SERVICE INPUT */}
          <div className="p-3 mt-4 border rounded-xl border-white/10">
            <p className="mb-2 text-sm font-semibold text-gray-300">
              Add Custom Service
            </p>

            <input
              type="text"
              placeholder="Service name"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
              className="w-full p-2 mb-2 text-white bg-black border rounded"
            />

            <input
              type="number"
              placeholder="Price"
              value={customPrice}
              onChange={(e) => setCustomPrice(e.target.value)}
              className="w-full p-2 mb-2 text-white bg-black border rounded"
            />

            <button
              onClick={addCustomService}
              className="w-full py-2 text-sm font-semibold bg-purple-500 rounded-lg"
            >
              + Add Custom Service
            </button>
          </div>

          <div className="mt-3">
            {selected.map((item) => (
              <div
                key={item.id}
                className="flex justify-between p-2 mt-2 rounded bg-white/5"
              >
                <span className="text-sm">{item.name}</span>
                <X
                  className="w-4 h-4 text-red-400 cursor-pointer"
                  onClick={() => removeItem(item)}
                />
              </div>
            ))}
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

          <button
            disabled={selected.length === 0}
            onClick={handleCheckout}
            className="flex items-center justify-center w-full gap-2 py-3 mt-5 font-semibold rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 disabled:opacity-50"
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