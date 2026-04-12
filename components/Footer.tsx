"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const services = [
  { name: "Graphics", slug: "graphics" },
  { name: "Tech", slug: "tech" },
  { name: "Education", slug: "education" },
  { name: "Architecture", slug: "architecture" },
  { name: "CSC Services", slug: "csc" },
  { name: "Legal", slug: "legal" },
  { name: "Video Editing", slug: "video" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white bg-[#04060c]">

      {/* 🔥 Premium Glow Layers */}
      <div className="absolute w-[600px] h-[600px] bg-indigo-500/20 blur-[160px] rounded-full top-[-200px] left-[-200px] animate-pulse"></div>
      <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[160px] rounded-full bottom-[-200px] right-[-200px] animate-pulse"></div>

      <div className="relative z-10 px-6 py-20 md:px-16">

        {/* 🔥 GRID */}
        <div className="grid gap-12 md:grid-cols-4">

          {/* 🔥 BRAND */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 mb-4">

              <div className="relative w-12 h-12">
                <Image
                  src="/portfolio/logo.png"
                  alt="logo"
                  fill
                  className="object-cover border rounded-full shadow-xl border-white/20"
                />
              </div>

              <h2 className="text-2xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500">
                AlphaAryX
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-400">
              Build. Scale. Grow. 🚀 <br />
              From tech to legal, we deliver complete digital solutions for modern businesses.<br />
              We provide B2B & B2C services —

            </p>

            {/* 🔥 CTA BUTTON */}
            <p className="mt-3 text-xs text-indigo-400">
              Smart Solutions for Businesses & Individuals
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="px-5 py-2 mt-5 text-sm font-medium transition rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-purple-500/30"
            >
              Get Started
            </motion.button>
          </motion.div>

          {/* 🔥 SERVICES */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-white">
              Services
            </h3>

            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="flex items-center gap-2 text-gray-400 transition group hover:text-white"
                  >
                    <span className="w-0 h-[2px] bg-gradient-to-r from-indigo-400 to-purple-500 transition-all group-hover:w-5"></span>
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 🔥 QUICK LINKS */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                { name: "Home", link: "/" },
                { name: "Services", link: "/services" },
                { name: "About", link: "/about" },
                { name: "Contact", link: "/contact" },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.link}
                    className="flex items-center gap-2 text-gray-400 transition group hover:text-white"
                  >
                    <span className="w-0 h-[2px] bg-gradient-to-r from-pink-400 to-purple-500 transition-all group-hover:w-5"></span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 🔥 CONTACT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-3 text-gray-400">

              <p className="transition hover:text-white">📞 7524917394</p>

              <a
                href="https://www.instagram.com/alphaaryx_/"
                target="_blank"
                className="block transition hover:text-pink-400"
              >
                📷 Instagram
              </a>

              <a
                href="https://www.linkedin.com/company/alphaaryx/?viewAsMember=true"
                target="_blank"
                className="block transition hover:text-indigo-400"
              >
                💼 LinkedIn
              </a>
            </div>

            {/* 🔥 MINI CARD */}
            <div className="p-4 mt-5 border rounded-xl bg-white/5 border-white/10 backdrop-blur-md">
              <p className="text-xs text-gray-400">
                Need help? 💬 <br />
                We usually reply within a few hours.
              </p>
            </div>
          </motion.div>

        </div>

        {/* 🔥 DIVIDER */}
        <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent my-12"></div>

        {/* 🔥 BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="w-full text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} AlphaAryX — Built with ❤️
            </p>
            <p className="text-xs text-gray-500">
              Serving B2B & B2C Clients Across India 🚀
            </p>
          </div>
          {/* 🔥 SOCIAL ICONS */}
          <div className="flex gap-4">

            {[
              {
                icon: "📷",
                link: "https://www.instagram.com/alphaaryx_/",
                glow: "hover:shadow-pink-500/50"
              },
              {
                icon: "💼",
                link: "https://www.linkedin.com/company/alphaaryx/?viewAsMember=true",
                glow: "hover:shadow-indigo-500/50"
              }
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                whileHover={{ scale: 1.2, rotate: 8 }}
                whileTap={{ scale: 0.9 }}
                className={`p-3 rounded-full bg-white/10 backdrop-blur-md transition shadow-lg ${item.glow}`}
              >
                {item.icon}
              </motion.a>
            ))}

          </div>
        </div>

      </div>
    </footer>
  );
}