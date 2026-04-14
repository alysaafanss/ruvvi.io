import localFont from "next/font/local";
import Analytics from "@/components/Analytics";
import "./globals.css";

const metropolis = localFont({
  src: [
    { path: "../fonts/Metropolis-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Metropolis-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Metropolis-SemiBold.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-metropolis",
  display: "swap",
});

const theSeasons = localFont({
  src: [
    { path: "../fonts/TheSeasons-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/TheSeasons-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-seasons",
  display: "swap",
});

const bdScript = localFont({
  src: [
    { path: "../fonts/BDScript-Regular.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-bdscript",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://ruvvi.io"),
  title: "RUVVI — For the night ahead.",
  description:
    "Premium oral pouches for confidence and performance. Discreet, fast-acting, clinically dosed. No prescription needed. Join the waitlist.",
  keywords: [
    "sexual wellness",
    "performance pouch",
    "oral pouch",
    "discreet",
    "confidence",
    "RUVVI",
  ],
  openGraph: {
    title: "RUVVI — For the night ahead.",
    description:
      "Premium oral pouches for confidence and performance. Discreet, fast-acting, clinically dosed. Join the waitlist.",
    url: "https://ruvvi.io",
    siteName: "RUVVI",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "RUVVI — For the night ahead.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RUVVI — For the night ahead.",
    description:
      "Premium oral pouches for confidence and performance. Discreet, fast-acting, clinically dosed. Join the waitlist.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${metropolis.variable} ${theSeasons.variable} ${bdScript.variable} antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
