"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  FileText, CreditCard, Globe, Landmark, GraduationCap,
  Briefcase, HeartPulse, Home, Truck, Banknote, Search
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function CSCPage() {

  const [query, setQuery] = useState("");

  // 🔥 Mouse Glow Effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const handleMouse = (e) => {
    mouseX.set(e.clientX - 200);
    mouseY.set(e.clientY - 200);
  };

  // 🔥 SERVICES WITH PRICE
  const categories = [
    {
      title: "Documents",
      items: [
        { icon: <FileText />, name: "Income Certificate", price: "₹99" },
        { icon: <FileText />, name: "Caste Certificate", price: "₹99" },
        { icon: <FileText />, name: "Domicile Certificate", price: "₹99" }
      ]
    },
    {
      title: "Identity",
      items: [
        { icon: <CreditCard />, name: "PAN Card", price: "₹199" },
        { icon: <CreditCard />, name: "Aadhaar Update", price: "₹99" },
        { icon: <Landmark />, name: "Voter ID", price: "₹149" }
      ]
    },
    {
      title: "Education & Jobs",
      items: [
        { icon: <GraduationCap />, name: "Scholarships", price: "₹199" },
        { icon: <Briefcase />, name: "Job Forms", price: "₹149" }
      ]
    },
    {
      title: "Health & Welfare",
      items: [
        { icon: <HeartPulse />, name: "Ayushman Card", price: "₹99" },
        { icon: <Home />, name: "Ration Card", price: "₹149" }
      ]
    },
    {
      title: "Transport",
      items: [
        { icon: <Truck />, name: "Driving License", price: "₹299" },
        { icon: <Truck />, name: "Vehicle RC", price: "₹199" }
      ]
    },
    {
      title: "Utilities & Banking",
      items: [
        { icon: <Globe />, name: "Electricity Bill", price: "₹49" },
        { icon: <Globe />, name: "Water Bill", price: "₹49" },
        { icon: <Banknote />, name: "AEPS Banking", price: "₹99" }
      ]
    }
  ];

  const filtered = (items) =>
    items.filter((i) =>
      i.name.toLowerCase().includes(query.toLowerCase())
    );

  return (
    <div
      onMouseMove={handleMouse}
      className="relative min-h-screen overflow-hidden text-white bg-[#05080f]"
    >
      <Navbar />

      {/* 🔥 Mouse Glow */}
      <motion.div
        style={{ left: smoothX, top: smoothY }}
        className="fixed w-[350px] h-[350px] bg-green-500/20 rounded-full blur-[140px] pointer-events-none"
      />

      {/* 🌌 Background Blobs */}
      <div className="absolute w-[400px] h-[400px] bg-green-500/10 blur-[120px] top-0 left-0"></div>
      <div className="absolute w-[400px] h-[400px] bg-blue-500/10 blur-[120px] bottom-0 right-0"></div>

      <div className="relative z-10 px-6 mx-auto py-14 max-w-7xl">

        {/* 🔥 HERO */}
        <section className="mb-16 text-center">
          <h1 className="text-5xl font-bold md:text-6xl">
            AlphaAryx <span className="text-green-400">CSC</span>
          </h1>

          <p className="mt-4 text-gray-400">
            Fast & secure government services 🚀
          </p>

          {/* SEARCH */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center gap-3 bg-[#0c111a] px-4 py-3 rounded-full w-full max-w-md border border-white/10">
              <Search />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search service..."
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>
        </section>

        {/* 🔥 SERVICES */}
        <div className="space-y-14">

          {categories.map((cat, i) => {
            const list = filtered(cat.items);
            if (!list.length) return null;

            return (
              <section key={i}>
                <h2 className="mb-5 text-xl text-green-400">
                  {cat.title}
                </h2>

                <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                  {list.map((item, j) => (
                    <motion.div
                      key={j}
                      whileHover={{ scale: 1.08, rotateY: 10 }}
                      className="group relative h-[200px] perspective-[1200px]"
                    >

                      {/* FRONT */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-[#0c111a] border border-white/10 rounded-2xl group-hover:opacity-0 transition">
                        <div className="mb-3 text-3xl text-green-400">
                          {item.icon}
                        </div>
                        <h3>{item.name}</h3>
                        <p className="mt-1 text-green-400">
                          {item.price}
                        </p>
                      </div>

                      {/* HOVER */}
                      <div className="absolute inset-0 flex flex-col justify-between p-5 transition border opacity-0 group-hover:opacity-100 bg-gradient-to-br from-black to-green-900/40 rounded-2xl border-white/10">

                        <div>
                          <h3 className="font-bold text-green-400">
                            {item.name}
                          </h3>

                          <ul className="mt-2 space-y-1 text-sm text-gray-300">
                            <li>✔ Fast Processing</li>
                            <li>✔ Government Approved</li>
                            <li>✔ Secure Data</li>
                          </ul>
                        </div>

                        <div>
                          <p className="text-xl font-bold text-green-400">
                            {item.price}
                          </p>

                          <Link href="/services/csc/order">
                            <button className="w-full py-2 mt-3 transition bg-green-500 rounded-lg hover:scale-105">
                              Apply Now 🚀
                            </button>
                          </Link>
                        </div>
                      </div>

                    </motion.div>
                  ))}

                </div>
              </section>
            );
          })}
        </div>

        {/* 💰 PRICING PLANS */}
        <section className="grid gap-8 mt-24 md:grid-cols-3">

          {[
            { name: "Basic", price: "₹499" },
            { name: "Standard", price: "₹1499" },
            { name: "Premium", price: "₹2999" }
          ].map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="p-8 text-center border bg-white/5 border-white/10 rounded-3xl"
            >
              <h3 className="text-xl">{p.name}</h3>
              <p className="mt-3 text-3xl text-green-400">
                {p.price}
              </p>

              <Link href="/services/csc/order">
                <button className="px-6 py-2 mt-6 bg-green-500 rounded-full">
                  Choose Plan
                </button>
              </Link>
            </motion.div>
          ))}

        </section>

        {/* 🚀 CTA */}
        <section className="mt-20 text-center">
          <h2 className="text-4xl font-bold">
            Apply Any Service Easily 🚀
          </h2>

          <Link href="/services/csc/order">
            <button className="px-10 py-3 mt-6 bg-green-500 rounded-full hover:scale-105">
              Start Now
            </button>
          </Link>
        </section>

      </div>

      <Footer />
    </div>
  );
}