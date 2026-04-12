"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

/* ================= DATA ================= */

const stats = [
  { label: "Systems Built", value: "120+" },
  { label: "Active Deployments", value: "45+" },
  { label: "Uptime Avg", value: "99.9%" },
  { label: "AI Modules", value: "18+" },
];

const techStack = [
  "Next.js","React","Node.js","MongoDB","PostgreSQL",
  "AWS","Docker","Firebase","Tailwind","Framer Motion",
  "Python","AI Agents","Redis","GraphQL","Kubernetes"
];

const services = [
  {
    name: "Full Stack Web Apps",
    price: "₹4999+",
    details: ["React / Next.js","APIs","Database","Auth","SEO"],
  },
  {
    name: "SaaS Platforms",
    price: "₹9999+",
    details: ["Subscriptions","Dashboard","Multi-tenant","Scaling"],
  },
  {
    name: "AI Automation",
    price: "₹7999+",
    details: ["AI Agents","Chatbots","Workflows","LLM Integration"],
  },
  {
    name: "Mobile Apps",
    price: "₹6999+",
    details: ["iOS + Android","React Native","API","Realtime"],
  },
  {
    name: "Backend Systems",
    price: "₹5999+",
    details: ["Node.js","Auth","APIs","Security"],
  },
  {
    name: "Cloud & DevOps",
    price: "₹2999+",
    details: ["AWS","Docker","CI/CD","Scaling"],
  },
  {
    name: "Web3 Apps",
    price: "₹14999+",
    details: ["Smart Contracts","Wallets","DApps"],
  },
  {
    name: "Performance Optimization",
    price: "₹3999+",
    details: ["Speed","SEO","Caching"],
  },
  {
    name: "Security Systems",
    price: "₹4999+",
    details: ["API Security","Encryption","Protection"],
  },
];

const b2bServices = [
  {
    name: "Enterprise Software",
    price: "₹19999+",
    details: ["ERP / CRM","Dashboards","Secure Infra"],
  },
  {
    name: "Business Automation",
    price: "₹9999+",
    details: ["AI Workflows","Automation","Productivity"],
  },
  {
    name: "API Development",
    price: "₹4999+",
    details: ["REST / GraphQL","Auth","Scaling"],
  },
  {
    name: "Startup MVP Build",
    price: "₹14999+",
    details: ["Idea → Product","Fast Build","Investor Ready"],
  },
];

const monthlyServices = [
  {
    name: "Startup Support",
    price: "₹4999/mo",
    details: ["Fixes","Updates","Maintenance"],
  },
  {
    name: "DevOps Management",
    price: "₹7999/mo",
    details: ["Monitoring","Deployments","CI/CD"],
  },
  {
    name: "AI Maintenance",
    price: "₹9999/mo",
    details: ["Model Updates","Automation","Optimization"],
  },
  {
    name: "Dedicated Tech Team",
    price: "₹24999/mo",
    details: ["Full Team","Weekly Work","Priority"],
  },
];

/* ================= PAGE ================= */

export default function TechPage() {
  return (
    <div className="bg-[#060913] text-white overflow-hidden">

      {/* GRID */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <Navbar />

      {/* GLOW */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[150px]" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[150px]" />

      {/* HERO */}
      <section className="flex flex-col items-center justify-between min-h-screen px-6 md:flex-row md:px-16">

        <div className="space-y-6 md:w-1/2">
          <h1 className="text-5xl font-extrabold md:text-7xl">
            AlphaAryx <br />
            <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
              Tech Engineering ⚡
            </span>
          </h1>

          <p className="max-w-md text-gray-400">
            We design scalable systems, SaaS platforms, AI products & cloud architecture.
          </p>

          <Link href="/services/tech/order">
            <motion.button whileHover={{ scale: 1.1 }}
              className="px-8 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600">
              Start Building 🚀
            </motion.button>
          </Link>
        </div>

        {/* PREMIUM VISUAL */}
        <motion.div className="relative flex justify-center mt-10 md:w-1/2">
          <div className="absolute w-[300px] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full animate-pulse" />

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 w-[300px]"
          >
            <p className="font-mono text-sm text-green-400">
              {"<AlphaAryx />"}
            </p>

            <p className="mt-2 text-xs text-gray-400">
              Deploying scalable systems...
            </p>

            <div className="mt-4 space-y-1 text-xs text-cyan-300">
              <p>✔ AI Modules</p>
              <p>✔ APIs Connected</p>
              <p>✔ Scaling Cloud</p>
            </div>
          </motion.div>
        </motion.div>

      </section>

      {/* STATS */}
      <section className="grid gap-6 px-6 mb-24 md:grid-cols-4 md:px-16">
        {stats.map((s, i) => (
          <motion.div key={i} whileHover={{ scale: 1.05 }}
            className="p-6 text-center border bg-white/5 border-white/10 rounded-2xl">
            <h2 className="text-3xl font-bold text-cyan-400">{s.value}</h2>
            <p className="text-gray-400">{s.label}</p>
          </motion.div>
        ))}
      </section>

      {/* TECH STACK (2 ROW SCROLL) */}
      <section className="px-6 mb-24 overflow-hidden text-center md:px-16">
        <h2 className="mb-10 text-4xl font-bold">Engineering Stack ⚙️</h2>

        <div className="space-y-6">

          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
            className="flex gap-6 whitespace-nowrap"
          >
            {[...techStack, ...techStack].map((t, i) => (
              <div key={i} className="px-4 py-2 text-sm border rounded-full bg-white/5 border-white/10">
                {t}
              </div>
            ))}
          </motion.div>

          <motion.div
            animate={{ x: ["-100%", "0%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-6 whitespace-nowrap"
          >
            {[...techStack, ...techStack].map((t, i) => (
              <div key={i} className="px-4 py-2 text-sm border rounded-full bg-white/5 border-white/10">
                {t}
              </div>
            ))}
          </motion.div>

        </div>
      </section>

      {/* CORE SERVICES (HOVER) */}
      <section className="px-6 mb-24 md:px-16">
        <h2 className="text-4xl font-bold text-center mb-14">
          Core Engineering Services ⚙️
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((s, i) => (
            <motion.div key={i} whileHover={{ scale: 1.05 }}
              className="relative group h-[200px]">

              <div className="absolute inset-0 flex flex-col items-center justify-center border bg-white/5 border-white/10 rounded-2xl">
                <h3>{s.name}</h3>
                <p className="text-cyan-400">{s.price}</p>
              </div>

              <div className="absolute inset-0 p-6 transition opacity-0 group-hover:opacity-100 bg-gradient-to-br from-black/90 to-cyan-900/40 rounded-2xl">
                <h3 className="font-bold text-cyan-400">{s.name}</h3>

                <ul className="mt-3 space-y-1 text-sm text-gray-300">
                  {s.details.map((d, idx) => <li key={idx}>• {d}</li>)}
                </ul>

                <Link href="/services/tech/order">
                  <button className="w-full py-2 mt-4 rounded-lg bg-cyan-500">
                    Deploy 🚀
                  </button>
                </Link>
              </div>

            </motion.div>
          ))}
        </div>
      </section>

      {/* ARCHITECTURE */}
      <section className="px-6 mb-24 md:px-16">
        <h2 className="mb-12 text-4xl font-bold text-center">
          System Architecture 🧠
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {["Frontend","Backend","Cloud"].map((layer, i) => (
            <div key={i} className="p-6 border bg-black/40 border-white/10 rounded-2xl">
              <h3 className="text-cyan-400">{layer} Layer</h3>
              <p className="mt-2 text-sm text-gray-400">
                {layer === "Frontend" && "React, Next.js, UI Systems"}
                {layer === "Backend" && "APIs, Auth, Logic"}
                {layer === "Cloud" && "AWS, CI/CD, Scaling"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* B2B */}
      <section className="px-6 py-20 md:px-16 bg-black/40">
        <h2 className="text-4xl font-bold text-center text-blue-400 mb-14">
          Enterprise Tech Systems 🏢
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {b2bServices.map((s, i) => (
            <div key={i} className="p-6 border bg-white/5 border-white/10 rounded-2xl">
              <h3>{s.name}</h3>
              <p className="text-blue-400">{s.price}</p>

              <ul className="mt-3 text-sm text-gray-300">
                {s.details.map((d, idx) => <li key={idx}>• {d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* MONTHLY */}
      <section className="px-6 py-20 md:px-16">
        <h2 className="text-4xl font-bold text-center text-green-400 mb-14">
          Tech Maintenance & Support 📡
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {monthlyServices.map((s, i) => (
            <div key={i} className="p-6 border bg-white/5 border-white/10 rounded-2xl">
              <h3>{s.name}</h3>
              <p className="text-green-400">{s.price}</p>

              <ul className="mt-3 text-sm text-gray-300">
                {s.details.map((d, idx) => <li key={idx}>• {d}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <h2 className="text-4xl font-bold md:text-6xl">
          Build Future-Ready Systems ⚡
        </h2>

        <Link href="/services/tech/order">
          <motion.button whileHover={{ scale: 1.1 }}
            className="px-10 py-3 mt-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600">
            Start Development 🚀
          </motion.button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}