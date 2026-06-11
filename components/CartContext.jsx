"use client";
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [miniOpen, setMiniOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (err) {
        console.error("Failed to parse saved cart", err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
    // open mini cart immediately so user can place order without navigating
    setMiniOpen(true);
  };

  const removeFromCart = (i) => {
    setCart((prev) => prev.filter((_, index) => index !== i));
  };

  const removeFromCartById = (id) => {
    setCart((prev) => {
      const idx = prev.findIndex((it) => it && (it.id === id || (it.item && it.item.id === id)));
      if (idx === -1) return prev;
      const next = [...prev];
      next.splice(idx, 1);
      return next;
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const openMiniCart = () => setMiniOpen(true);
  const closeMiniCart = () => setMiniOpen(false);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeFromCartById, clearCart, miniOpen, openMiniCart, closeMiniCart }}>
      {children}
    </CartContext.Provider>
  );
};