"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { DEFAULTS } from "@/lib/content-defaults";

export default function Navbar({ content = {} }) {
  const c = { ...DEFAULTS.navbar, ...content };
  const LEFT_LINKS = c.leftLinks || [];
  const RIGHT_LINKS = c.rightLinks || [];
  const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS];
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled && !menuOpen
            ? "-translate-y-full opacity-0"
            : "translate-y-0 opacity-100"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-6 sm:py-6 lg:px-8">
          <div className="hidden items-center gap-8 md:flex md:flex-1">
            {LEFT_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-xs tracking-[0.2em] uppercase text-foreground/50 transition-colors duration-300 hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-accent px-1 sm:text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link
            href="/"
            className="font-display text-2xl font-light tracking-[0.15em] text-foreground sm:text-3xl md:absolute md:left-1/2 md:-translate-x-1/2"
          >
            {c.brandName}
          </Link>

          <div className="flex items-center justify-end gap-3 sm:gap-4 md:flex-1">
            {RIGHT_LINKS.length > 0 && (
              <div className="hidden items-center gap-8 md:flex">
                {RIGHT_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-xs tracking-[0.2em] uppercase text-foreground/50 transition-colors duration-300 hover:text-foreground focus:outline-none focus-visible:ring-1 focus-visible:ring-accent px-1 sm:text-sm"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            )}

            <button
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center text-foreground/50 hover:text-foreground transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-label="Open cart"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              {qty > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-background">
                  {qty}
                </span>
              )}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center justify-center p-2 text-foreground/50 hover:text-foreground md:hidden transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <div className="thin-rule mx-5 sm:mx-6 lg:mx-8" />
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-[55] bg-background md:hidden">
          <div className="flex items-center justify-between px-5 py-5 sm:px-6 sm:py-6">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="font-display text-2xl font-light tracking-[0.15em] text-foreground sm:text-3xl"
            >
              {c.brandName}
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setMenuOpen(false);
                  openCart();
                }}
                className="relative flex h-10 w-10 items-center justify-center text-foreground/50 hover:text-foreground"
                aria-label="Open cart"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </button>
              <button
                onClick={() => setMenuOpen(false)}
                className="flex h-10 w-10 items-center justify-center border border-foreground/20 text-foreground hover:border-foreground/40 transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                aria-label="Close menu"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center gap-10 pt-20">
            {ALL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-3xl font-light tracking-[0.12em] text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Floating logo — appears centered on scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 flex justify-center py-5 transition-all duration-700 sm:py-6 ${
          scrolled && !menuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <Link
          href="/"
          className="font-display text-2xl font-light tracking-[0.15em] text-foreground drop-shadow-sm sm:text-3xl"
        >
          {c.brandName}
        </Link>
      </div>
    </>
  );
}
