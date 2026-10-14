"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLeaf, FaHandHoldingHeart, FaFire } from "react-icons/fa6";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import TextReveal from "./TextReveal";
import Reveal from "./Reveal";

gsap.registerPlugin(ScrollTrigger);

const values = [
  {
    icon: FaLeaf,
    title: "Fresh coastal produce",
    text: "Crisp carrots, garlic, ginger, onion, zesty lemons, green limes and sun-ripened fruits picked for maximum vibrancy.",
  },
  {
    icon: FaHandHoldingHeart,
    title: "Handcrafted in small batches",
    text: "Prepared slowly with the patient care of a family kitchen in Dar es Salaam — no industrial shortcuts.",
  },
  {
    icon: FaFire,
    title: "Authentic Swahili fire",
    text: "Real pilipili mbuzi heat you can savor, harmoniously balanced with tangy tamarind, sweet mango and warm spices.",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [naturalPct, setNaturalPct] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Counter animation for 100% natural ingredients
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(
            {},
            {
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function () {
                setNaturalPct(Math.floor(this.progress() * 100));
              },
            }
          );
        },
      });

      // Scrubbed Image Reveal Animation
      if (!reducedMotion && imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          {
            clipPath: "inset(14% round 3rem)",
            scale: 1.12,
          },
          {
            clipPath: "inset(0% round 2rem)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "center center",
              scrub: 1.2,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section id="about" ref={sectionRef} className="relative bg-leaf py-24 text-cream">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 md:px-8 lg:grid-cols-2">
        {/* Left: Scrubbed Image Reveal */}
        <div className="relative">
          <div
            ref={imageWrapperRef}
            className="relative overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/20 will-change-transform"
          >
            <Image
              src="/images/jars-trio.jpg"
              alt="Mango pickle, Ndimu lime chilli pickle and Mbirimbi pickle jars"
              width={1280}
              height={794}
              sizes="(min-width:1024px) 600px, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>

          {/* Floating Badge with Counter */}
          <div className="absolute -bottom-6 -right-3 rounded-2xl bg-turmeric px-5 py-3 text-ink shadow-2xl md:-right-6">
            <p className="font-display text-2xl font-black leading-none">
              {naturalPct || 100}%
            </p>
            <p className="text-xs font-bold uppercase tracking-wider opacity-90">
              Natural Ingredients
            </p>
          </div>
        </div>

        {/* Right: Story & Values */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-turmeric">
            Our Heritage
          </p>

          <div className="mt-3">
            <TextReveal
              text="Flavour that tastes like home"
              as="h2"
              className="font-display text-4xl font-black text-cream md:text-5xl"
              highlightWord="home"
              highlightClassName="italic text-turmeric"
            />
          </div>

          <p className="mt-5 text-lg leading-relaxed text-cream/80">
            AL-SHARRYF Pickles started in a family kitchen with one belief: the best appetite is
            at home. We pickle and blend the rich flavours of the Swahili coast, from sour ndimu and
            mbirimbi to sweet ukwaju and nanasi, into handcrafted recipes that lift everyday meals.
          </p>

          {/* Values List */}
          <ul className="mt-10 space-y-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <li className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-cream/10 text-xl text-turmeric ring-1 ring-white/10">
                    <v.icon />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold text-cream">{v.title}</h3>
                    <p className="mt-1 text-sm text-cream/70 leading-relaxed">{v.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
