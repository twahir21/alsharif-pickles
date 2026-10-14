"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user has already seen the intro or prefers reduced motion
    const alreadySeen = sessionStorage.getItem("AL-SHARRYF_intro_seen");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (alreadySeen || reducedMotion) {
      setVisible(false);
      onComplete?.();
      return;
    }

    // Smooth filling progress over ~1.3s
    const startTime = Date.now();
    const duration = 1200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.floor((elapsed / duration) * 100));
      setProgress(pct);

      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          sessionStorage.setItem("AL-SHARRYF_intro_seen", "true");
          setVisible(false);
          onComplete?.();
        }, 350);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem("AL-SHARRYF_intro_seen", "true");
    setVisible(false);
    onComplete?.();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ y: "-100%", transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cream grain"
          role="status"
          aria-label="Loading AL-SHARRYF Pickles"
        >
          {/* Skip Button */}
          <button
            onClick={handleSkip}
            className="absolute right-6 top-6 rounded-full border border-leaf/20 bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-leaf/80 transition hover:bg-leaf hover:text-cream"
          >
            Skip Intro
          </button>

          <div className="flex flex-col items-center">
            {/* Animated Pickle Jar SVG */}
            <div className="relative h-44 w-32">
              <svg
                viewBox="0 0 120 160"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-full w-full drop-shadow-md"
              >
                {/* Jar Lid */}
                <motion.rect
                  x="30"
                  y="12"
                  width="60"
                  height="14"
                  rx="4"
                  fill="#c8201f"
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                />
                {/* Lid Neck */}
                <rect x="38" y="26" width="44" height="6" rx="1" fill="#a31615" />

                {/* Jar Glass Outline */}
                <path
                  d="M32 32C22 32 16 40 16 52V136C16 148 24 154 36 154H84C96 154 104 148 104 136V52C104 40 98 32 88 32H32Z"
                  fill="#ffffff"
                  fillOpacity="0.8"
                  stroke="#14532d"
                  strokeWidth="3.5"
                />

                {/* Mask for liquid fill */}
                <defs>
                  <clipPath id="jarClip">
                    <path d="M34 34C24 34 19 41 19 52V134C19 146 26 151 37 151H83C94 151 101 146 101 134V52C101 41 96 34 86 34H34Z" />
                  </clipPath>
                </defs>

                {/* Liquid Fill */}
                <g clipPath="url(#jarClip)">
                  {/* Base pickle liquid (tamarind/chilli red gradient) */}
                  <rect
                    x="16"
                    y={154 - (progress / 100) * 122}
                    width="88"
                    height="122"
                    fill="#c8201f"
                    className="transition-all duration-75"
                  />
                  {/* Liquid surface wave / shimmer */}
                  <path
                    d={`M 16 ${154 - (progress / 100) * 122} Q 40 ${150 - (progress / 100) * 122} 60 ${154 - (progress / 100) * 122} T 104 ${154 - (progress / 100) * 122} V 154 H 16 Z`}
                    fill="#e8a317"
                    opacity="0.4"
                  />
                  {/* Floating spices / seeds inside the jar */}
                  {progress > 25 && (
                    <>
                      <circle cx="38" cy="120" r="3" fill="#e8a317" />
                      <circle cx="78" cy="130" r="2.5" fill="#14532d" />
                      <circle cx="50" cy="100" r="3.5" fill="#fbf5e9" />
                      <circle cx="68" cy="85" r="3" fill="#e8a317" />
                      <circle cx="35" cy="70" r="2" fill="#14532d" />
                    </>
                  )}
                  {/* Jar label outline */}
                  <rect
                    x="30"
                    y="65"
                    width="60"
                    height="50"
                    rx="6"
                    fill="#fbf5e9"
                    stroke="#14532d"
                    strokeWidth="1.5"
                    opacity={progress > 60 ? 0.95 : 0}
                  />
                  {progress > 65 && (
                    <text
                      x="60"
                      y="95"
                      textAnchor="middle"
                      fill="#14532d"
                      fontSize="14"
                      fontWeight="bold"
                      fontFamily="var(--font-display), serif"
                    >
                      A
                    </text>
                  )}
                </g>

                {/* Glass reflection highlight */}
                <path
                  d="M24 55V130"
                  stroke="#ffffff"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.8"
                />
              </svg>
            </div>

            {/* Brand Logo & Percentage */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-center"
            >
              <h2 className="font-display text-2xl font-black tracking-tight text-leaf">
                AL-SHARRYF <span className="text-chili">Pickles</span>
              </h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-ink/60">
                The best appetite is at home
              </p>
            </motion.div>

            {/* Percentage Bar */}
            <div className="mt-6 h-1 w-44 overflow-hidden rounded-full bg-cream-2">
              <div
                className="h-full bg-chili transition-all duration-75 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="mt-2 text-[11px] font-bold text-ink/40">{progress}%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
