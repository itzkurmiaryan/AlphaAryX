"use client";
import { motion } from "framer-motion";

export default function ServicePage({ title }) {
  return (
    <div className="p-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-4xl font-bold"
      >
        {title}
      </motion.h1>

      <div className="grid gap-6 md:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-white/10 backdrop-blur-lg rounded-2xl"
          >
            <h2 className="text-xl font-semibold">Service {item}</h2>
            <p className="mt-2 text-sm text-gray-400">Description here</p>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        className="px-8 py-3 mt-10 bg-purple-600 rounded-full shadow-xl"
        onClick={() => window.open("https://wa.me/917524917394")}
      >
        Order Now 🚀
      </motion.button>
    </div>
  );
}