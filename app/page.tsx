"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
import Footer from "@/components/Footer";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-16 h-16 border-4 border-indigo-500 rounded-full border-t-transparent"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* Background blobs */}
      <div className="absolute bg-purple-300 rounded-full top-20 left-10 w-72 h-72 opacity-20 blur-3xl animate-pulse"></div>
      <div className="absolute bg-indigo-300 rounded-full bottom-10 right-10 w-72 h-72 opacity-20 blur-3xl animate-pulse"></div>

      <Navbar />
      <Hero />

      {/* SCROLL TEXT */}
      <section className="py-20 overflow-hidden">
        <div className="flex gap-16 whitespace-nowrap animate-[scroll_20s_linear_infinite] text-3xl font-bold text-gray-200">
          <span>Web Development</span>
          <span>Design</span>
          <span>Legal</span>
          <span>CSC</span>
          <span>Marketing</span>
          <span>AI Solutions</span>
          <span>Everything</span>
        </div>
      </section>

      {/* TRUST */}
      <section className="px-6 py-20 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-gray-800 md:text-4xl"
        >
          Used by Growing Businesses 🚀
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8 mt-10 text-xl text-gray-400">
          <span>Startups</span>
          <span>Students</span>
          <span>Companies</span>
          <span>Creators</span>
        </div>
      </section>

      {/* SERVICES */}
      <ServicesSection />

      {/* FEATURES */}
      <section className="px-6 py-24 md:px-16">
        <div className="grid max-w-6xl gap-10 mx-auto md:grid-cols-3">

          {[
            { title: "Fast Delivery ⚡", desc: "Lightning fast execution" },
            { title: "Premium Quality 💎", desc: "Top-notch work" },
            { title: "24/7 Support 🧠", desc: "Always available" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="p-[1px] rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-500"
            >
              <div className="p-8 bg-white/80 backdrop-blur-xl rounded-2xl">
                <h3 className="mb-2 text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Testimonials />

      {/* CTA */}
      <section className="relative text-center text-white py-28 bg-gradient-to-r from-indigo-600 to-purple-600">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-4xl font-bold md:text-5xl"
        >
          Ready to Build Something Big? 🚀
        </motion.h2>

        <p className="mt-4 text-lg text-white/80">
          From idea to execution — we handle everything.
        </p>

        <button className="px-10 py-4 mt-8 font-semibold text-black bg-white rounded-full shadow-xl">
          Start Your Project
        </button>
      </section>

      <Footer />
    </div>
  );
}