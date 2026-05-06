"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const data = localStorage.getItem("user");
    if (data) setUser(JSON.parse(data));
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
    window.location.reload();
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b shadow-xl backdrop-blur-2xl bg-white/30 border-white/20">
      <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/portfolio/logo.png"
              alt="logo"
              fill
              sizes="40px"
              className="object-cover rounded-full"
            />
          </div>
          <h1 className="text-2xl font-bold text-indigo-600">
            AlphaAryX
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="items-center hidden gap-10 md:flex">
          {navLinks.map((link, i) => (
            <Link key={i} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="items-center hidden gap-4 md:flex">

          {!user ? (
            <>
              <Link href="/login">
                <button className="px-4 py-2 border rounded">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="px-4 py-2 text-white bg-indigo-600 rounded">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm">
                👋 {user.name}
              </span>

              <Link href="/dashboard">
                <button className="px-4 py-2 bg-green-500 rounded">
                  Dashboard
                </button>
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 bg-red-500 rounded"
              >
                Logout
              </button>
            </>
          )}

        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}