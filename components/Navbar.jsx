"use client";

import { motion } from "framer-motion";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/components/CartContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  const { cart, openMiniCart } = useCart();
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
    <nav className="sticky top-0 z-50 border-b shadow-xl backdrop-blur-2xl bg-white/90 border-white/20">
      <div className="flex flex-wrap items-center justify-between px-4 py-4 mx-auto max-w-7xl gap-4">

        <Link href="/" className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image
              src="/portfolio/logo.png"
              alt="logo"
              fill
              className="object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-indigo-600 sm:text-2xl">
              AlphaAryX
            </h1>
            <p className="text-xs text-slate-500 sm:text-sm">Digital Services</p>
          </div>
        </Link>

        <div className="hidden gap-10 md:flex md:items-center">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.href}
              className={`transition ${pathname === link.href ? "text-cyan-600" : "text-slate-700 hover:text-cyan-600"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button onClick={openMiniCart} className="relative inline-flex items-center px-3 py-2 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200">
            <ShoppingCart size={18} />
            <span className="ml-2 text-sm font-medium">Cart</span>
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                {cart.length}
              </span>
            )}
          </button>

          {!user ? (
            <>
              <Link href="/login">
                <button className="px-4 py-2 text-sm border rounded-full hover:bg-slate-100">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-full hover:bg-indigo-700">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-slate-700">
                👋 {user.name}
              </span>

              <Link href={user.role === "admin" ? "/admin" : "/dashboard"}>
                <button className="px-4 py-2 text-sm bg-green-500 rounded-full text-slate-50 hover:bg-green-600">
                  Dashboard
                </button>
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 text-sm bg-red-500 rounded-full text-white hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>

        <button onClick={() => setOpen(!open)} className="p-2 rounded-full border md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden px-4 pb-6 space-y-4 border-t border-slate-200 bg-white/95">
          <div className="flex flex-col gap-3">
            {navLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 rounded-2xl text-base font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => {
              setOpen(false);
              openMiniCart();
            }}
            className="flex items-center justify-between w-full px-4 py-3 rounded-2xl bg-slate-100 text-slate-800"
          >
            <span>Cart</span>
            <span className="text-sm font-semibold">{cart.length} item{cart.length === 1 ? "" : "s"}</span>
          </button>

          {!user ? (
            <div className="flex flex-col gap-3">
              <Link href="/login" onClick={() => setOpen(false)} className="block px-4 py-3 text-center rounded-2xl border border-slate-200">
                Login
              </Link>
              <Link href="/register" onClick={() => setOpen(false)} className="block px-4 py-3 text-center rounded-2xl bg-indigo-600 text-white">
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="px-4 py-3 rounded-2xl bg-slate-100">Hi, {user.name}</span>
              <Link href="/admin" onClick={() => setOpen(false)} className="block px-4 py-3 text-center rounded-2xl bg-green-500 text-white">
                Dashboard
              </Link>
              <button onClick={logout} className="w-full px-4 py-3 text-sm font-semibold text-center rounded-2xl bg-red-500 text-white">
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}