"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { Building2, Ruler, Home, Compass } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function ArchitecturePage() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 120 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 120 });

  const { scrollY } = useScroll();
  const scaleBuilding = useTransform(scrollY, [0, 500], [0.8, 1.2]);

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX - 200);
      mouseY.set(e.clientY - 200);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  // 🔥 NEW ARCHITECTURE SERVICES
  const services = [
    {
      name: "2D Floor Plan",
      price: "₹199",
      details: ["✔ Accurate Layout", "✔ Dimensions", "✔ Printable"],
    },
    {
      name: "3D Elevation Design",
      price: "₹499",
      details: ["✔ Realistic View", "✔ Modern Design", "✔ HD Output"],
    },
    {
      name: "House Planning",
      price: "₹299",
      details: ["✔ Vastu Friendly", "✔ Space Optimization", "✔ Custom"],
    },
    {
      name: "Interior Layout",
      price: "₹399",
      details: ["✔ Furniture Layout", "✔ Modern Style", "✔ 3D Ready"],
    },
    {
      name: "Commercial Building Design",
      price: "₹999",
      details: ["✔ Shops/Offices", "✔ Full Plan", "✔ Professional"],
    },
    {
      name: "Full Project Design",
      price: "₹1999",
      details: ["✔ 2D + 3D", "✔ Interior + Exterior", "✔ Premium"],
    },
  ];

  // 🔥 PRICING PLANS
  const plans = [
    {
      name: "Basic",
      price: "₹999",
      details: ["✔ 2D Plan", "✔ Basic Layout", "✔ 1 Revision"],
    },
    {
      name: "Standard",
      price: "₹2999",
      details: ["✔ 2D + 3D", "✔ Interior Layout", "✔ 2 Revisions"],
    },
    {
      name: "Premium",
      price: "₹5999",
      details: ["✔ Full Project", "✔ 3D + Interior", "✔ Unlimited Revisions"],
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden text-white bg-[#0c0c0f]">
      <Navbar />

      {/* 🔥 Mouse Glow */}
      <motion.div
        style={{ left: smoothX, top: smoothY }}
        className="fixed w-[350px] h-[350px] bg-orange-500/20 rounded-full blur-[140px] pointer-events-none z-0"
      />

      {/* ⚡ Grid */}
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* 🌌 Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-500/10 blur-[150px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-yellow-500/10 blur-[150px] rounded-full"></div>

      <div className="relative z-10 px-6 py-16">

        {/* ================= HERO ================= */}
        <section className="mb-32 text-center">
          <h1 className="text-5xl font-extrabold md:text-7xl">
            <span className="text-transparent bg-gradient-to-r from-orange-400 to-yellow-500 bg-clip-text">
              AlphaAryx
            </span>
            <br />
            Architecture 🏗️
          </h1>

          <p className="max-w-2xl mx-auto mt-6 text-gray-400">
            Premium building design, house planning & 3D visualization.
          </p>

          <Link href="/services/architecture/order" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="px-8 py-3 mt-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"
            >
              Start Project 🚀
            </motion.div>
          </Link>
        </section>

        {/* 🧱 EXISTING SECTIONS SAME (NO CHANGE) */}

        {/* 💻 SERVICES (OLD ICON CARDS) */}
        <section className="grid gap-8 mb-32 sm:grid-cols-2 md:grid-cols-4">
          {[{ icon: <Building2 />, title: "Building Design" },
            { icon: <Ruler />, title: "2D / 3D Maps" },
            { icon: <Home />, title: "House Planning" },
            { icon: <Compass />, title: "Interior Layouts" }
          ].map((s, i) => (
            <motion.div key={i} whileHover={{ scale: 1.08 }}
              className="p-6 text-center border bg-black/60 rounded-3xl border-white/10">
              <div className="flex justify-center mb-4 text-4xl text-orange-400">{s.icon}</div>
              <h3>{s.title}</h3>
            </motion.div>
          ))}
        </section>

        {/* 🔥 NEW SERVICES (LIKE EDUCATION) */}
        <section className="mb-32">
          <h2 className="mb-16 text-4xl font-bold text-center">
            Architecture Services 🏗️
          </h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {services.map((s, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }}
                className="relative h-[180px] group">

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border bg-white/5 rounded-2xl border-white/10">
                  <h3>{s.name}</h3>
                  <p className="text-orange-400">{s.price}</p>
                </div>

                <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-black to-orange-900/40 rounded-2xl">
                  <div>
                    <h3 className="text-orange-400">{s.name}</h3>
                    <ul className="text-sm">
                      {s.details.map((d, idx) => <li key={idx}>{d}</li>)}
                    </ul>
                  </div>

                  <Link href="/services/architecture/order">
                    <motion.button className="w-full py-2 mt-3 bg-orange-500 rounded">
                      Order Now 🚀
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 💰 PRICING */}
        <section className="grid gap-10 mb-32 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div key={i} whileHover={{ scale: 1.08 }}
              className="p-8 text-center border bg-white/5 rounded-3xl border-white/10">

              <h3>{p.name}</h3>
              <p className="text-4xl text-orange-400">{p.price}</p>

              <ul className="mt-4 text-sm">
                {p.details.map((d, idx) => <li key={idx}>{d}</li>)}
              </ul>

              <Link href="/services/architecture/order">
                <motion.button className="px-6 py-2 mt-6 bg-orange-500 rounded-full">
                  Choose Plan
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </section>

        {/* 🚀 CTA */}
        <section className="text-center">
          <h2 className="text-5xl font-bold">Build Your Dream Project 🏗️</h2>

          <Link href="/services/architecture/order">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-10 py-3 mt-6 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500"
            >
              Start Now 🚀
            </motion.button>
          </Link>
        </section>

      </div>
      <Footer />
    </div>
  );
}