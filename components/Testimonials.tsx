"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Aman Verma",
    role: "Content Creator",
    service: "Graphics 🎨",
    feedback:
      "The designs were next level! My Instagram engagement literally doubled after using their graphics.",
    avatar: "/avatars/user1.jpg",
  },
  {
    name: "Ritika Sharma",
    role: "Startup Founder",
    service: "Tech 💻",
    feedback:
      "They built my website exactly how I imagined. Fast, responsive and very professional work.",
    avatar: "/avatars/user2.jpg",
  },
  {
    name: "Kunal Singh",
    role: "College Student",
    service: "Education 📚",
    feedback:
      "Got all my notes and guidance on time. Helped me score much better in exams!",
    avatar: "/avatars/user3.jpg",
  },
  {
    name: "Arjun Mehta",
    role: "Builder",
    service: "Architecture 🏗️",
    feedback:
      "2D and 3D plans were super detailed. Saved me a lot of time and effort.",
    avatar: "/avatars/user4.jpg",
  },
  {
    name: "Pooja Gupta",
    role: "Freelancer",
    service: "CSC Services 🧾",
    feedback:
      "All my government work was done quickly without any hassle. Very reliable service.",
    avatar: "/avatars/user5.jpg",
  },
  {
    name: "Rahul Jain",
    role: "Business Owner",
    service: "Legal ⚖️",
    feedback:
      "Got proper legal guidance and documentation support. Smooth and stress-free process.",
    avatar: "/avatars/user6.jpg",
  },
  {
    name: "Sahil Khan",
    role: "YouTuber",
    service: "Video Editing 🎬",
    feedback:
      "My videos look much more professional now. Editing quality is insane!",
    avatar: "/avatars/user7.jpg",
  },
  {
    name: "Neha Kapoor",
    role: "Brand Manager",
    service: "Marketing ⏳",
    feedback:
      "Excited for their marketing services. If it's like their other work, it’s going to be amazing!",
    avatar: "/avatars/user8.jpg",
  },
];

export default function Testimonials3D() {
  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % length);
    }, 3500);
    return () => clearInterval(interval);
  }, [length]);

  const getStyle = (index: number) => {
    let offset = index - current;

    if (offset > length / 2) offset -= length;
    if (offset < -length / 2) offset += length;

    const abs = Math.abs(offset);

    return {
      transform: `
        translateX(${offset * 260}px)
        translateZ(${-abs * 120}px)
        rotateY(${offset * 18}deg)
        scale(${1 - abs * 0.12})
      `,
      zIndex: 50 - abs,
      opacity: abs > 2 ? 0 : 1,
    };
  };

  return (
    <section className="relative px-4 md:px-12 py-24 bg-[#0a0a0a] text-white overflow-hidden">
      <h2 className="mb-16 text-3xl font-bold text-center md:text-5xl text-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        Client Testimonials 💬
      </h2>

      {/* 3D Carousel */}
      <div className="relative flex items-center justify-center h-[420px] perspective-[2000px]">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            style={getStyle(i)}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute p-6 border shadow-xl w-72 sm:w-80 rounded-2xl border-white/10 bg-white/5 backdrop-blur-lg"
          >
            <div className="flex items-center gap-3 mb-4">
              <img
                src={t.avatar}
                className="object-cover w-12 h-12 border rounded-full border-white/20"
              />
              <div>
                <h3 className="font-semibold">{t.name}</h3>
                <p className="text-xs text-gray-400">{t.role}</p>
                <p className="mt-1 text-xs text-pink-400">{t.service}</p>
              </div>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-gray-300">
              "{t.feedback}"
            </p>
            <div className="text-sm text-yellow-400">⭐⭐⭐⭐⭐</div>
          </motion.div>
        ))}
      </div>

      {/* Glows for AlphaAryX theme */}
      <div className="absolute w-64 h-64 bg-pink-500/20 blur-[120px] top-8 left-8 rounded-full" />
      <div className="absolute w-96 h-96 bg-purple-500/20 blur-[140px] bottom-0 right-0 rounded-full" />
      <div className="absolute w-80 h-80 bg-indigo-500/20 blur-[130px] top-1/3 right-10 rounded-full" />
    </section>
  );
}