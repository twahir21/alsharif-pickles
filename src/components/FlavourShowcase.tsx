"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp, FaPepperHot, FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { products, formatTZS } from "@/data/products";
import { waLink } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

// Pick signature flavours representing the key taste profiles:
const showcaseProducts = [
  products.find((p) => p.id === "ukwaju-sauce")!,
  products.find((p) => p.id === "embe-sauce")!,
  products.find((p) => p.id === "ndimu-lime-chilli")!,
  products.find((p) => p.id === "nanasi-sauce")!,
  products.find((p) => p.id === "mbirimbi-pickle")!,
].filter(Boolean);

export default function FlavourShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);

  const totalCards = showcaseProducts.length + 1; // 5 products + 1 finale bundle card

  // GSAP desktop horizontal pin-scroll
  useEffect(() => {
    if (reducedMotion || !sectionRef.current || !trackRef.current) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const getScrollDistance = () => track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              Math.floor(self.progress * totalCards + 0.15),
              totalCards - 1
            );
            setActiveSlide(index);
          },
        },
      });

      return () => {
        scrollTween.kill();
      };
    });

    return () => mm.revert();
  }, [reducedMotion, totalCards]);

  // Mobile horizontal scroll tracking for dot indicator and chevrons
  const handleMobileScroll = () => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const cards = container.children;
    if (!cards || cards.length === 0) return;

    const containerCenter = container.getBoundingClientRect().left + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < cards.length; i++) {
      const cardRect = cards[i].getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const dist = Math.abs(containerCenter - cardCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }

    setActiveSlide(closestIndex);
  };

  const scrollToMobileSlide = (index: number) => {
    if (!mobileScrollRef.current) return;
    const container = mobileScrollRef.current;
    const cards = container.children;
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const targetScroll =
        card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
      setActiveSlide(index);
    }
  };

  const handlePrevMobile = () => {
    const prev = Math.max(0, activeSlide - 1);
    scrollToMobileSlide(prev);
  };

  const handleNextMobile = () => {
    const next = Math.min(totalCards - 1, activeSlide + 1);
    scrollToMobileSlide(next);
  };

  const handleNextDesktop = () => {
    const nextIdx = Math.min(activeSlide + 1, totalCards - 1);
    if (trackRef.current && sectionRef.current) {
      const scrollDist = trackRef.current.scrollWidth - window.innerWidth;
      const step = scrollDist / (totalCards - 1);
      const targetScroll = sectionRef.current.offsetTop + nextIdx * step;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const handlePrevDesktop = () => {
    const prevIdx = Math.max(activeSlide - 1, 0);
    if (trackRef.current && sectionRef.current) {
      const scrollDist = trackRef.current.scrollWidth - window.innerWidth;
      const step = scrollDist / (totalCards - 1);
      const targetScroll = sectionRef.current.offsetTop + prevIdx * step;
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  return (
    <section
      id="showcase"
      ref={sectionRef}
      className="relative overflow-hidden bg-cream"
      aria-label="Signature Flavours Showcase"
    >
      {/* ======================================================== */}
      {/* MOBILE EXPERIENCE (< 1024px)                             */}
      {/* Touch-swipeable carousel with quick flavor jump pills     */}
      {/* ======================================================== */}
      <div className="block lg:hidden py-12 px-4 sm:px-6">
        {/* Mobile Section Header */}
        <div className="mx-auto max-w-xl text-center mb-6">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-chili">
            Signature Recipes
          </p>
          <h2 className="mt-2 font-display text-3xl font-black text-leaf sm:text-4xl">
            Explore Coastal Flavours
          </h2>
          <p className="mt-2 text-sm text-ink/75">
            Swipe left or tap below to discover our handmade pickles & chilli sauces.
          </p>
        </div>

        {/* Quick Flavor Jump Pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-none justify-start sm:justify-center">
          {showcaseProducts.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => scrollToMobileSlide(idx)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                activeSlide === idx
                  ? "bg-leaf text-cream shadow-md scale-105"
                  : "bg-white text-ink/70 ring-1 ring-black/10 hover:bg-cream"
              }`}
            >
              {p.flavour}
            </button>
          ))}
          <button
            onClick={() => scrollToMobileSlide(showcaseProducts.length)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
              activeSlide === showcaseProducts.length
                ? "bg-chili text-cream shadow-md scale-105"
                : "bg-white text-ink/70 ring-1 ring-black/10 hover:bg-cream"
            }`}
          >
            🎁 Trio Box
          </button>
        </div>

        {/* Mobile Horizontal Snap Carousel with Side Chevrons */}
        <div className="relative mt-4">
          {/* Floating Left Chevron for Side Exploring */}
          <button
            type="button"
            onClick={handlePrevMobile}
            disabled={activeSlide === 0}
            aria-label="Previous flavour"
            className="absolute -left-2 sm:left-1 top-1/2 -translate-y-1/2 z-20 flex size-10 sm:size-11 items-center justify-center rounded-full bg-white/95 text-leaf shadow-xl ring-1 ring-black/10 backdrop-blur-md transition-all active:scale-90 disabled:opacity-0 disabled:pointer-events-none hover:bg-white"
          >
            <FaChevronLeft className="text-sm font-bold" />
          </button>

          {/* Floating Right Chevron for Side Exploring */}
          <button
            type="button"
            onClick={handleNextMobile}
            disabled={activeSlide === totalCards - 1}
            aria-label="Next flavour"
            className="absolute -right-2 sm:right-1 top-1/2 -translate-y-1/2 z-20 flex size-10 sm:size-11 items-center justify-center rounded-full bg-white/95 text-leaf shadow-xl ring-1 ring-black/10 backdrop-blur-md transition-all active:scale-90 disabled:opacity-0 disabled:pointer-events-none hover:bg-white"
          >
            <FaChevronRight className="text-sm font-bold" />
          </button>

          {/* Mobile Horizontal Snap Carousel */}
          <div
            ref={mobileScrollRef}
            onScroll={handleMobileScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-none -mx-4 px-6 sm:mx-0 sm:px-3"
          >
          {showcaseProducts.map((p, idx) => {
            const theme = p.colorTheme;
            const size = p.sizes[0];

            return (
              <div
                key={p.id}
                className="snap-center shrink-0 w-[86vw] sm:w-[380px] rounded-3xl p-6 sm:p-7 shadow-xl ring-1 ring-black/10 flex flex-col justify-between transition-transform duration-300"
                style={{ backgroundColor: theme.bg, color: theme.text }}
              >
                <div>
                  {/* Top Meta */}
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider"
                      style={{ backgroundColor: theme.tagBg, color: theme.accent }}
                    >
                      Recipe {idx + 1} of {totalCards}
                    </span>
                    <span className="text-xs font-semibold opacity-80">{p.local}</span>
                  </div>

                  {/* Bottle Image with Glow */}
                  <div className="relative my-6 flex justify-center">
                    <div className="relative h-60 w-44 sm:h-72 sm:w-52">
                      <div
                        className="absolute inset-0 rounded-full blur-2xl opacity-40 animate-pulse"
                        style={{ backgroundColor: theme.accent }}
                        aria-hidden="true"
                      />
                      <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/20">
                        <Image
                          src={size.image ?? p.image}
                          alt={`${p.name} bottle`}
                          fill
                          sizes="240px"
                          className="object-cover"
                        />
                      </div>
                      <div
                        className="absolute -bottom-3 -right-2 rounded-xl px-3.5 py-1.5 shadow-lg ring-1 ring-white/20"
                        style={{ backgroundColor: theme.tagBg, color: theme.text }}
                      >
                        <p className="font-display text-xs font-black uppercase tracking-wider">
                          {p.flavour}
                        </p>
                        <p className="text-[10px] opacity-85">{formatTZS(size.price)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Name and Blurb */}
                  <h3 className="font-display text-2xl font-black leading-tight sm:text-3xl">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-90">{p.blurb}</p>

                  {/* Heat Level */}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                      Heat:
                    </span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map((n) => (
                        <FaPepperHot
                          key={n}
                          className={`text-sm ${
                            n <= p.heat ? "text-chili drop-shadow-sm" : "opacity-30"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold opacity-85">
                      ({["Mild", "Medium", "Hot"][p.heat - 1]})
                    </span>
                  </div>

                  {/* Pairings */}
                  {p.pairings && p.pairings.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.pairings.slice(0, 3).map((pair) => (
                        <span
                          key={pair}
                          className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium backdrop-blur-sm"
                        >
                          {pair}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* WhatsApp Order Action */}
                <div className="mt-6 pt-4 border-t border-white/15">
                  <a
                    href={waLink(
                      `Hello AL-SHARRYF Pickles, I would like to order the signature ${p.name} (${formatTZS(size.price)}).`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2.5 rounded-full bg-white px-5 py-3 font-display text-sm font-black text-ink shadow-lg transition active:scale-95"
                  >
                    <FaWhatsapp className="text-lg text-leaf" /> Order {p.flavour}
                  </a>
                </div>
              </div>
            );
          })}

          {/* Mobile Finale Slide (Trio Box) */}
          <div
            className="snap-center shrink-0 w-[86vw] sm:w-[380px] rounded-3xl p-6 sm:p-7 shadow-xl ring-1 ring-white/15 flex flex-col justify-between bg-stone-900 text-cream"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-turmeric/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-turmeric">
                  Complete Tasting Box
                </span>
                <span className="text-xs font-semibold text-turmeric">Best Value</span>
              </div>

              <div className="relative my-6 flex justify-center">
                <div className="relative h-60 w-52 sm:h-72 sm:w-60 overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/20">
                  <Image
                    src="/images/jars-trio.jpg"
                    alt="AL-SHARRYF Pickles tasting trio jars"
                    fill
                    sizes="260px"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 rounded-xl bg-black/60 backdrop-blur-md px-3 py-1.5 text-center text-cream">
                    <p className="text-xs font-bold">Pick Any 3 Jars & Sauces</p>
                  </div>
                </div>
              </div>

              <h3 className="font-display text-2xl font-black leading-tight sm:text-3xl text-cream">
                Can&apos;t Decide? Get The Trio!
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-cream/80">
                Custom assemble your favorite mix of pickles and chilli sauces. Ideal for family meals,
                gatherings, and gift hampers.
              </p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-cream/90">
                  🌿 100% Coastal
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-cream/90">
                  🎁 Free Gift Packaging
                </span>
                <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-medium text-cream/90">
                  🚚 Dar Delivery
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/15 space-y-2.5">
              <a
                href={waLink(
                  "Hello AL-SHARRYF Pickles, I would like to order a Custom Tasting Trio Box (3 jars of my choice)."
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-turmeric px-5 py-3 font-display text-sm font-black text-ink shadow-lg transition active:scale-95"
              >
                <FaWhatsapp className="text-lg text-leaf" /> Order Trio on WhatsApp
              </a>

              <a
                href="#products"
                className="flex w-full items-center justify-center rounded-full bg-white/10 px-5 py-2.5 text-xs font-bold text-cream transition hover:bg-white/20"
              >
                Browse All 8 Products Below ↓
              </a>
            </div>
          </div>
          </div>
        </div>

        {/* Mobile Swipe Pagination & Chevrons Navigation Bar */}
        <div className="mt-5 flex items-center justify-between px-1">
          <button
            type="button"
            onClick={handlePrevMobile}
            disabled={activeSlide === 0}
            aria-label="Previous flavour"
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ink shadow-sm ring-1 ring-black/10 transition active:scale-95 disabled:opacity-30 disabled:pointer-events-none hover:bg-cream"
          >
            <FaChevronLeft className="text-[10px] text-leaf" /> Prev
          </button>

          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalCards }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => scrollToMobileSlide(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  activeSlide === i ? "w-6 bg-leaf" : "w-2 bg-leaf/25"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNextMobile}
            disabled={activeSlide === totalCards - 1}
            aria-label="Next flavour"
            className="flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-bold text-ink shadow-sm ring-1 ring-black/10 transition active:scale-95 disabled:opacity-30 disabled:pointer-events-none hover:bg-cream"
          >
            Next <FaChevronRight className="text-[10px] text-leaf" />
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* DESKTOP EXPERIENCE (>= 1024px)                           */}
      {/* Precision pinned horizontal scroll with zero blank gaps   */}
      {/* ======================================================== */}
      <div className="hidden lg:block">
        {/* Floating Top Controls Bar */}
        <div className="pointer-events-none absolute top-8 left-8 right-8 z-30 flex items-center justify-between">
          <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-black/40 backdrop-blur-md px-5 py-2.5 text-cream ring-1 ring-white/15 shadow-xl">
            <span className="size-2 rounded-full bg-turmeric animate-pulse" />
            <span className="font-display text-xs font-black uppercase tracking-wider">
              Signature Collection
            </span>
            <span className="text-xs font-semibold text-white/60">
              {String(activeSlide + 1).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
            </span>
          </div>

          {/* Interactive Navigation Arrows */}
          <div className="pointer-events-auto flex items-center gap-2">
            <button
              onClick={handlePrevDesktop}
              disabled={activeSlide === 0}
              aria-label="Previous flavor"
              className="flex size-11 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-cream ring-1 ring-white/15 shadow-xl transition hover:bg-white hover:text-ink disabled:opacity-30 disabled:pointer-events-none"
            >
              <FaChevronLeft className="text-sm" />
            </button>
            <button
              onClick={handleNextDesktop}
              disabled={activeSlide === totalCards - 1}
              aria-label="Next flavor"
              className="flex size-11 items-center justify-center rounded-full bg-black/40 backdrop-blur-md text-cream ring-1 ring-white/15 shadow-xl transition hover:bg-white hover:text-ink disabled:opacity-30 disabled:pointer-events-none"
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>

        {/* Floating Bottom Progress Dots */}
        <div className="pointer-events-none absolute bottom-8 inset-x-0 z-30 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-2 rounded-full bg-black/40 backdrop-blur-md px-4 py-2 ring-1 ring-white/15 shadow-xl">
            {Array.from({ length: totalCards }).map((_, i) => (
              <span
                key={i}
                className={`block h-2 rounded-full transition-all duration-300 ${
                  activeSlide === i ? "w-7 bg-turmeric" : "w-2 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Horizontal Slides Container */}
        <div
          ref={trackRef}
          className="flex h-screen will-change-transform"
          style={{ width: `${totalCards * 100}vw` }}
        >
          {showcaseProducts.map((p, index) => {
            const theme = p.colorTheme;
            const size = p.sizes[0];

            return (
              <div
                key={p.id}
                className="showcase-slide relative flex h-full w-screen shrink-0 items-center justify-center p-12 lg:p-20 transition-colors duration-700 select-none"
                style={{ backgroundColor: theme.bg }}
              >
                {/* Giant Background Watermark Text */}
                <div
                  className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden font-display text-[15vw] font-black uppercase tracking-tighter opacity-10"
                  style={{ color: theme.text }}
                  aria-hidden="true"
                >
                  {p.local}
                </div>

                {/* Slide Content Box */}
                <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
                  {/* Product Hero Image */}
                  <div className="relative flex justify-center">
                    <div className="relative h-[460px] w-96 xl:h-[520px] xl:w-[420px]">
                      {/* Glowing Aura Ring */}
                      <div
                        className="absolute inset-0 rounded-full blur-3xl opacity-35 animate-pulse"
                        style={{ backgroundColor: theme.accent }}
                        aria-hidden="true"
                      />

                      <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-white/20">
                        <Image
                          src={size.image ?? p.image}
                          alt={`${p.name} bottle`}
                          fill
                          sizes="450px"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                          priority={index === 0}
                        />
                      </div>

                      {/* Flavour Tag Pill */}
                      <div
                        className="absolute -bottom-4 -right-2 rounded-2xl px-6 py-3 shadow-xl ring-1 ring-white/20"
                        style={{ backgroundColor: theme.tagBg, color: theme.text }}
                      >
                        <p className="font-display text-sm font-black uppercase tracking-wider">
                          {p.flavour}
                        </p>
                        <p className="text-xs opacity-80">{formatTZS(size.price)}</p>
                      </div>
                    </div>
                  </div>

                  {/* Text and Details */}
                  <div style={{ color: theme.text }} className="space-y-6">
                    <div>
                      <div className="flex items-center gap-3">
                        <span
                          className="rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-widest shadow-sm"
                          style={{ backgroundColor: theme.tagBg, color: theme.accent }}
                        >
                          Flavour {index + 1} of {totalCards}
                        </span>
                        <span className="text-xs font-semibold opacity-75">{p.local}</span>
                      </div>

                      <h3 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                        {p.name}
                      </h3>
                    </div>

                    <p className="text-base sm:text-lg leading-relaxed opacity-90 max-w-xl">
                      {p.blurb}
                    </p>

                    {/* Heat Level */}
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold uppercase tracking-wider opacity-80">
                        Heat Level:
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3].map((n) => (
                          <FaPepperHot
                            key={n}
                            className={`text-base ${
                              n <= p.heat ? "text-chili drop-shadow-sm" : "opacity-25"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold opacity-80">
                        ({["Mild", "Medium", "Hot"][p.heat - 1]})
                      </span>
                    </div>

                    {/* Pairings */}
                    {p.pairings && p.pairings.length > 0 && (
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest opacity-75 mb-2">
                          Coastal Pairings:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {p.pairings.map((pair) => (
                            <span
                              key={pair}
                              className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                            >
                              {pair}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Order Button */}
                    <div className="pt-2">
                      <Magnetic>
                        <a
                          href={waLink(
                            `Hello AL-SHARRYF Pickles, I would like to order the signature ${p.name} (${formatTZS(size.price)}).`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-display font-black text-ink shadow-2xl transition hover:scale-105 active:scale-95"
                        >
                          <FaWhatsapp className="text-xl text-leaf" /> Order {p.flavour}
                        </a>
                      </Magnetic>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Slide 6: Grand Finale Bundle Card (Connects directly into full catalog) */}
          <div
            className="showcase-slide relative flex h-full w-screen shrink-0 items-center justify-center p-12 lg:p-20 bg-stone-900 text-cream select-none"
          >
            {/* Watermark */}
            <div
              className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden font-display text-[15vw] font-black uppercase tracking-tighter opacity-10 text-cream"
              aria-hidden="true"
            >
              AL-SHARRYF
            </div>

            <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Trio Bundle Visual */}
              <div className="relative flex justify-center">
                <div className="relative h-[460px] w-96 xl:h-[500px] xl:w-[440px]">
                  <div className="absolute inset-0 rounded-full blur-3xl opacity-35 bg-turmeric animate-pulse" />
                  <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl ring-1 ring-white/20">
                    <Image
                      src="/images/jars-trio.jpg"
                      alt="AL-SHARRYF Pickles complete jars lineup"
                      fill
                      sizes="480px"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-black/60 backdrop-blur-md p-4 text-center">
                      <p className="font-display text-sm font-bold text-turmeric uppercase tracking-wider">
                        Custom Tasting Trio
                      </p>
                      <p className="text-xs text-cream/80 mt-1">
                        Pick any 3 artisanal jars or sauces in one order
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Text & CTAs */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full bg-turmeric/20 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-turmeric shadow-sm">
                      Best Value Box
                    </span>
                    <span className="text-xs font-semibold text-turmeric">✦ Complete Coastal Experience</span>
                  </div>

                  <h3 className="mt-3 font-display text-4xl font-black leading-tight sm:text-5xl lg:text-6xl text-cream">
                    Can&apos;t pick just one? Build your box.
                  </h3>
                </div>

                <p className="text-base sm:text-lg leading-relaxed text-cream/85 max-w-xl">
                  Mix and match your choice of tangy Ndimu, zesty Mango, rare Bilimbi pickle, or sweet &amp; fiery
                  Ukwaju sauce. Packed fresh with free gift-ready presentation for your kitchen table or loved ones.
                </p>

                <div className="flex flex-wrap gap-2.5">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm text-cream/90">
                    🌿 100% Natural Ingredients
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm text-cream/90">
                    🚚 Doorstep Delivery Across Dar
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm text-cream/90">
                    📦 Regional Bus Parcel Support
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Magnetic>
                    <a
                      href={waLink(
                        "Hello AL-SHARRYF Pickles, I would like to order a Custom Tasting Trio Box (3 jars of my choice)."
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 rounded-full bg-turmeric px-8 py-4 font-display font-black text-ink shadow-2xl transition hover:scale-105 active:scale-95"
                    >
                      <FaWhatsapp className="text-xl text-leaf" /> Order Trio on WhatsApp
                    </a>
                  </Magnetic>

                  <a
                    href="#products"
                    className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-4 font-display text-sm font-bold text-cream backdrop-blur-sm transition hover:bg-white/15"
                  >
                    View All Products Below ↓
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
