"use client";

import { useCart } from "@/components/CartContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Trash2, ShoppingCart } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((a, b) => a + b.price, 0);

  return (
    <div className="min-h-screen text-white bg-black">

      <Navbar />

      {/* 🔥 Background Glow */}
      <div className="fixed top-20 left-20 w-[400px] h-[400px] bg-cyan-500/20 blur-[150px] rounded-full"></div>
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[150px] rounded-full"></div>

      <div className="relative z-10 p-6 md:p-12">

        {/* HEADER */}
        <h1 className="flex items-center gap-3 mb-10 text-4xl font-bold">
          <ShoppingCart className="text-cyan-400" />
          Your Cart 🛒
        </h1>

        {cart.length === 0 ? (
          <div className="mt-20 text-center">
            <h2 className="text-2xl text-gray-400">
              Your cart is empty 😢
            </h2>

            <button
              onClick={() => router.push("/services")}
              className="px-8 py-3 mt-6 transition rounded-full bg-cyan-500 hover:scale-105"
            >
              Browse Services 🚀
            </button>
          </div>
        ) : (
          <div className="grid gap-10 md:grid-cols-3">

            {/* 🛒 ITEMS */}
            <div className="space-y-6 md:col-span-2">

              {cart.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  className="p-6 border shadow-xl bg-white/5 border-white/10 rounded-3xl backdrop-blur-xl"
                >
                  <div className="flex items-center justify-between">

                    <div>
                      <h2 className="text-xl font-semibold">
                        {item.name || item.service}
                      </h2>

                      <p className="mt-1 text-sm text-gray-400">
                        {item.pages && `Pages: ${item.pages}`}
                      </p>

                      {item.features?.map((f, idx) => (
                        <p key={idx} className="text-xs text-gray-500">
                          + {f.name}
                        </p>
                      ))}
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-cyan-400">
                        ₹{item.price || item.total}
                      </p>

                      <button
                        onClick={() => removeFromCart(i)}
                        className="flex items-center gap-1 mt-2 text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>
                    </div>

                  </div>
                </motion.div>
              ))}

            </div>

            {/* 💳 SUMMARY */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky p-6 border shadow-2xl h-fit top-20 bg-gradient-to-br from-white/5 to-white/10 border-white/10 rounded-3xl backdrop-blur-xl"
            >

              <h2 className="mb-4 text-2xl font-bold">
                Order Summary 🧾
              </h2>

              <div className="space-y-2 text-sm text-gray-400">
                {cart.map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span>{item.name || item.service}</span>
                    <span>₹{item.price || item.total}</span>
                  </div>
                ))}
              </div>

              <hr className="my-4 border-white/10" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span className="text-cyan-400">₹{total}</span>
              </div>

              {/* BUTTON */}
              <button
                onClick={() => router.push("/checkout")}
                className="w-full py-3 mt-6 transition rounded-full shadow-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105"
              >
                Proceed to Checkout 💳
              </button>

            </motion.div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}