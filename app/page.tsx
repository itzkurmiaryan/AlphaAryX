"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Hero from "@/components/Hero";
import ServicesSection from "@/components/ServicesSection";
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

    {/* VEDA — ALPHAARYX PRODUCT */}
<section className="relative px-6 py-28 overflow-hidden md:px-16">

  {/* Background */}
  <div className="absolute w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl top-10 left-[-150px]" />
  <div className="absolute w-96 h-96 bg-blue-300/20 rounded-full blur-3xl bottom-10 right-[-150px]" />

  <div className="relative z-10 max-w-6xl mx-auto">

    {/* Product label */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mb-12 text-center"
    >
      <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-cyan-700 border border-cyan-200 rounded-full bg-cyan-50">
        <span className="w-2 h-2 bg-cyan-500 rounded-full" />
        An AlphaAryX Product
      </span>
    </motion.div>

    <div className="grid items-center gap-12 md:grid-cols-2">

      {/* LEFT */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >

        <div className="flex items-center gap-3 mb-5">
          <div className="flex items-center justify-center w-12 h-12 text-xl font-black text-white rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">
            V
          </div>

          <div>
            <p className="text-xl font-bold text-gray-900">
              Veda
            </p>

            <p className="text-xs tracking-wider text-gray-400 uppercase">
              Smart Healthcare
            </p>
          </div>
        </div>

        <h2 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
          Our product for
          <span className="block text-cyan-500">
            smarter healthcare.
          </span>
        </h2>

        <p className="max-w-xl mt-6 text-lg leading-8 text-gray-500">
          Veda is an in-house product by AlphaAryX, built to make
          doctor, patient and visit management simple, organized
          and efficient.
        </p>

        <div className="flex flex-col gap-4 mt-8 sm:flex-row">

          <a
            href="/veda"
            className="inline-flex items-center justify-center px-7 py-4 font-semibold text-white transition rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:shadow-xl hover:shadow-cyan-500/20 hover:-translate-y-0.5"
          >
            Explore Veda
          </a>

          <a
            href="/veda.apk"
            download="Veda.apk"
            className="inline-flex items-center justify-center px-7 py-4 font-semibold text-gray-800 transition border border-gray-200 rounded-2xl bg-white hover:bg-gray-50 hover:-translate-y-0.5"
          >
            Download APK
          </a>

        </div>

        {/* Product identity */}
        <div className="flex flex-wrap gap-6 mt-8 text-sm text-gray-400">
          <span>Built by AlphaAryX</span>
          <span>•</span>
          <span>Healthcare Technology</span>
        </div>

      </motion.div>


      {/* RIGHT — PRODUCT CARD */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="relative"
      >

        <div className="absolute inset-0 bg-cyan-400/20 rounded-[40px] blur-3xl" />

        <div className="relative p-8 border border-white/20 shadow-2xl rounded-[32px] bg-slate-950">

          {/* Product Header */}
          <div className="flex items-center justify-between">

            <div className="flex items-center gap-5">

              <div className="flex items-center justify-center w-20 h-20 text-4xl font-black text-white rounded-3xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">
                V
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  Veda
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Smart Healthcare
                </p>
              </div>

            </div>

            <div className="hidden px-3 py-1 text-xs font-medium text-cyan-300 border rounded-full sm:block border-cyan-400/20 bg-cyan-400/10">
              AlphaAryX
            </div>

          </div>


          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mt-8">

            {[
              "Doctor Management",
              "Patient Records",
              "Visit Management",
              "Analytics",
            ].map((item) => (
              <div
                key={item}
                className="p-4 transition border rounded-2xl border-white/10 bg-white/5 hover:bg-white/10"
              >
                <div className="w-2 h-2 mb-3 rounded-full bg-cyan-400" />

                <p className="text-sm font-medium text-slate-200">
                  {item}
                </p>
              </div>
            ))}

          </div>


          {/* Product statement */}
          <div className="p-5 mt-6 border rounded-2xl border-cyan-400/10 bg-cyan-400/5">

            <p className="text-xs font-medium tracking-wider text-cyan-400 uppercase">
              AlphaAryX Product
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Built in-house to bring a smarter and more organized
              approach to healthcare management.
            </p>

          </div>

        </div>

      </motion.div>

    </div>
  </div>
</section>

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

    </div>
  );
}