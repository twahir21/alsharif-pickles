"use client";

import { useRef, type ElementType } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface TextRevealProps {
  text: string;
  as?: HeadingTag;
  className?: string;
  wordClassName?: string;
  delay?: number;
  highlightWord?: string;
  highlightClassName?: string;
}

export default function TextReveal({
  text,
  as = "h2",
  className = "",
  wordClassName = "",
  delay = 0,
  highlightWord,
  highlightClassName = "text-chili italic",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const reducedMotion = useReducedMotion();

  const words = text.split(" ");
  const Component: ElementType = as;

  if (reducedMotion) {
    return (
      <Component className={className}>
        {words.map((w, i) => {
          const isHighlight = highlightWord && w.toLowerCase().includes(highlightWord.toLowerCase());
          return (
            <span key={i} className={isHighlight ? highlightClassName : ""}>
              {w}{" "}
            </span>
          );
        })}
      </Component>
    );
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.045,
        delayChildren: delay,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { y: "115%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration: 0.65,
        ease: "easeOut",
      },
    },
  };

  return (
    <div ref={ref} className="inline-block overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <Component className={className}>
          {words.map((word, index) => {
            const isHighlight =
              highlightWord && word.toLowerCase().includes(highlightWord.toLowerCase());
            return (
              <span
                key={index}
                className="inline-block overflow-hidden pb-1 align-bottom mr-[0.26em] last:mr-0"
              >
                <motion.span
                  variants={wordVariants}
                  className={`inline-block ${isHighlight ? highlightClassName : ""} ${wordClassName}`}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </Component>
      </motion.div>
    </div>
  );
}
