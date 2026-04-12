"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#070812] text-white relative overflow-hidden">

      <Navbar />

      {/* 🌌 BACKGROUND */}
      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 blur-[140px] top-[-120px] left-[-120px]" />
      <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[140px] bottom-[-120px] right-[-120px]" />

      <div className="relative z-10 max-w-6xl px-6 py-24 mx-auto md:px-16 space-y-28">

        {/* 🔥 HERO */}
        <section className="grid items-center gap-12 md:grid-cols-2">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              About{" "}
              <span className="text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text">
                AlphaAryX
              </span>
            </h1>

            <p className="mt-6 text-gray-400">
              We provide powerful B2B & B2C digital solutions to help businesses,
              students, and individuals grow in the digital world 🚀
            </p>
          </motion.div>

          {/* 🖼️ HERO IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.03 }}
            className="overflow-hidden rounded-3xl"
          >
            <Image
              src="/portfolio/a.png"
              alt="AlphaAryX Work"
              width={500}
              height={400}
              className="object-cover w-full h-full transition duration-500 rounded-3xl hover:scale-105"
            />
          </motion.div>

        </section>

        {/* 💎 STORY */}
        <section className="grid items-center gap-16 md:grid-cols-2">

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="overflow-hidden rounded-3xl"
          >
            <Image
              src="/portfolio/b.png"
              alt="Our Work"
              width={500}
              height={400}
              className="object-cover w-full h-full transition duration-500 rounded-3xl hover:scale-105"
            />
          </motion.div>

          <div className="space-y-6">
            <h2 className="text-3xl font-semibold">Our Story</h2>

            <p className="text-gray-400">
              AlphaAryX started with a simple vision — to make digital services
              affordable and accessible for everyone.
            </p>

            <p className="text-gray-400">
              From small design work to complete digital and printing solutions,
              we are growing step by step by serving both businesses and individuals.
            </p>

            <p className="text-gray-400">
              Today, we are building a strong ecosystem offering B2B and B2C services
              across printing, design, and technology.
            </p>
          </div>

        </section>

        {/* 🎯 MISSION + VISION */}
        <section className="grid gap-8 md:grid-cols-2">

          {[
            {
              title: "Our Mission",
              desc: "To provide high-quality, affordable B2B & B2C digital and printing services."
            },
            {
              title: "Our Vision",
              desc: "To build a powerful and trusted digital brand serving businesses and individuals across India."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -6 }}
              className="p-8 border rounded-2xl bg-white/5 border-white/10 backdrop-blur-md"
            >
              <h3 className="mb-2 text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}

        </section>

        {/* 🏢 B2B vs B2C */}
        <section className="grid gap-8 md:grid-cols-2">

          {/* B2B */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 border rounded-2xl bg-white/5 border-white/10 backdrop-blur-md"
          >
            <h3 className="mb-3 text-2xl font-semibold">🏢 B2B Services</h3>

            <p className="mb-4 text-gray-400">
              We help schools, startups, and businesses with scalable digital and printing solutions.
            </p>

            <ul className="space-y-2 text-gray-400">
              <li>• Bulk Printing (Question Papers, Exam Sheets)</li>
              <li>• School Test Paper Solutions</li>
              <li>• Website Development</li>
              <li>• Branding & Posters</li>
              <li>• Business Automation</li>
            </ul>
          </motion.div>

          {/* B2C */}
          <motion.div
            whileHover={{ y: -6 }}
            className="p-8 border rounded-2xl bg-white/5 border-white/10 backdrop-blur-md"
          >
            <h3 className="mb-3 text-2xl font-semibold">👤 B2C Services</h3>

            <p className="mb-4 text-gray-400">
              We provide affordable and creative services for individuals and personal needs.
            </p>

            <ul className="space-y-2 text-gray-400">
              <li>• Invitation Card Printing</li>
              <li>• Resume & Document Typing</li>
              <li>• Graphics Design (Thumbnails, Posters)</li>
              <li>• CSC & Online Services</li>
              <li>• Personal Websites</li>
            </ul>
          </motion.div>

        </section>

        {/* 🛠️ SERVICES */}
        <section>
          <h2 className="mb-10 text-3xl font-semibold text-center">
            What We Do
          </h2>

          <div className="grid gap-6 md:grid-cols-3">

            {[
              "💻 Web Development (B2B & B2C)",
              "🎨 Graphics & Branding",
              "🖨️ Bulk & Personal Printing",
              "🌐 CSC & Digital Services",
              "📚 School & Student Solutions",
              "🚀 Business Growth Solutions"
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, scale: 1.02 }}
                className="p-6 text-center border rounded-2xl bg-white/5 border-white/10"
              >
                {item}
              </motion.div>
            ))}

          </div>
        </section>

        {/* 👤 FOUNDER */}
        <section className="grid items-center gap-12 md:grid-cols-2">

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden rounded-3xl"
          >
            <Image
              src="/portfolio/b.png"
              alt="Founder Aryan"
              width={400}
              height={400}
              className="object-cover w-full h-full transition duration-500 rounded-3xl hover:scale-105"
            />
          </motion.div>

          <div>
            <h2 className="text-3xl font-semibold">Meet the Founder</h2>

            <h3 className="mt-4 text-xl font-semibold">Aryan</h3>

            <p className="mt-4 text-gray-400">
              Aryan is the founder of AlphaAryX, passionate about technology,
              design, and building powerful digital solutions.
            </p>

            <p className="mt-2 text-gray-400">
              Starting from zero, he is building AlphaAryX into a strong digital
              brand serving both businesses and individuals.
            </p>

            <p className="mt-4 font-medium text-indigo-400">
              AlphaAryX – Smart Solutions for Businesses & Individuals
            </p>
          </div>

        </section>

      </div>

      <Footer />
    </div>
  );
}