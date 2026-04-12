"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

const services = [
  { title: "Graphics 🎨", slug: "graphics", desc: "Posters, branding & design" },
  { title: "Tech 💻", slug: "tech", desc: "Websites, apps & software" },
  { title: "Education 📚", slug: "education", desc: "Notes & academic help" },
  { title: "Architecture 🏗️", slug: "architecture", desc: "2D/3D plans & designs" },
  { title: "CSC Services 🧾", slug: "csc", desc: "All government services" },
  { title: "Legal ⚖️", slug: "legal", desc: "Legal consultation & help" },
  { title: "Video Editing 🎬", slug: "video", desc: "Reels, ads & editing" },
  { title: "Marketing ⏳", slug: "marketing", desc: "Coming Soon!" }
  // 👉 future services yaha add kar
];

export default function ServicesSection() {
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24 border-8 border-indigo-500 rounded-full border-t-purple-500"
        />
      </div>
    );
  }

  // ✅ only 6 services initially
  const visibleServices = showAll ? services : services.slice(0, 6);

  return (
    <section className="px-6 py-24 md:px-16 bg-gradient-to-b from-white to-indigo-50">

      {/* Heading */}
      <div className="mb-16 text-center">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-extrabold text-gray-800 md:text-5xl"
        >
          One Platform. Endless Solutions 🚀
        </motion.h2>

        <p className="max-w-2xl mx-auto mt-4 text-lg text-gray-500">
          From digital services to real-world solutions — whatever you need, we make it happen.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid max-w-6xl gap-8 mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {visibleServices.map((service, index) => (
          <Link key={index} href={`/services/${service.slug}`}>
            <motion.div
              whileHover={{ scale: 1.06 }}
              className="relative group p-[1px] rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-xl cursor-pointer"
            >
              <div className="p-6 bg-white shadow-lg rounded-3xl">
                <h3 className="text-xl font-semibold text-gray-800">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {service.desc}
                </p>
                <div className="mt-4 text-indigo-600">
                  Explore →
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* 🔥 Show More Button */}
      {services.length > 6 && (
        <div className="mt-12 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-3 font-medium text-white transition rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105"
          >
            {showAll ? "Show Less ↑" : "View All Services ↓"}
          </button>
        </div>
      )}

    </section>
  );
}