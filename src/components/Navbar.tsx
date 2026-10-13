"use client";

import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";
import { SITE, waLink } from "@/data/site";
import Magnetic from "./Magnetic";

const links = [
  { href: "#showcase", label: "Flavours" },
  { href: "#taste-guide", label: "Pairing Guide" },
  { href: "#products", label: "All Products" },
  { href: "#about", label: "Our Story" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("#top");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);

      // Track active section based on scroll position
      const sections = ["#contact", "#about", "#products", "#taste-guide", "#showcase", "#top"];
      for (const sectionId of sections) {
        const el = document.querySelector(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-cream/92 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
        {/* Brand Logo */}
        <a href="#top" className="flex items-center gap-2.5" aria-label={`${SITE.name} home`}>
          <span className="grid size-9 place-items-center rounded-xl bg-chili font-display text-lg font-black text-cream shadow-sm">
            A
          </span>
          <span className="font-display text-xl font-black tracking-tight text-leaf">
            Alsharif <span className="text-chili">Pickles</span>
          </span>
        </a>

        {/* Desktop Navigation Links with Active Indicator */}
        <ul className="hidden items-center gap-2 md:flex">
          {links.map((l) => {
            const isActive = activeSection === l.href;
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`relative rounded-full px-4 py-1.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-leaf font-bold"
                      : "text-ink/75 hover:text-chili hover:bg-cream-2/50"
                  }`}
                >
                  {/* Sliding active pill background */}
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-leaf/10 ring-1 ring-leaf/20"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {l.label}
                </a>
              </li>
            );
          })}

          <li className="ml-4">
            <Magnetic>
              <a
                href={waLink("Hello Alsharif Pickles, I would like to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-leaf px-5 py-2.5 text-sm font-bold text-cream shadow-md transition hover:bg-leaf-2 active:scale-95"
              >
                <FaWhatsapp className="text-base" /> Order now
              </a>
            </Magnetic>
          </li>
        </ul>

        {/* Mobile Hamburger Button */}
        <button
          className="grid size-10 place-items-center rounded-xl text-leaf transition hover:bg-cream-2/60 md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <HiXMark size={26} /> : <HiBars3 size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-black/5 bg-cream/98 px-6 pb-6 md:hidden shadow-xl"
          >
            <ul className="pt-2">
              {links.map((l) => {
                const isActive = activeSection === l.href;
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className={`flex items-center justify-between border-b border-black/5 py-3.5 font-semibold text-base transition ${
                        isActive ? "text-chili font-bold" : "text-ink/80"
                      }`}
                    >
                      {l.label}
                      {isActive && <span className="size-2 rounded-full bg-chili" />}
                    </a>
                  </li>
                );
              })}
              <li className="pt-5">
                <a
                  href={waLink("Hello Alsharif Pickles, I would like to place an order.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-full bg-chili py-3.5 font-bold text-cream shadow-lg"
                >
                  <FaWhatsapp className="text-lg" /> Order on WhatsApp
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
