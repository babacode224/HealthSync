"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Portals", href: "#portals" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-2 shadow-md bg-surface/95 backdrop-blur-lg border-b border-outline-variant"
          : "py-4 shadow-sm bg-surface border-b border-outline-variant/50"
      }`}
    >
      <div className="flex justify-between items-center w-full px-6 max-w-[1440px] mx-auto">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="relative">
            <svg viewBox="0 0 32 32" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
              <rect width="32" height="32" rx="8" fill="#004e9f" />
              <path d="M16 7v18M7 16h18" stroke="white" strokeWidth="3" strokeLinecap="round" />
              <circle cx="16" cy="16" r="3" fill="white" opacity="0.3" />
            </svg>
          </div>
          <span className="text-xl sm:text-2xl font-bold text-primary tracking-tight">
            HealthSync
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-semibold tracking-wide uppercase transition-colors py-2 px-4 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/5"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:block text-primary text-xs font-semibold tracking-wide hover:bg-primary/5 px-5 py-2.5 rounded-lg transition-all"
          >
            Log In
          </Link>
          <Link
            href="/signup"
            className="bg-primary text-on-primary text-xs font-semibold tracking-wide px-6 py-2.5 rounded-full shadow-md hover:shadow-lg hover:bg-primary-container active:scale-95 transition-all"
          >
            Get Started Free
          </Link>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-surface-container-low"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6 text-on-surface" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-outline-variant bg-surface px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block text-sm font-medium text-on-surface-variant hover:text-primary hover:bg-primary/5 py-2.5 px-3 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link
            href="/login"
            className="block text-sm font-medium text-primary py-2.5 px-3 sm:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            Log In
          </Link>
        </div>
      )}
    </header>
  );
}
