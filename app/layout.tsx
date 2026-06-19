import "./globals.css";
import type { Metadata } from "next";
import { CartProvider } from "@/components/CartContext";
import MiniCart from "@/components/MiniCart";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://alphaaryx.com"),
  title: "AlphaAryX | Digital Services Marketplace",
  description: "AlphaAryX offers top-rated digital services, creative design, tech development, marketing, legal and education support with instant cart and order placement.",
  keywords: [
    "AlphaAryX",
    "digital services",
    "service marketplace",
    "web development",
    "graphic design",
    "marketing services",
    "legal services",
    "education services",
    "cart checkout",
    "online services",
  ],
  authors: [
    { name: "AlphaAryX", url: "https://alphaaryx.com" },
  ],
  creator: "AlphaAryX",
  publisher: "AlphaAryX",
  openGraph: {
    title: "AlphaAryX | Digital Services Marketplace",
    description: "Order digital services instantly with cart support, top service categories, and admin management.",
    url: "https://alphaaryx.com",
    siteName: "AlphaAryX",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "https://alphaaryx.com/portfolio/logo.png",
        width: 1200,
        height: 630,
        alt: "AlphaAryX logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AlphaAryX | Digital Services Marketplace",
    description: "Order digital services instantly with cart support, top service categories, and admin management.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
          <Navbar />
          {children}
          <Footer />
          <MiniCart />
        </CartProvider>
      </body>
    </html>
  );
}