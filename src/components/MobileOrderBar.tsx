"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";
import { waLink } from "@/data/site";

export default function MobileOrderBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show once scrolled past 320px
      setVisible(window.scrollY > 320);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed bottom-4 inset-x-4 z-40 md:hidden"
        >
          <div className="flex items-center justify-between rounded-full bg-leaf px-4 py-3 text-cream shadow-2xl shadow-black/30 ring-1 ring-white/20 backdrop-blur-md">
            <div className="flex items-center gap-2.5">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-turmeric opacity-75" />
                <span className="relative inline-flex size-3 rounded-full bg-turmeric" />
              </span>
              <div>
                <p className="font-display text-xs font-bold leading-none text-cream">
                  AL-SHARRYF Pickles
                </p>
                <p className="text-[11px] text-cream/75 leading-tight">Fresh handmade delivery</p>
              </div>
            </div>

            <a
              href={waLink("Hello AL-SHARRYF Pickles, I would like to place an order.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-chili px-4 py-2 text-xs font-bold text-cream shadow-md transition active:scale-95"
            >
              <FaWhatsapp className="text-sm" /> Order on WhatsApp
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
