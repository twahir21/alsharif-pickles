"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Ultra-smooth spring physics for trailing outer ring
  const ringX = useSpring(mouseX, { stiffness: 350, damping: 28 });
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 28 });

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced motion preference
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reducedMotion) return;
    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a") ||
        target?.closest("button") ||
        target?.closest('[role="button"]') ||
        target?.closest(".clickable") ||
        target?.closest(".card-3d")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Outer trailing ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.8 : isClicking ? 0.75 : 1,
          borderColor: isHovered ? "rgba(200, 32, 31, 0.85)" : "rgba(20, 83, 45, 0.4)",
          backgroundColor: isHovered ? "rgba(200, 32, 31, 0.1)" : "rgba(200, 32, 31, 0)",
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="size-9 rounded-full border-2"
      />

      {/* Inner precise dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.5 : isClicking ? 1.4 : 1,
          backgroundColor: isHovered ? "#c8201f" : "#14532d",
        }}
        transition={{ duration: 0.1 }}
        className="size-2 rounded-full"
      />
    </div>
  );
}
