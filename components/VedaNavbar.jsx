"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { useState } from "react";

export default function VedaNavbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Home", href: "/veda" },
    { name: "Features", href: "#features" },
    { name: "About", href: "#about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07111f]/80 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Veda Brand */}
        <Link href="/veda" className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 4 }}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-xl font-black text-white shadow-lg shadow-cyan-500/20"
          >
            V
          </motion.div>

          <div>
            <div className="text-xl font-bold tracking-tight text-white">
              Veda
            </div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500">
              Smart Healthcare
            </div>
          </div>
        </Link>

        {/* Desktop */}
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-400 transition hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="/veda.apk"
          download="Veda.apk"
          className="hidden items-center gap-2 rounded-xl bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 hover:shadow-lg hover:shadow-cyan-400/20 md:flex"
        >
          <Download size={17} />
          Download App
        </a>

        {/* Mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={27} /> : <Menu size={27} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="border-t border-white/10 bg-[#07111f] px-6 py-6 md:hidden"
        >
          <div className="flex flex-col gap-5">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base text-slate-300"
              >
                {link.name}
              </Link>
            ))}

            <a
              href="/veda.apk"
              download="Veda.apk"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-cyan-400 px-5 py-3 font-semibold text-slate-950"
            >
              <Download size={18} />
              Download App
            </a>
          </div>
        </motion.div>
      )}
    </header>
  );
}