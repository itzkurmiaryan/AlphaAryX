"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Video } from "lucide-react";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  { title: "Graphics", icon: "🎨", slug: "graphics", desc: "Design & Branding" },
  { title: "Tech", icon: "💻", slug: "tech", desc: "Web & Apps" },
  { title: "Education", icon: "📚", slug: "education", desc: "Notes & Help" },
  { title: "Architecture", icon: "🏗️", slug: "architecture", desc: "2D/3D Designs" },
  { title: "CSC", icon: "🧾", slug: "csc", desc: "Govt Services" },
  { title: "Legal", icon: "⚖️", slug: "legal", desc: "Legal Help" },
  { title: "Video Editing", slug: "video", desc: "Reels & Ads", isVideo: true },
  { title: "Marketing", icon: "⏳", slug: "marketing", desc: "Stay Tuned!" }
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen text-gray-900 bg-white">

      <Navbar />

      <div className="max-w-6xl px-4 py-24 mx-auto">

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-4xl font-semibold md:text-5xl">
            Our Services
          </h1>
          <p className="mt-4 text-gray-500">
            Simple. Powerful. Interactive.
          </p>
        </motion.div>

        {/* GRID */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: 0.08 }
            }
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >

          {services.map((service, i) => (
            <MagneticCard key={i} service={service} />
          ))}

        </motion.div>

      </div>

      <Footer />
    </div>
  );
}

function MagneticCard({ service }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const smoothX = useSpring(x, { stiffness: 150, damping: 15 });
  const smoothY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    x.set((e.clientX - centerX) / 8);
    y.set((e.clientY - centerY) / 8);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Link href={`/services/${service.slug}`}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleLeave}
        style={{ x: smoothX, y: smoothY }}
        whileHover={{ scale: 1.03 }}
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: { opacity: 1, y: 0 }
        }}
        className="relative p-6 overflow-hidden transition border rounded-2xl group hover:shadow-xl"
      >

        {/* ✨ SHINE EFFECT */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100">
          <div className="absolute w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-12 translate-x-[-100%] group-hover:translate-x-[100%] transition duration-700"></div>
        </div>

        {/* ICON */}
        <div className="mb-4 text-2xl">
          {service.isVideo ? <Video size={24} /> : service.icon}
        </div>

        {/* TITLE */}
        <h3 className="text-lg font-medium">
          {service.title}
        </h3>

        {/* DESC */}
        <p className="mt-2 text-sm text-gray-500">
          {service.desc}
        </p>

      </motion.div>
    </Link>
  );
}