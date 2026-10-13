"use client";

import { FaWhatsapp, FaPhone, FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa6";
import { SITE, waLink } from "@/data/site";
import TextReveal from "./TextReveal";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

export default function Contact() {
  const items = [
    { icon: FaPhone, label: SITE.phonesDisplay[0], href: `tel:${SITE.phones[0]}` },
    { icon: FaPhone, label: SITE.phonesDisplay[1], href: `tel:${SITE.phones[1]}` },
    { icon: FaEnvelope, label: SITE.email, href: `mailto:${SITE.email}` },
    { icon: FaInstagram, label: `@${SITE.instagram}`, href: `https://www.instagram.com/${SITE.instagram}` },
    { icon: FaTiktok, label: `@${SITE.tiktok}`, href: `https://www.tiktok.com/@${SITE.tiktok}` },
  ];

  return (
    <>
      <section id="contact" className="relative py-24">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <div className="grain relative overflow-hidden rounded-[2.5rem] bg-chili p-8 text-cream shadow-2xl md:p-14">
              <div className="grid items-center gap-10 md:grid-cols-2">
                <div>
                  <TextReveal
                    text="Hungry? Let's get a jar to you."
                    as="h2"
                    className="font-display text-4xl font-black leading-tight md:text-5xl"
                  />

                  <p className="mt-4 text-cream/90 leading-relaxed">
                    Order for your home, restaurant or event in Dar es Salaam and beyond. Tell us
                    what you need on WhatsApp and we will immediately prepare your order.
                  </p>

                  <div className="mt-8">
                    <Magnetic>
                      <a
                        href={waLink("Hello Alsharif Pickles, I would like to place an order.")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 font-display font-black text-chili shadow-xl transition hover:-translate-y-0.5 hover:bg-white active:scale-95"
                      >
                        <FaWhatsapp className="text-2xl text-leaf" /> Chat on WhatsApp
                      </a>
                    </Magnetic>
                  </div>
                </div>

                <ul className="space-y-3">
                  {items.map((it) => (
                    <li key={it.href}>
                      <a
                        href={it.href}
                        target={it.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 rounded-2xl bg-white/10 px-5 py-3.5 font-semibold backdrop-blur transition hover:bg-white/20 hover:translate-x-1"
                      >
                        <it.icon className="text-xl text-turmeric" />
                        <span className="break-all">{it.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="border-t border-black/10 bg-cream-2/60 py-10 text-center text-sm text-ink/65">
        <div className="mx-auto max-w-7xl px-5">
          <p className="font-display text-xl font-black text-leaf">Alsharif Pickles</p>
          <p className="mt-1 font-medium">{SITE.tagline}.</p>
          <p className="mt-4 text-xs opacity-75">
            © {new Date().getFullYear()} Alsharif Pickles. Handmade in Dar es Salaam, Tanzania. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
