"use client";

import { useCart } from "@/components/CartContext";
import { motion } from "framer-motion";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, CreditCard, MessageCircle } from "lucide-react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.reduce((a, b) => a + (b.price || b.total), 0);

  /* ================= PLACE ORDER (BACKEND CONNECTED) ================= */
  const placeOrder = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
          total,
          status: "PAY_AFTER_WORK",
          createdAt: new Date().toISOString(),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setOrderPlaced(true);
        clearCart?.();
      } else {
        alert("Order failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Server error!");
    }

    setLoading(false);
  };

  /* ================= WHATSAPP ORDER ================= */
  const sendWhatsApp = () => {
    const message = `
🧾 NEW TECH ORDER

${cart
  .map((i) => `• ${i.name || i.service} - ₹${i.price || i.total}`)
  .join("\n")}

💰 Total: ₹${total}

💡 Payment: Pay After Work
📌 We will send UPI / QR after completion
`;

    const url = `https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen text-white bg-[#05080f]">

      <Navbar />

      {/* GLOW EFFECTS */}
      <div className="fixed top-10 left-10 w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full" />
      <div className="fixed bottom-0 right-0 w-[300px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full" />

      <div className="relative z-10 px-6 py-12">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-5xl font-bold text-center text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text"
        >
          Pay After Work Checkout ⚡
        </motion.h1>

        <div className="max-w-4xl mx-auto">

          {/* ORDER BOX */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 border shadow-2xl bg-white/5 rounded-3xl border-white/10 backdrop-blur-xl"
          >

            {/* ITEMS */}
            <h2 className="mb-6 text-2xl font-semibold">
              Order Summary 🧾
            </h2>

            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">

              {cart.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between p-4 border rounded-xl bg-white/5 border-white/10"
                >
                  <p className="font-semibold">
                    {item.name || item.service}
                  </p>

                  <p className="font-bold text-cyan-400">
                    ₹{item.price || item.total}
                  </p>
                </div>
              ))}

            </div>

            {/* TOTAL */}
            <div className="flex justify-between pt-6 mt-6 text-2xl font-bold border-t border-white/10">
              <span>Total</span>
              <span className="text-cyan-400">₹{total}</span>
            </div>

            {/* TRUST BADGES */}
            <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
              <ShieldCheck size={18} className="text-green-400" />
              Pay After Work System
              <CreditCard size={18} className="ml-4 text-cyan-400" />
              Manual Secure Payment
            </div>

            {/* INFO BOX */}
            <div className="p-4 mt-6 text-sm text-gray-300 border rounded-xl border-white/10 bg-white/5">
              💡 We complete your project first. After delivery we send UPI / QR for payment.
            </div>

            {/* BUTTONS */}
            <div className="mt-6 space-y-3">

              {/* PLACE ORDER */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={placeOrder}
                disabled={loading}
                className="w-full py-4 text-lg font-semibold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600"
              >
                {loading ? "Placing Order..." : "Place Order 🚀"}
              </motion.button>

              {/* WHATSAPP */}
              <button
                onClick={sendWhatsApp}
                className="flex items-center justify-center w-full gap-2 py-3 font-semibold text-green-400 border border-green-400 rounded-xl hover:bg-green-400/10"
              >
                <MessageCircle size={18} />
                Send Order on WhatsApp
              </button>

            </div>

            {/* SUCCESS */}
            {orderPlaced && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 mt-6 text-green-400 border border-green-400 rounded-xl bg-green-400/10"
              >
                ✅ Order Placed Successfully! We will contact you soon.
              </motion.div>
            )}

          </motion.div>

        </div>
      </div>

      <Footer />
    </div>
  );
}