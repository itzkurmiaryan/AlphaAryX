import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/components/CartContext";

export const metadata: Metadata = {
  title: "AlphaAryX",
  description: "Digital Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}