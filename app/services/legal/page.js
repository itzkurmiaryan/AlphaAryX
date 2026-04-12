"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

// 🔹 Legal Services
const services = [
  {
    name: "Legal Consultation",
    price: "₹999",
    details: ["✔ Expert Advice", "✔ Case Guidance", "✔ 30 Min Session"],
  },
  {
    name: "Legal Documentation",
    price: "₹499",
    details: ["✔ Agreements", "✔ Affidavits", "✔ Stamp Ready"],
  },
  {
    name: "Case Support",
    price: "₹2999",
    details: ["✔ Case Preparation", "✔ Legal Strategy", "✔ Full Assistance"],
  },
  {
    name: "Personal Consultation",
    price: "₹1499",
    details: ["✔ 1-on-1 Call", "✔ Legal Advice", "✔ Problem Solving"],
  },
  {
    name: "Business Legal Setup",
    price: "₹4999",
    details: ["✔ Company Docs", "✔ Legal Structure", "✔ Compliance Help"],
  },
  {
    name: "Property Legal Work",
    price: "₹3999",
    details: ["✔ Property Check", "✔ Agreement Draft", "✔ Legal Safety"],
  },
];

// 🔹 Business / B2B Legal
const b2bServices = [
  {
    name: "Company Registration",
    price: "₹2999",
    details: ["✔ Pvt Ltd / LLP", "✔ Govt Filing", "✔ Fast Process"],
  },
  {
    name: "GST & Compliance",
    price: "₹1499",
    details: ["✔ GST Filing", "✔ Returns", "✔ Compliance Support"],
  },
  {
    name: "Startup Legal Kit",
    price: "₹3999",
    details: ["✔ Contracts", "✔ Agreements", "✔ Legal Setup"],
  },
];

// 🔹 Monthly Legal Packages
const monthlyServices = [
  {
    name: "Basic Legal Support",
    price: "₹2999 / month",
    details: [
      "✔ Monthly Consultation",
      "✔ Document Drafting",
      "✔ Legal Advice",
    ],
  },
  {
    name: "Business Legal Support",
    price: "₹4999 / month",
    details: [
      "✔ Contracts & Agreements",
      "✔ Compliance Help",
      "✔ Priority Support",
    ],
  },
  {
    name: "Premium Legal Retainer",
    price: "₹7999 / month",
    details: [
      "✔ Full Legal Assistance",
      "✔ Case Handling",
      "✔ Dedicated Support",
    ],
  },
];

export default function LawPage() {
  return (
    <div className="overflow-hidden text-white bg-black">
      <Navbar />

      {/* 🔥 BACKGROUND GLOW */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-yellow-500/20 blur-[120px] rounded-full"></div>
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-orange-500/20 blur-[120px] rounded-full"></div>

      {/* ================= HERO ================= */}
      <section className="flex flex-col items-center justify-between min-h-screen px-6 md:flex-row md:px-16">
        <div className="space-y-6 md:w-1/2">
          <h1 className="text-5xl font-extrabold md:text-7xl">
            AlphaAryx <br />
            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
              Legal ⚖️
            </span>
          </h1>

          <p className="max-w-md text-gray-400">
            Professional legal services for individuals & businesses 🚀
          </p>

          <Link href="/services/legal/order">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="inline-block px-8 py-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
            >
              Get Legal Help ⚖️
            </motion.div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-10 md:w-1/2 md:mt-0"
        >
          <img
            src="/legal.jpg"
            className="border shadow-2xl rounded-3xl border-white/10"
          />
        </motion.div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="px-6 py-20 md:px-16">
        <h2 className="mb-16 text-4xl font-bold text-center">
          Legal Services ⚖️
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative h-[180px] group"
            >
              {/* FRONT */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border bg-white/5 border-white/10 rounded-2xl">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-yellow-400">{s.price}</p>
              </div>

              {/* HOVER */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 transition border opacity-0 bg-gradient-to-br from-black/90 to-yellow-900/40 border-white/10 rounded-2xl group-hover:opacity-100 group-hover:scale-110">
                <div>
                  <h3 className="text-lg font-bold text-yellow-400">
                    {s.name}
                  </h3>

                  <ul className="mt-3 space-y-1 text-sm text-gray-300">
                    {s.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-yellow-400">
                    {s.price}
                  </p>

                  <Link href="/services/legal/order">
                    <button className="w-full py-2 mt-3 bg-yellow-500 rounded-lg hover:scale-105">
                      Order Now ⚖️
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= B2B ================= */}
      <section className="px-6 py-20 md:px-16 bg-gradient-to-t from-black/80 via-black/90 to-black/80">
        <h2 className="mb-16 text-4xl font-bold text-center text-orange-400">
          Business Legal 🏢
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {b2bServices.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative h-[180px] group"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border bg-white/5 border-white/10 rounded-2xl">
                <h3>{s.name}</h3>
                <p className="mt-2 text-orange-400">{s.price}</p>
              </div>

              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 transition border opacity-0 bg-gradient-to-br from-black/90 to-orange-900/40 border-white/10 rounded-2xl group-hover:opacity-100">
                <div>
                  <ul className="text-sm text-gray-300">
                    {s.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>

                <Link href="/services/legal/order">
                  <button className="w-full py-2 mt-3 bg-orange-500 rounded-lg">
                    Order Now
                  </button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= MONTHLY ================= */}
      <section className="px-6 py-20 md:px-16">
        <h2 className="mb-16 text-4xl font-bold text-center text-green-400">
          Monthly Legal Plans 📅
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {monthlyServices.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 text-center border bg-white/5 rounded-2xl border-white/10"
            >
              <h3>{s.name}</h3>
              <p className="mt-2 text-green-400">{s.price}</p>

              <ul className="mt-3 text-sm text-gray-300">
                {s.details.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>

              <Link href="/services/legal/order">
                <button className="w-full py-2 mt-4 bg-green-500 rounded-lg">
                  Subscribe
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-4xl font-bold md:text-6xl">
          Need Legal Help? ⚖️
        </h2>

        <Link href="/services/legal/order">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-10 py-3 mt-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500"
          >
            Start Now 🚀
          </motion.button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}