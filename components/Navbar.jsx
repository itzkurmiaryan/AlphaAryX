"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b shadow-xl backdrop-blur-2xl bg-white/30 border-white/20">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">

        {/* 🔥 Logo with Image + Text */}
        <Link href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="relative w-10 h-10"
          >
            <Image
              src="/portfolio/logo.png"  // 🔥 put this image in public folder
              alt="logo"
              fill
              className="object-cover rounded-full shadow-lg"
            />
          </motion.div>

          <h1 className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text">
            AlphaAryX
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-10 font-medium md:flex">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`relative transition-all duration-300 ${
                pathname === link.href
                  ? "text-indigo-600"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              {link.name}

              {/* Animated underline */}
              {pathname === link.href && (
                <motion.span
                  layoutId="underline"
                  className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded"
                />
              )}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:block">
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 10px 25px rgba(99,102,241,0.4)",
            }}
            whileTap={{ scale: 0.9 }}
            className="px-6 py-2 text-white rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Button */}
        <button
          className="text-gray-700 md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-6 space-y-5 border-t md:hidden bg-white/80 backdrop-blur-xl"
        >
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block text-lg transition ${
                pathname === link.href
                  ? "text-indigo-600 font-semibold"
                  : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="w-full py-3 text-white rounded-full bg-gradient-to-r from-indigo-600 to-purple-600"
          >
            Get Started
          </motion.button>
        </motion.div>
      )}
    </nav>
  );
}