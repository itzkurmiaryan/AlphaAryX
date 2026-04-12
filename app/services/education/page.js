"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const services = [
  {
    name: "Question Papers",
    price: "₹99",
    details: ["✔ Board Pattern", "✔ With Answer Key", "✔ All Subjects"],
  },
  {
    name: "Typing Services",
    price: "₹49",
    details: ["✔ Handwritten to PDF", "✔ साफ formatting", "✔ Fast Delivery"],
  },
  {
    name: "Performance Sheets",
    price: "₹149",
    details: ["✔ Student Report", "✔ Marks Analysis", "✔ Easy Tracking"],
  },
  {
    name: "Study Material",
    price: "₹199",
    details: ["✔ Notes + PDFs", "✔ Exam Ready", "✔ Simple Language"],
  },
  {
    name: "School Support",
    price: "₹499",
    details: ["✔ Full Paper Set", "✔ Answer Key", "✔ रिपोर्ट सिस्टम"],
  },
  {
    name: "Digital Exam System",
    price: "₹999",
    details: ["✔ Online System", "✔ Automation", "✔ स्कूल के लिए best"],
  },
];

const plans = [
  {
    name: "Starter",
    price: "₹499",
    details: ["✔ Basic Papers", "✔ 1 Class Support", "✔ PDF Files"],
  },
  {
    name: "School Plan",
    price: "₹1999",
    details: ["✔ All Classes Papers", "✔ Reports", "✔ Full Support"],
  },
  {
    name: "Premium",
    price: "₹4999",
    details: ["✔ Complete System", "✔ Automation", "✔ Priority Support"],
  },
];

export default function EducationPage() {
  return (
    <div className="overflow-hidden text-white bg-black">
      <Navbar />

      {/* 🔥 BACKGROUND */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full"></div>
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-cyan-500/20 blur-[120px] rounded-full"></div>

      {/* ================= HERO ================= */}
      <section className="flex flex-col items-center justify-between min-h-screen px-6 md:flex-row md:px-16">
        <div className="space-y-6 md:w-1/2">
          <h1 className="text-5xl font-extrabold md:text-7xl">
            AlphaAryx <br />
            <span className="text-transparent bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text">
              Edu System 📚
            </span>
          </h1>

          <p className="max-w-md text-gray-400">
            Smart education tools for schools — papers, reports & automation 🚀
          </p>

          <Link href="/services/education/order" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
            >
              Start Now 🚀
            </motion.div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-10 md:w-1/2 md:mt-0"
        >
          <div className="p-6 border shadow-2xl bg-white/5 border-white/10 rounded-3xl">
            <p className="mb-3 text-gray-400">Student Report</p>
            <div className="w-full h-3 mb-3 bg-gray-700 rounded-full">
              <div className="w-3/4 h-3 rounded-full bg-cyan-400"></div>
            </div>
            <div className="w-full h-3 mb-3 bg-gray-700 rounded-full">
              <div className="w-2/4 h-3 bg-blue-400 rounded-full"></div>
            </div>
            <div className="w-full h-3 bg-gray-700 rounded-full">
              <div className="w-5/6 h-3 bg-purple-400 rounded-full"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================= SERVICES ================= */}
      <section className="px-6 py-20 md:px-16">
        <h2 className="mb-16 text-4xl font-bold text-center">
          Our Education Services 📚
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
                <p className="mt-2 text-cyan-400">{s.price}</p>
              </div>

              {/* HOVER */}
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 transition duration-500 border opacity-0 bg-gradient-to-br from-black/90 to-cyan-900/40 border-white/10 rounded-2xl group-hover:opacity-100 group-hover:scale-110">
                <div>
                  <h3 className="text-lg font-bold text-cyan-400">
                    {s.name}
                  </h3>
                  <ul className="mt-3 space-y-1 text-sm text-gray-300">
                    {s.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-cyan-400">
                    {s.price}
                  </p>
                  <Link href="/services/education/order">
                    <motion.button className="w-full py-2 mt-3 rounded-lg bg-cyan-500 hover:scale-105">
                      Order Now 🚀
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="px-6 py-20 md:px-16 bg-gradient-to-t from-black/80 to-black">
        <h2 className="mb-16 text-4xl font-bold text-center text-cyan-400">
          Pricing Plans 💰
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="p-8 text-center border shadow-xl bg-white/5 border-white/10 rounded-3xl"
            >
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="mt-4 text-4xl text-cyan-400">{p.price}</p>

              <ul className="mt-4 space-y-2 text-sm text-gray-300">
                {p.details.map((d, idx) => (
                  <li key={idx}>{d}</li>
                ))}
              </ul>

              <Link href="/services/education/order">
                <motion.button className="px-6 py-2 mt-6 rounded-full bg-cyan-500 hover:scale-105">
                  Choose Plan
                </motion.button>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-4xl font-bold md:text-6xl">
          Make Your School Smart 🚀
        </h2>

        <p className="mt-4 text-gray-400">
          Digital education system for better results & management
        </p>

        <Link href="/services/education/order">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-10 py-3 mt-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
          >
            Start Now 🚀
          </motion.button>
        </Link>
      </section>

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