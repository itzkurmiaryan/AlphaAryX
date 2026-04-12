"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

const portfolio = [
  "/portfolio/design1.jpg",
  "/portfolio/design2.jpg",
  "/portfolio/design3.jpg",
  "/portfolio/design4.jpg",
];

// 🔹 Regular Services
const services = [
  {
    name: "Instagram Posts",
    price: "₹99",
    details: ["✔ HD Quality", "✔ Trendy Design", "✔ Fast Delivery"],
  },
  {
    name: "YouTube Thumbnails",
    price: "₹149",
    details: ["✔ High CTR Design", "✔ Eye Catching", "✔ Fast Delivery"],
  },
  {
    name: "Logo Design",
    price: "₹299",
    details: ["✔ Unique Logo", "✔ Brand Ready", "✔ 2 Revisions"],
  },
  {
    name: "Brand Identity",
    price: "₹999",
    details: ["✔ Full Branding", "✔ Colors + Fonts", "✔ Social Kit"],
  },
  {
    name: "Posters & Ads",
    price: "₹199",
    details: ["✔ Marketing Focus", "✔ High Quality", "✔ Custom Design"],
  },
  {
    name: "Reels Graphics",
    price: "₹149",
    details: ["✔ Viral Style", "✔ Motion Ready", "✔ Engaging"],
  },
];

// 🔹 B2B Services
const b2bServices = [
  {
    name: "Corporate Branding",
    price: "₹1999",
    details: ["✔ Complete Corporate Kit", "✔ Logo + Stationery", "✔ Brand Guidelines"],
  },
  {
    name: "Business Presentations",
    price: "₹799",
    details: ["✔ Professional PPT", "✔ Visual Data", "✔ Editable Slides"],
  },
  {
    name: "Marketing Campaign Graphics",
    price: "₹1499",
    details: ["✔ Ad Banners", "✔ Social Media Kit", "✔ High Conversion"],
  },
  {
    name: "Product Catalog Design",
    price: "₹1299",
    details: ["✔ Multi-page Catalog", "✔ High Quality Layout", "✔ Print Ready"],
  },
];

// 🔹 Monthly / Subscription Services
const monthlyServices = [
  {
    name: "Monthly Posters & Ads",
    price: "₹2999 / month",
    details: [
      "✔ 10 Posters/Ads per month",
      "✔ Custom Designs",
      "✔ Quick Revisions",
      "✔ Suitable for Schools, Companies & Hospitals",
    ],
  },
  {
    name: "Social Media Graphics Pack",
    price: "₹3999 / month",
    details: [
      "✔ 15 Posts/Reels Graphics",
      "✔ Trendy & Engaging",
      "✔ Perfect for Institutes & Brands",
    ],
  },
  {
    name: "Corporate Monthly Branding",
    price: "₹4999 / month",
    details: [
      "✔ Complete Monthly Branding",
      "✔ Posters, Banners, Social Media Kit",
      "✔ Professional Corporate Design",
    ],
  },
];

export default function GraphicsPage() {
  return (
    <div className="overflow-hidden text-white bg-black">
      <Navbar />

      {/* 🔥 BACKGROUND GLOW */}
      <div className="fixed top-0 left-0 w-[400px] h-[400px] bg-pink-500/20 blur-[120px] rounded-full"></div>
      <div className="fixed bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full"></div>

      {/* ================= HERO ================= */}
      <section className="flex flex-col items-center justify-between min-h-screen px-6 md:flex-row md:px-16">
        <div className="space-y-6 md:w-1/2">
          <h1 className="text-5xl font-extrabold md:text-7xl">
            AlphaAryx <br />
            <span className="text-transparent bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text">
              Graphics 🎨
            </span>
          </h1>

          <p className="max-w-md text-gray-400">
            Scroll-stopping designs that grow your brand 🚀
          </p>

          <Link href="/services/graphics/order" className="inline-block">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500"
            >
              Start Project 🚀
            </motion.div>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          className="mt-10 md:w-1/2 md:mt-0"
        >
          <img
            src="/portfolio/design1.jpg"
            className="border shadow-2xl rounded-3xl border-white/10"
          />
        </motion.div>
      </section>

      {/* ================= REGULAR SERVICES ================= */}
      <section className="px-6 py-20 md:px-16">
        <h2 className="mb-16 text-4xl font-bold text-center">Our Services 💡</h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative h-[180px] group"
            >
              <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border bg-white/5 border-white/10 rounded-2xl">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-pink-400">{s.price}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="absolute inset-0 z-10 flex flex-col justify-between p-6 transition duration-500 border opacity-0 bg-gradient-to-br from-black/90 to-pink-900/40 border-white/10 rounded-2xl group-hover:opacity-100 group-hover:scale-110"
              >
                <div>
                  <h3 className="text-lg font-bold text-pink-400">{s.name}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-gray-300">
                    {s.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-pink-400">{s.price}</p>
                  <Link href="/services/graphics/order">
                    <motion.button className="w-full py-2 mt-3 bg-pink-500 rounded-lg hover:scale-105">
                      Order Now 🚀
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= B2B SERVICES ================= */}
      <section className="px-6 py-20 md:px-16 bg-gradient-to-t from-black/80 via-black/90 to-black/80">
        <h2 className="mb-16 text-4xl font-bold text-center text-yellow-400">
          B2B Services 🏢
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {b2bServices.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative h-[180px] group"
            >
              <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border bg-white/5 border-white/10 rounded-2xl">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-yellow-400">{s.price}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="absolute inset-0 z-10 flex flex-col justify-between p-6 transition duration-500 border opacity-0 bg-gradient-to-br from-black/90 to-yellow-900/40 border-white/10 rounded-2xl group-hover:opacity-100 group-hover:scale-110"
              >
                <div>
                  <h3 className="text-lg font-bold text-yellow-400">{s.name}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-gray-300">
                    {s.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-yellow-400">{s.price}</p>
                  <Link href="/services/graphics/order">
                    <motion.button className="w-full py-2 mt-3 bg-yellow-500 rounded-lg hover:scale-105">
                      Order Now 🚀
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= MONTHLY PACKAGES ================= */}
      <section className="px-6 py-20 md:px-16 bg-gradient-to-t from-black/80 via-black/90 to-black/80">
        <h2 className="mb-16 text-4xl font-bold text-center text-green-400">
          Monthly Design Packages 📅
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {monthlyServices.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="relative h-[200px] group"
            >
              <motion.div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center border bg-white/5 border-white/10 rounded-2xl">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p className="mt-2 text-green-400">{s.price}</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileHover={{ opacity: 1, scale: 1.05 }}
                className="absolute inset-0 z-10 flex flex-col justify-between p-6 transition duration-500 border opacity-0 bg-gradient-to-br from-black/90 to-green-900/40 border-white/10 rounded-2xl group-hover:opacity-100 group-hover:scale-110"
              >
                <div>
                  <h3 className="text-lg font-bold text-green-400">{s.name}</h3>
                  <ul className="mt-3 space-y-1 text-sm text-gray-300">
                    {s.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xl font-bold text-green-400">{s.price}</p>
                  <Link href="/services/graphics/order">
                    <motion.button className="w-full py-2 mt-3 bg-green-500 rounded-lg hover:scale-105">
                      Subscribe 🚀
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= PORTFOLIO ================= */}
      <section className="px-6 py-20 md:px-16">
        <h2 className="mb-16 text-4xl font-bold text-center">Our Designs ⚡</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {portfolio.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08 }}
              className="relative overflow-hidden group rounded-2xl"
            >
              <img
                src={img}
                className="object-cover w-full transition h-60 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center transition opacity-0 bg-black/60 group-hover:opacity-100">
                <p>View</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 py-20 text-center">
        <h2 className="text-4xl font-bold md:text-6xl">Let’s Make You Viral 🚀</h2>
        <Link href="/services/graphics/order">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="px-10 py-3 mt-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
          >
            Place Order / Start Your Project 🚀
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