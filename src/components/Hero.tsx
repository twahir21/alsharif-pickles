"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaWhatsapp } from "react-icons/fa6";
import { HiArrowDown } from "react-icons/hi2";
import { waLink } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import Magnetic from "./Magnetic";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const [stats, setStats] = useState({ flavours: 0, shelfLife: 0 });

  useEffect(() => {
    // Initial entrance timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".h-eyebrow", { y: 20, opacity: 0, duration: 0.7 })
        .from(".h-line", { yPercent: 110, duration: 1, stagger: 0.12 }, "-=0.4")
        .from(".h-copy", { y: 24, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".h-cta", { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .from(".h-img", { scale: 0.88, opacity: 0, duration: 1.2 }, 0.2);

      // Stats counter animation
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 60%",
        onEnter: () => {
          gsap.to(
            {},
            {
              duration: 1.6,
              ease: "power2.out",
              onUpdate: function () {
                const progress = this.progress();
                setStats({
                  flavours: Math.floor(progress * 8),
                  shelfLife: Math.floor(progress * 2),
                });
              },
            }
          );
        },
      });

      // Desktop Pinned Hero-to-Products Transition
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop && !reducedMotion) {
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // 1. Text fades and recedes slightly
        pinTl.to(".h-text-col", {
          opacity: 0.15,
          scale: 0.94,
          y: -40,
          ease: "power1.inOut",
        }, 0);

        // 2. Main image scales up and centralizes
        pinTl.to(".h-img-inner", {
          scale: 1.08,
          xPercent: -15,
          yPercent: 8,
          ease: "power1.inOut",
        }, 0);

        // 3. Flavour bottle preview cards separate and fan out
        pinTl.to(".h-fan-left", {
          xPercent: -75,
          yPercent: 20,
          rotation: -14,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
        }, 0.1);

        pinTl.to(".h-fan-right", {
          xPercent: 75,
          yPercent: 35,
          rotation: 14,
          opacity: 1,
          scale: 1,
          ease: "power2.out",
        }, 0.1);

        // Background ambience blob reacts
        pinTl.to(".h-blob", {
          scale: 1.4,
          opacity: 0.4,
          ease: "none",
        }, 0);
      }
    }, root);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="top"
      ref={root}
      className="grain relative isolate overflow-hidden bg-cream pb-16 pt-28 md:pt-32"
    >
      {/* Background Ambience Blobs */}
      <div className="h-blob absolute -right-40 -top-40 -z-10 size-[620px] rounded-full bg-turmeric/25 blur-3xl transition-transform" />
      <div className="absolute -left-40 bottom-0 -z-10 size-[460px] rounded-full bg-chili/10 blur-3xl" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-8 lg:grid-cols-2">
        {/* Left Column: Story & CTAs */}
        <div className="h-text-col">
          <p className="h-eyebrow mb-5 inline-flex items-center gap-2 rounded-full border border-leaf/20 bg-white/60 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-leaf">
            <span className="size-1.5 rounded-full bg-chili animate-ping" /> Handmade in Tanzania
          </p>

          <h1 className="font-display text-5xl font-black leading-[0.98] tracking-tight text-leaf sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden pb-1">
              <span className="h-line block">The best</span>
            </span>
            <span className="block overflow-hidden pb-1">
              <span className="h-line block text-chili italic">appetite</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="h-line block">is at home.</span>
            </span>
          </h1>

          <p className="h-copy mt-6 max-w-md text-lg leading-relaxed text-ink/75">
            Small-batch pickles and chilli sauces made with ndimu, embe, mbirimbi, ukwaju and
            fiery pilipili. Bold flavour for every plate.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Magnetic>
              <a
                href="#showcase"
                className="h-cta inline-flex items-center gap-2 rounded-full bg-chili px-8 py-4 font-bold text-cream shadow-xl shadow-chili/25 transition hover:bg-chili-2 active:scale-95"
              >
                Explore the range <HiArrowDown className="text-lg animate-bounce" />
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={waLink("Hello AL-SHARRYF Pickles, I would like to place an order.")}
                target="_blank"
                rel="noopener noreferrer"
                className="h-cta inline-flex items-center gap-2 rounded-full border-2 border-leaf px-8 py-4 font-bold text-leaf transition hover:bg-leaf hover:text-cream active:scale-95"
              >
                <FaWhatsapp className="text-xl" /> Order on WhatsApp
              </a>
            </Magnetic>
          </div>

          {/* Stats Counters */}
          <dl className="h-cta mt-12 flex gap-10">
            <div>
              <dt className="font-display text-3xl font-black text-leaf">
                {stats.flavours || 8}
              </dt>
              <dd className="text-xs font-semibold uppercase tracking-wider text-ink/55">Flavours</dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-black text-leaf">250–400ml</dt>
              <dd className="text-xs font-semibold uppercase tracking-wider text-ink/55">Sizes</dd>
            </div>
            <div>
              <dt className="font-display text-3xl font-black text-leaf">
                {stats.shelfLife || 2} yrs
              </dt>
              <dd className="text-xs font-semibold uppercase tracking-wider text-ink/55">Shelf life</dd>
            </div>
          </dl>
        </div>

        {/* Right Column: Hero Visuals with Fanning Bottles */}
        <div className="h-img relative flex items-center justify-center">
          {/* Fanning Left Bottle (revealed on scroll) */}
          <div className="h-fan-left pointer-events-none absolute left-0 z-0 hidden w-44 rounded-2xl bg-white/90 p-2 shadow-2xl opacity-0 ring-1 ring-black/5 lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="/images/products/ukwaju-250.jpg"
                alt="Ukwaju Tamarind Sauce"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-center font-display text-xs font-bold text-leaf">Ukwaju Tamarind</p>
          </div>

          {/* Fanning Right Bottle (revealed on scroll) */}
          <div className="h-fan-right pointer-events-none absolute right-0 z-0 hidden w-44 rounded-2xl bg-white/90 p-2 shadow-2xl opacity-0 ring-1 ring-black/5 lg:block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl">
              <Image
                src="/images/products/ndimu-lime.jpg"
                alt="Ndimu Lime Pickle"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
            <p className="mt-2 text-center font-display text-xs font-bold text-leaf">Ndimu Lime Pickle</p>
          </div>

          {/* Center Main Range Display */}
          <div className="h-img-inner relative z-10 w-full overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-leaf/20 ring-1 ring-black/5">
            <Image
              src="/images/sauces-range.jpg"
              alt="AL-SHARRYF Pickles chilli sauces: Ukwaju tamarind, Embe mango, Nanasi pineapple and Mbirimbi"
              width={1080}
              height={808}
              priority
              sizes="(min-width:1024px) 600px, 100vw"
              className="h-auto w-full"
            />
          </div>

          {/* Price Floating Pill */}
          <div className="absolute -bottom-5 -left-3 z-20 rotate-[-6deg] rounded-2xl bg-leaf px-5 py-3 text-cream shadow-xl md:-left-8">
            <p className="font-display text-lg font-black leading-none">From TSh 5,000</p>
            <p className="text-xs opacity-80">Pickles &amp; chilli sauces</p>
          </div>
        </div>
      </div>
    </section>
  );
}
