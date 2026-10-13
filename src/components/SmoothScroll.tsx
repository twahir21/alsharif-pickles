"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.5,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger once DOM layout stabilizes
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    // Smooth anchor links navigation
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a || a.getAttribute("href") === "#") return;
      const targetId = a.getAttribute("href");
      if (!targetId) return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -68 });
      }
    };

    document.addEventListener("click", onClick);

    return () => {
      clearTimeout(refreshTimer);
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
