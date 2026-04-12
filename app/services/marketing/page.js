"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const portfolio = [
  "/portfolio/marketing1.jpg",
  "/portfolio/marketing2.jpg",
  "/portfolio/marketing3.jpg",
  "/portfolio/marketing4.jpg",
];

// 🔹 SERVICES WITH PRICING
const services = [
  {
    name: "Social Media Marketing",
    price: "₹999",
    details: ["✔ Instagram Growth", "✔ Content Plan", "✔ Engagement Boost"],
  },
  {
    name: "SEO & SEM",
    price: "₹1499",
    details: ["✔ Keyword Research", "✔ Google Ranking", "✔ Ads Setup"],
  },
  {
    name: "Email Campaigns",
    price: "₹799",
    details: ["✔ Bulk Emails", "✔ Templates", "✔ Lead Conversion"],
  },
  {
    name: "Brand Strategy",
    price: "₹1999",
    details: ["✔ Full Strategy", "✔ Target Audience", "✔ Positioning"],
  },
  {
    name: "Content Marketing",
    price: "₹999",
    details: ["✔ Blog + Posts", "✔ SEO Content", "✔ Planning"],
  },
  {
    name: "Ads & Promotions",
    price: "₹1499",
    details: ["✔ FB/Google Ads", "✔ Campaign Setup", "✔ Optimization"],
  },
];

export default function MarketingPage() {
  return (
    <div className="overflow-hidden text-white bg-black">
      <Navbar />

      {/* BG */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full"></div>
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full"></div>

      {/* HERO */}
      <section className="flex flex-col items-center justify-between min-h-screen px-6 md:flex-row md:px-16">
        <div className="space-y-6 md:w-1/2">
          <h1 className="text-5xl font-extrabold md:text-7xl">
            AlphaAryx <br />
            <span className="text-transparent bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text">
              Marketing 📢
            </span>
          </h1>

          <p className="max-w-md text-gray-400">
            Grow your brand with powerful marketing strategies 🚀
          </p>

          <Link href="/services/marketing/order">
            <motion.button
              whileHover={{ scale: 1.1 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
            >
              Start Project 🚀
            </motion.button>
          </Link>
        </div>

        <div className="mt-10 md:w-1/2">
          <img
            src="/portfolio/marketing1.jpg"
            className="border shadow-2xl rounded-3xl border-white/10"
          />
        </div>
      </section>

      {/* SERVICES */}
      <section className="px-6 py-20 md:px-16">
        <h2 className="mb-16 text-4xl font-bold text-center">
          Our Services 💡
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative h-[180px] group"
            >
              {/* FRONT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border bg-white/5 border-white/10 rounded-2xl">
                <h3>{s.name}</h3>
                <p className="mt-2 text-blue-400">{s.price}</p>
              </div>

              {/* HOVER */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 transition opacity-0 bg-gradient-to-br from-black/90 to-blue-900/40 rounded-2xl group-hover:opacity-100">
                <div>
                  <h3 className="text-blue-400">{s.name}</h3>
                  <ul className="mt-2 text-sm">
                    {s.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xl text-blue-400">{s.price}</p>
                  <Link href="/services/marketing/order">
                    <button className="w-full py-2 mt-2 bg-blue-500 rounded">
                      Order Now 🚀
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}