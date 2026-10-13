"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

// SVG Vector Chilli
function ChilliSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M20 75C25 55 42 35 68 25C72 23 75 27 72 30C62 42 48 65 35 80C28 88 18 85 20 75Z"
        fill="#c8201f"
        filter="drop-shadow(0 4px 6px rgba(200,32,31,0.2))"
      />
      {/* Green Stem */}
      <path
        d="M68 25C74 18 84 16 90 14C88 20 84 25 76 27C72 28 68 25 68 25Z"
        fill="#14532d"
      />
      {/* Curved highlight */}
      <path
        d="M28 72C35 55 48 40 64 30"
        stroke="#f87171"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

// SVG Vector Lime Slice
function LimeSliceSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      {/* Outer Rind */}
      <circle cx="50" cy="50" r="46" fill="#15803d" />
      {/* Pith */}
      <circle cx="50" cy="50" r="41" fill="#bbf7d0" />
      {/* Pulp Segments */}
      <circle cx="50" cy="50" r="37" fill="#22c55e" />
      {/* Spoke lines */}
      <path
        d="M50 13V87M13 50H87M24 24L76 76M24 76L76 24"
        stroke="#bbf7d0"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <circle cx="50" cy="50" r="7" fill="#bbf7d0" />
    </svg>
  );
}

// SVG Vector Tamarind Pod
function TamarindSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 70" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M15 45C10 32 20 18 35 22C46 25 52 14 65 16C78 18 84 28 98 26C108 24 116 32 112 42C106 54 94 48 82 52C68 56 60 48 48 50C36 52 24 55 15 45Z"
        fill="#78350f"
        opacity="0.85"
      />
      <circle cx="34" cy="34" r="5" fill="#451a03" />
      <circle cx="68" cy="33" r="5" fill="#451a03" />
      <circle cx="95" cy="36" r="5" fill="#451a03" />
    </svg>
  );
}

// SVG Spice Seed Star
function SpiceStarSvg({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path
        d="M20 0L24 14L38 10L28 20L38 30L24 26L20 40L16 26L2 30L12 20L2 10L16 14L20 0Z"
        fill="#e8a317"
        opacity="0.75"
      />
    </svg>
  );
}

export default function FloatingSpices() {
  const container = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !container.current) return;

    const ctx = gsap.context(() => {
      // Fast drifting elements (foreground)
      gsap.to(".spice-fast", {
        yPercent: -140,
        rotation: 45,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      // Medium drifting elements (midground)
      gsap.to(".spice-mid", {
        yPercent: -80,
        rotation: -30,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.6,
        },
      });

      // Slow drifting elements (background)
      gsap.to(".spice-slow", {
        yPercent: -45,
        rotation: 20,
        ease: "none",
        scrollTrigger: {
          trigger: document.body,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
        },
      });
    }, container);

    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      ref={container}
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Top right chilli (fast) */}
      <div className="spice-fast absolute -right-4 top-[18vh] w-20 opacity-70 md:w-28 lg:w-32">
        <ChilliSvg className="h-auto w-full -rotate-12" />
      </div>

      {/* Mid left lime slice (mid) */}
      <div className="spice-mid absolute -left-6 top-[42vh] w-16 opacity-60 md:w-24 lg:w-28">
        <LimeSliceSvg className="h-auto w-full rotate-45" />
      </div>

      {/* Floating tamarind pod (slow) */}
      <div className="spice-slow absolute right-[10%] top-[65vh] w-20 opacity-50 md:w-28">
        <TamarindSvg className="h-auto w-full rotate-12" />
      </div>

      {/* Floating spice stars */}
      <div className="spice-fast absolute left-[12%] top-[82vh] w-8 opacity-65 md:w-10">
        <SpiceStarSvg className="h-auto w-full" />
      </div>

      <div className="spice-mid absolute right-[6%] top-[120vh] w-16 opacity-60 md:w-20">
        <LimeSliceSvg className="h-auto w-full -rotate-45" />
      </div>

      <div className="spice-slow absolute left-[5%] top-[155vh] w-20 opacity-70 md:w-24">
        <ChilliSvg className="h-auto w-full rotate-45" />
      </div>

      <div className="spice-mid absolute right-[14%] top-[190vh] w-9 opacity-60 md:w-12">
        <SpiceStarSvg className="h-auto w-full rotate-180" />
      </div>

      <div className="spice-slow absolute left-[8%] top-[230vh] w-24 opacity-50 md:w-32">
        <TamarindSvg className="h-auto w-full -rotate-6" />
      </div>
    </div>
  );
}
