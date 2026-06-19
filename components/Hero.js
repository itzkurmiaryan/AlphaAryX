"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Hero() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Safe localStorage check (avoids hydration mismatch issues)
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleStart = () => {
    if (!isLoggedIn) {
      alert("Please login first 🔐");
      router.push("/login");
    } else {
      router.push("/services");
    }
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 overflow-hidden text-center perspective-1000">

      {/* 🌌 Animated Background Glows */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 15, -15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] bg-purple-400 opacity-20 blur-[120px] rounded-full top-20 z-0"
      />
      <motion.div
        animate={{ y: [0, 25, -25, 0], x: [0, -20, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[400px] h-[400px] bg-indigo-400 opacity-20 blur-[120px] rounded-full bottom-10 right-10 z-0"
      />

      {/* 🔥 Background Branding Text */}
      <section className="relative flex items-start justify-center w-full overflow-hidden">
        <motion.h1
          initial={{ rotateY: 30, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 0.1 }}
          transition={{ duration: 1.5 }}
          className="font-black text-gray-400 pointer-events-none select-none"
          style={{
            fontSize: "clamp(100px, 12vw, 220px)",
            marginTop: "2rem",
            textAlign: "center",
            textShadow:
              "0 0 50px rgba(99,102,241,0.25), 0 0 100px rgba(139,92,246,0.2)",
          }}
        >
          AlphaAryX
        </motion.h1>
      </section>

      {/* 🚀 Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="z-10 px-4 py-2 mb-6 text-sm text-indigo-600 bg-indigo-100 rounded-full shadow-lg"
      >
        🚀 B2B & B2C Digital Solutions
      </motion.div>

      {/* 🔥 Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.05, rotateX: 2, rotateY: -2 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="relative z-10 max-w-5xl text-5xl font-extrabold leading-tight cursor-pointer md:text-7xl"
      >
        From Business Needs <br />
        to Personal Projects —
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
          We Handle Everything
        </span>
      </motion.h1>

      {/* 💡 Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative z-10 max-w-xl mt-6 text-lg text-gray-500"
      >
        Helping businesses (B2B) and individuals (B2C) with websites,
        printing, design, CSC services, and complete digital solutions.
      </motion.p>

      {/* 🎯 Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="relative z-10 flex flex-wrap justify-center gap-4 mt-8"
      >
        {/* Start Project */}
        <motion.button
          onClick={handleStart}
          whileHover={{
            scale: 1.1,
            y: -3,
            boxShadow: "0 20px 40px rgba(99, 102, 241,0.4)",
          }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 text-white transition rounded-full shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600"
        >
          {isLoggedIn ? "Start Project 🚀" : "Login to Start 🔐"}
        </motion.button>

        {/* Explore Services */}
        <Link href="/services">
          <motion.button
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 10px 30px rgba(156,163,175,0.3)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 transition border border-gray-300 rounded-full hover:bg-gray-100"
          >
            Explore Services
          </motion.button>
        </Link>
      </motion.div>

      {/* 🔥 Trust Line */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="z-10 mt-6 text-xs text-gray-400"
      >
        Trusted by Students, Creators & Businesses 💼
      </motion.p>

    </section>
  );
}