import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/CartProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "RUVVI — Confidence. On demand.",
  description:
    "Discreet oral performance pouches designed for presence, control, and moments that matter. Premium ingredients, fast absorption, daily carry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${cormorant.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
