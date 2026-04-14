import localFont from "next/font/local";
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
    "Premium sexual wellness. Launching soon. Be the first to know.",
  openGraph: {
    title: "RUVVI — For the night ahead.",
    description: "Premium sexual wellness. Launching soon. Be the first to know.",
    url: "https://ruvvi.io",
    siteName: "RUVVI",
    type: "website",
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
    description: "Premium sexual wellness. Launching soon. Be the first to know.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${metropolis.variable} ${theSeasons.variable} ${bdScript.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
