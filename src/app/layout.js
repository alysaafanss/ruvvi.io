import { Cormorant_Garamond, Bebas_Neue } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/CartProvider";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata = {
  title: "RUVVI — Confidence. On demand.",
  description:
    "Discreet oral performance pouches designed for presence, control, and moments that matter. Premium ingredients, fast absorption, daily carry.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cormorant.variable} ${bebas.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
