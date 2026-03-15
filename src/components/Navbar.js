"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";

const LEFT_LINKS = [
  { label: "About", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

const RIGHT_LINKS = [];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openCart, qty } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
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
    <>
      {/* Full navbar — visible at top, hides on scroll */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "-translate-y-full opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="bg-foreground">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 sm:py-5 lg:px-8">
            <div className="hidden items-center gap-8 md:flex md:flex-1">
              {LEFT_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="font-display text-base tracking-[0.1em] text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg px-1 sm:text-lg"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <Link
              href="/"
              className="font-display text-2xl tracking-[0.15em] text-white sm:text-3xl md:absolute md:left-1/2 md:-translate-x-1/2"
            >
              RUVVI
            </Link>

            <div className="flex items-center justify-end gap-3 sm:gap-4 md:flex-1">
              <div className="hidden items-center gap-8 md:flex">
                {RIGHT_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="font-display text-base tracking-[0.1em] text-white/70 transition-colors hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg px-1 sm:text-lg"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <button
                onClick={openCart}
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-white/70 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label="Open cart"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
                {qty > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-foreground">
                    {qty}
                  </span>
                )}
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center justify-center rounded-full p-2 text-white/70 hover:text-white md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="fixed inset-0 top-[64px] bg-foreground md:hidden sm:top-[72px]">
            <div className="flex flex-col items-center gap-8 pt-16">
              {[...LEFT_LINKS, ...RIGHT_LINKS].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-3xl tracking-[0.12em] text-white"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Floating logo — appears centered on scroll, no background */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center py-4 transition-all duration-500 sm:py-5 ${
          scrolled
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <Link
          href="/"
          className="font-display text-2xl tracking-[0.15em] text-foreground drop-shadow-sm sm:text-3xl"
        >
          RUVVI
        </Link>
      </div>
    </>
  );
}
