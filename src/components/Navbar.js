"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Ingredients", href: "#ingredients" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className={`mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 shadow-lg backdrop-blur-md"
            : "bg-white/70 backdrop-blur-sm"
        }`}
      >
        <Link
          href="/"
          className="font-display text-lg font-extrabold tracking-tight text-foreground"
        >
          ruvvi
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark rounded-lg px-1"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href="#how-it-works"
            className="rounded-full px-5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark"
          >
            Learn more
          </a>
          <a
            href="#shop"
            className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-foreground/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2"
          >
            Shop RUVVI
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center rounded-full p-2 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <svg
            className="h-5 w-5 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-[72px] bg-white/95 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center gap-6 pt-12">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-2xl font-bold text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#shop"
              onClick={() => setMenuOpen(false)}
              className="mt-4 rounded-full bg-foreground px-10 py-3.5 text-base font-semibold text-white"
            >
              Shop RUVVI
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
