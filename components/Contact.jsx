"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#03040a] text-white relative overflow-hidden">
      <Navbar />

      {/* 🌌 SOFT BACKGROUND GLOW */}
      <div className="absolute w-[400px] h-[400px] bg-purple-600/20 blur-[120px] top-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/20 blur-[120px] bottom-[-100px] right-[-100px]" />

      {/* GRID */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative z-10 px-6 py-24 md:px-16">

        {/* 🔥 HERO */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center"
        >
          <h1 className="text-5xl font-bold text-transparent md:text-6xl bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text">
            Let’s Connect
          </h1>

          <p className="max-w-xl mx-auto mt-6 text-gray-400">
            Build powerful digital experiences with AlphaAryX 🚀
          </p>
        </motion.div>

        {/* 🔥 MAIN GRID */}
        <div className="grid items-center gap-16 md:grid-cols-2">

          {/* 🧊 FORM CARD */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.6)] hover:shadow-purple-500/20 transition-all"
          >
            <h2 className="mb-8 text-2xl font-semibold">Send Message</h2>

            <form className="space-y-6">

              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-4 transition border bg-white/10 rounded-xl border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-4 transition border bg-white/10 rounded-xl border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              <textarea
                rows="5"
                placeholder="Your Message"
                className="w-full p-4 transition border bg-white/10 rounded-xl border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />

              {/* 🚀 BUTTON */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
                className="w-full py-4 font-semibold transition-all bg-indigo-600 shadow-lg rounded-xl hover:bg-indigo-500"
              >
                Send Message 🚀
              </motion.button>

            </form>
          </motion.div>

          {/* 📞 INFO SECTION */}
          <div className="flex flex-col gap-8">

            {[{
              icon: <Phone size={20} />,
              title: "Call Us",
              value: "7524917394"
            }, {
              icon: <Mail size={20} />,
              title: "Email",
              value: "alphaaryx@gmail.com"
            }, {
              icon: <MapPin size={20} />,
              title: "Location",
              value: "India"
            }].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -5 }}
                className="p-6 transition-all border shadow-md rounded-2xl bg-white/5 border-white/10 backdrop-blur-md hover:shadow-purple-500/20"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-600 rounded-full shadow-md">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="text-gray-400">{item.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* 🌐 SOCIAL */}
            <div className="flex gap-4 mt-4">
              {["📷", "💼", "🐦"].map((icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  className="p-4 transition rounded-full cursor-pointer bg-white/10 backdrop-blur-md hover:bg-indigo-600"
                >
                  {icon}
                </motion.div>
              ))}
            </div>

          </div>

        </div>

      </div>
      <Footer />

    </div>
  );
}