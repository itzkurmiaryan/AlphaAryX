"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { X } from "lucide-react";

export default function MiniCart() {
  const { cart, clearCart, miniOpen, closeMiniCart } = useCart();
  const router = useRouter();

  const total = cart.reduce((a, b) => a + (b.price || b.total || 0), 0);

  if (!miniOpen) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-end md:items-center md:justify-end">
      <div className="absolute inset-0 bg-black/40" onClick={closeMiniCart} />

      <div className="relative w-full max-w-md p-4 mx-4 mb-6 bg-white/95 text-slate-900 rounded-2xl shadow-2xl md:mx-8 md:mb-12">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Cart ({cart.length})</h3>
          <button onClick={closeMiniCart} className="p-2 rounded-full hover:bg-slate-200">
            <X />
          </button>
        </div>

        <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-sm text-slate-600">Your cart is empty.</p>
          ) : (
            cart.map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="min-w-0 pr-4">
                  <div className="text-sm font-medium truncate">{item.name || item.service}</div>
                  <div className="text-xs text-slate-500">₹{item.price || item.total}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-600">Total</span>
            <span className="text-lg font-bold text-cyan-600">₹{total}</span>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            <button
              onClick={() => {
                closeMiniCart();
                router.push('/checkout');
              }}
              className="w-full px-4 py-3 text-sm font-semibold text-white bg-cyan-600 rounded-xl"
            >
              Place Order
            </button>

            <Link href="/cart" onClick={closeMiniCart} className="inline-flex items-center justify-center w-full px-4 py-3 text-sm font-medium rounded-xl bg-slate-100">
              Go to Cart
            </Link>

            <button onClick={() => { clearCart(); }} className="w-full px-4 py-3 text-sm font-semibold rounded-xl border border-red-400 text-red-600">
              Clear Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
