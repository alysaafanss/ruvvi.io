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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="text-xl font-medium tracking-[0.25em] text-foreground"
        >
          RUVVI
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <a
            href="#shop"
            className="inline-flex items-center rounded-full bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            Shop RUVVI
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center justify-center rounded-md p-2 md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <svg
            className="h-6 w-6 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 9h16.5m-16.5 6.75h16.5"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 top-[64px] bg-background/98 backdrop-blur-md md:hidden">
          <div className="flex flex-col items-center gap-8 pt-16">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-lg font-medium text-foreground transition-colors hover:text-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded px-2"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#shop"
              onClick={() => setMenuOpen(false)}
              className="mt-4 inline-flex items-center rounded-full bg-foreground px-8 py-3 text-base font-medium text-background transition-colors hover:bg-foreground/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Shop RUVVI
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
