"use client";

import { motion } from "framer-motion";
import {
  Video,
  Film,
  Music,
  Sparkles,
  Layers,
  Play
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

// 🔥 Categories with pricing
const categories = [
  {
    title: "🔥 Trending Edits",
    items: [
      { icon: <Video />, name: "YouTube Cinematic", price: "₹499" },
      { icon: <Film />, name: "Reels Viral Edit", price: "₹299" },
      { icon: <Sparkles />, name: "Instagram Aesthetic", price: "₹199" }
    ]
  },
  {
    title: "🎬 Pro Editing",
    items: [
      { icon: <Layers />, name: "Color Grading", price: "₹399" },
      { icon: <Sparkles />, name: "VFX Effects", price: "₹699" },
      { icon: <Film />, name: "Cinematic Cuts", price: "₹499" }
    ]
  },
  {
    title: "🎧 Audio Magic",
    items: [
      { icon: <Music />, name: "Sound Design", price: "₹299" },
      { icon: <Music />, name: "Background Score", price: "₹199" }
    ]
  }
];

export default function VideoEditingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-black">
      
      <Navbar />

      {/* 🔥 Animated Background */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        className="absolute w-[700px] h-[700px] bg-purple-600/20 blur-[200px] top-[-200px] left-[-200px] rounded-full"
      />

      <div className="relative z-10 px-6 py-16 mx-auto max-w-7xl">

        {/* ================= HERO ================= */}
        <section className="mb-20 text-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-6xl font-extrabold leading-tight md:text-7xl"
          >
            AlphaAryX 🎬
            <br />
            <span className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
              Video Editing Studio
            </span>
          </motion.h1>

          <p className="max-w-xl mx-auto mt-6 text-lg text-gray-400">
            Transform your raw clips into cinematic & viral content 🚀
          </p>

          <Link href="/services/video/order">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-10 py-4 mt-8 font-semibold rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Start Your Project 🚀
            </motion.button>
          </Link>
        </section>

        {/* ================= VIDEO PREVIEW ================= */}
        <section className="flex justify-center mb-20">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-full max-w-3xl h-[260px] bg-gradient-to-br from-purple-500/20 to-black border border-white/10 rounded-2xl flex items-center justify-center relative"
          >
            <Play className="text-white w-14 h-14 opacity-80" />
            <p className="absolute text-xs text-gray-400 bottom-3">
              Preview your cinematic edit
            </p>
          </motion.div>
        </section>

        {/* ================= SERVICES ================= */}
        <div className="space-y-16">
          {categories.map((cat, i) => (
            <section key={i}>
              <h2 className="mb-6 text-2xl text-purple-400">{cat.title}</h2>

              <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {cat.items.map((item, j) => (
                  <motion.div
                    key={j}
                    whileHover={{ scale: 1.08, rotateX: 6, rotateY: -6 }}
                    className="relative p-6 overflow-hidden border shadow-lg group bg-gradient-to-br from-[#0c111a] to-[#0a0f17] border-white/10 rounded-2xl"
                  >
                    {/* FRONT */}
                    <div className="transition group-hover:opacity-0">
                      <div className="mb-4 text-3xl text-purple-400">
                        {item.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="mt-2 text-purple-400">{item.price}</p>
                    </div>

                    {/* HOVER */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 transition opacity-0 bg-gradient-to-br from-black/90 to-purple-900/40 group-hover:opacity-100 rounded-2xl">
                      <div>
                        <h3 className="text-lg font-bold text-purple-400">
                          {item.name}
                        </h3>
                        <ul className="mt-3 space-y-1 text-sm text-gray-300">
                          <li>✔ High Quality Edit</li>
                          <li>✔ Fast Delivery</li>
                          <li>✔ Viral Ready</li>
                        </ul>
                      </div>

                      <div>
                        <p className="text-xl font-bold text-purple-400">
                          {item.price}
                        </p>

                        <Link href="/services/video/order">
                          <button className="w-full py-2 mt-3 transition bg-purple-500 rounded-lg hover:scale-105">
                            Order Now 🎬
                          </button>
                        </Link>
                      </div>
                    </div>

                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ================= TRUST ================= */}
        <section className="grid gap-6 mt-24 text-center md:grid-cols-3">
          {["🔥 Viral Growth", "🎯 High Engagement", "💎 Premium Quality"].map((t, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              className="p-6 bg-[#0c111a] border border-white/10 rounded-xl"
            >
              {t}
            </motion.div>
          ))}
        </section>

        {/* ================= CTA ================= */}
        <section className="mt-24 text-center">
          <h2 className="text-4xl font-bold md:text-6xl">
            Let’s Make Your Video Viral 🚀
          </h2>

          <Link href="/services/video/order">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-10 py-3 mt-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
            >
              Place Order 🚀
            </motion.button>
          </Link>
        </section>

      </div>

      {/* FLOAT BUTTON */}
      <a
        href="https://wa.me/917524917394"
        className="fixed px-5 py-3 bg-green-500 rounded-full shadow-lg bottom-6 right-6 hover:scale-110"
      >
        💬
      </a>

      <Footer />
    </div>
  );
}