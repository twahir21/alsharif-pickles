"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaUtensils,
  FaPepperHot,
  FaWhatsapp,
  FaLeaf,
  FaHourglassHalf,
  FaShieldHeart,
  FaTruckFast,
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa6";
import { waLink } from "@/data/site";
import TextReveal from "./TextReveal";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";

type DishPairing = {
  id: string;
  dishName: string;
  dishEmoji: string;
  tagline: string;
  recommendedProduct: string;
  productType: "Pickle" | "Chilli Sauce";
  productImage: string;
  heat: 1 | 2 | 3;
  heatLabel: string;
  tasteNote: string;
  whyItWorks: string;
  accentColor: string;
  bgGrad: string;
};

const dishPairings: DishPairing[] = [
  {
    id: "pilau-biryani",
    dishName: "Pilau & Biryani",
    dishEmoji: "🍛",
    tagline: "Fragrant Spiced Coastal Rice",
    recommendedProduct: "Ndimu Lemon & Lime Pickle",
    productType: "Pickle",
    productImage: "/images/products/ndimu-lemon.jpg",
    heat: 2,
    heatLabel: "Medium Citrus Kick",
    tasteNote: "Crisp sun-cured lemons with aromatic ginger, garlic and warm coastal mustard seeds.",
    whyItWorks:
      "Rich ghee and cinnamon in pilau call for a crisp, acidic citrus bite that cuts through richness and heightens every mouthful.",
    accentColor: "#e8a317",
    bgGrad: "from-amber-950/40 to-stone-900/60",
  },
  {
    id: "nyama-choma",
    dishName: "Nyama Choma & Mishkaki",
    dishEmoji: "🥩",
    tagline: "Charcoal Grilled Skewers & Cuts",
    recommendedProduct: "Ndimu Lime Chilli & Pilipili Sauce",
    productType: "Pickle",
    productImage: "/images/products/ndimu-lime.jpg",
    heat: 3,
    heatLabel: "Fiery Coastal Heat",
    tasteNote: "Fresh crushed green lime with blistering habanero heat and slow-infused garlic cloves.",
    whyItWorks:
      "Smoky charred meats crave fiery acidity. The intense lime oils and pilipili mbuzi create that unforgettable roadside barbecue kick.",
    accentColor: "#c8201f",
    bgGrad: "from-red-950/40 to-stone-900/60",
  },
  {
    id: "samaki",
    dishName: "Samaki wa Kupaka & Seafood",
    dishEmoji: "🐟",
    tagline: "Coconut Ocean Fish & Calamari",
    recommendedProduct: "Mbirimbi Coastal Pickle",
    productType: "Pickle",
    productImage: "/images/products/mbirimbi-pickle.jpg",
    heat: 2,
    heatLabel: "Tangy Bilimbi Sour",
    tasteNote: "Authentic coastal tree-sorrel (bilimbi) pickled slowly with traditional Swahili sea spices.",
    whyItWorks:
      "Bilimbi fruit has a natural, gentle tartness that cuts through sweet coconut cream in Samaki wa Kupaka like nothing else.",
    accentColor: "#14532d",
    bgGrad: "from-emerald-950/40 to-stone-900/60",
  },
  {
    id: "chips-mayai",
    dishName: "Chips Mayai & Grills",
    dishEmoji: "🍟",
    tagline: "Dar Street-Side Comfort Favourite",
    recommendedProduct: "Ukwaju Tamarind Chilli Sauce",
    productType: "Chilli Sauce",
    productImage: "/images/products/ukwaju-250.jpg",
    heat: 2,
    heatLabel: "Sweet Tangy Umami",
    tasteNote: "Slow-reduced sweet tamarind pulp blended with roasted garlic and crushed red chillies.",
    whyItWorks:
      "The legendary Dar es Salaam street combo. Sweet tamarind glazes fried eggs and crisp potatoes into savory comfort food gold.",
    accentColor: "#b45309",
    bgGrad: "from-yellow-950/40 to-stone-900/60",
  },
  {
    id: "chapati",
    dishName: "Chapati & Mahamri",
    dishEmoji: "🥞",
    tagline: "Flaky Coastal Breads & Samosas",
    recommendedProduct: "Embe & Nanasi Chilli Sauces",
    productType: "Chilli Sauce",
    productImage: "/images/products/embe-250.jpg",
    heat: 1,
    heatLabel: "Mild Tropical Sweet-Heat",
    tasteNote: "Ripe coastal mangoes and sweet pineapples pureed with a gentle back-of-the-throat tingle.",
    whyItWorks:
      "Pairs wonderfully with warm flaky chapati rolls, meat samosas or crispy bhajias for an irresistible morning or evening tea kick.",
    accentColor: "#d97706",
    bgGrad: "from-amber-950/40 to-stone-900/60",
  },
];

const pillars = [
  {
    icon: FaLeaf,
    title: "100% Coastal Ingredients",
    desc: "Sun-ripened lemons, limes, whole bilimbi, and fiery chillies harvested directly from local farmers in coastal Tanzania.",
  },
  {
    icon: FaHourglassHalf,
    title: "Slow Patient Curing",
    desc: "Aged naturally in traditional small batches with cold-pressed oils and toasted spices. No shortcuts or rushed artificial brews.",
  },
  {
    icon: FaShieldHeart,
    title: "Zero Artificial Additives",
    desc: "No artificial dyes, synthetic preservatives, or MSG. Pure authentic family-kitchen purity that lasts naturally on your shelf.",
  },
  {
    icon: FaTruckFast,
    title: "Fresh Dar & Regional Delivery",
    desc: "Prompt delivery to your home, restaurant or event across Dar es Salaam (Masaki, Mikocheni, Upanga) & bus parcel countrywide.",
  },
];

const testimonials = [
  {
    name: "Fatma M.",
    location: "Masaki, Dar es Salaam",
    quote:
      "The Ndimu lime pickle is now an absolute requirement for our Friday Biryani lunch. Everyone at the table asks where I got it!",
    favItem: "Ndimu Lime Pickle",
  },
  {
    name: "Juma K.",
    location: "Mikocheni, Dar es Salaam",
    quote:
      "I was skeptical about tamarind sauce until I tried Alsharif's Ukwaju. It transformed our family barbecue skewers completely.",
    favItem: "Ukwaju Tamarind Sauce",
  },
  {
    name: "Amina S.",
    location: "Upanga, Dar es Salaam",
    quote:
      "True authentic taste that takes me back to my grandmother's cooking in Pemba. Mbirimbi pickle is so rare to find done this well.",
    favItem: "Mbirimbi Pickle",
  },
];

export default function TasteGuide() {
  const [activeDish, setActiveDish] = useState<DishPairing>(dishPairings[0]);

  return (
    <section
      id="taste-guide"
      className="relative bg-cream-2/70 py-20 lg:py-28 text-ink overflow-hidden"
      aria-label="Coastal Taste and Pairing Guide"
    >
      {/* Decorative background spice ambience */}
      <div className="pointer-events-none absolute -left-40 top-1/4 -z-10 size-96 rounded-full bg-turmeric/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 -z-10 size-96 rounded-full bg-chili/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-chili">
            Ladha Za Nyumbani · Culinary Pairing
          </p>

          <div className="mt-3">
            <TextReveal
              text="The Swahili Meal Pairing Guide"
              as="h2"
              className="font-display text-3xl font-black text-leaf sm:text-4xl lg:text-5xl"
              highlightWord="Pairing"
              highlightClassName="italic text-chili"
            />
          </div>

          <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
            Every dish has its perfect match. Tap your favorite Tanzanian meal below to uncover the
            ideal handcrafted pickle or chilli sauce pairing.
          </p>
        </div>

        {/* Dish Selector Tabs (Mobile scrollable, desktop flex) */}
        <div className="mt-10 flex gap-2.5 overflow-x-auto pb-2 justify-start lg:justify-center scrollbar-none">
          {dishPairings.map((dish) => {
            const isSelected = activeDish.id === dish.id;
            return (
              <button
                key={dish.id}
                onClick={() => setActiveDish(dish)}
                className={`group shrink-0 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition-all shadow-sm ${
                  isSelected
                    ? "bg-leaf text-cream scale-105 shadow-md shadow-leaf/25"
                    : "bg-white text-ink/75 ring-1 ring-black/10 hover:bg-cream hover:text-leaf"
                }`}
              >
                <span className="text-lg">{dish.dishEmoji}</span>
                <span>{dish.dishName}</span>
              </button>
            );
          })}
        </div>

        {/* Active Pairing Card Display */}
        <div className="mt-8 mx-auto max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDish.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grain relative overflow-hidden rounded-[2.5rem] bg-stone-900 text-cream p-7 sm:p-10 lg:p-12 shadow-2xl ring-1 ring-white/10"
            >
              <div className="grid items-center gap-8 md:grid-cols-12 md:gap-10">
                {/* Product Image & Badges (5 cols) */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative h-64 w-48 sm:h-72 sm:w-56 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20 bg-stone-800">
                    <Image
                      src={activeDish.productImage}
                      alt={activeDish.recommendedProduct}
                      fill
                      sizes="250px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3 rounded-full bg-turmeric px-3 py-1 text-[11px] font-black uppercase text-ink shadow-md">
                      {activeDish.productType}
                    </div>
                  </div>

                  <p className="mt-3 text-xs font-semibold uppercase tracking-wider text-turmeric">
                    ✦ Handcrafted in Dar es Salaam
                  </p>
                </div>

                {/* Pairing Details (7 cols) */}
                <div className="md:col-span-7 space-y-4 text-left">
                  <div>
                    <span className="inline-block rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-cream/90 backdrop-blur-sm">
                      {activeDish.dishEmoji} Best Paired With: {activeDish.dishName}
                    </span>
                    <h3 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-black text-cream leading-tight">
                      {activeDish.recommendedProduct}
                    </h3>
                    <p className="text-xs font-semibold text-turmeric mt-1">
                      {activeDish.tagline}
                    </p>
                  </div>

                  {/* Heat Level Indicator */}
                  <div className="flex items-center gap-3 py-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-cream/80">
                      Heat Profile:
                    </span>
                    <div className="flex gap-1 text-sm">
                      {[1, 2, 3].map((n) => (
                        <FaPepperHot
                          key={n}
                          className={n <= activeDish.heat ? "text-chili drop-shadow-sm" : "opacity-25"}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-cream/90">
                      ({activeDish.heatLabel})
                    </span>
                  </div>

                  {/* Flavor Notes */}
                  <div className="space-y-2 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                    <p className="text-xs font-bold uppercase tracking-wider text-turmeric">
                      Why Food Lovers Love This Pairing:
                    </p>
                    <p className="text-sm leading-relaxed text-cream/90">
                      {activeDish.whyItWorks}
                    </p>
                  </div>

                  {/* WhatsApp Order Action */}
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <Magnetic>
                      <a
                        href={waLink(
                          `Hello Alsharif Pickles, I saw your meal pairing guide and would like to order the ${activeDish.recommendedProduct} for our ${activeDish.dishName}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 rounded-full bg-turmeric px-6 py-3 font-display text-sm font-black text-ink shadow-xl transition hover:scale-105 active:scale-95"
                      >
                        <FaWhatsapp className="text-lg text-leaf" /> Order This Combo
                      </a>
                    </Magnetic>

                    <a
                      href="#products"
                      className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-5 py-3 font-display text-xs font-bold text-cream backdrop-blur-sm transition hover:bg-white/15"
                    >
                      <FaUtensils className="text-xs text-turmeric" /> View All 8 Jars
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* 4 CRAFTSMANSHIP PILLARS GRID                             */}
        {/* ======================================================== */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-chili">
              Ubora Wa Asili · Our Promise
            </p>
            <h3 className="mt-2 font-display text-2xl font-black text-leaf sm:text-3xl">
              Why Tanzanian Kitchens Trust Alsharif
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pil, idx) => (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="h-full rounded-3xl bg-white p-7 shadow-lg ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex size-12 items-center justify-center rounded-2xl bg-leaf/10 text-leaf">
                    <pil.icon className="text-xl" />
                  </div>
                  <h4 className="mt-4 font-display text-lg font-bold text-ink">
                    {pil.title}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/70">
                    {pil.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* COMMUNITY LOVE & REVIEWS (SOCIAL PROOF)                  */}
        {/* ======================================================== */}
        <div className="mt-20">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-chili">
              Ushuhuda Wa Wateja · Foodie Reviews
            </p>
            <h3 className="mt-2 font-display text-2xl font-black text-leaf sm:text-3xl">
              What Food Lovers in Dar Say
            </h3>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="relative flex h-full flex-col justify-between rounded-3xl bg-white p-7 shadow-lg ring-1 ring-black/5">
                  <div>
                    {/* 5-Star Rating */}
                    <div className="flex items-center gap-1 text-turmeric mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar key={i} className="text-sm" />
                      ))}
                    </div>

                    <FaQuoteLeft className="text-2xl text-turmeric/30 mb-3" />

                    <p className="text-sm leading-relaxed text-ink/80 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-black/5 flex items-center justify-between">
                    <div>
                      <p className="font-display text-sm font-bold text-ink">{t.name}</p>
                      <p className="text-xs text-ink/55">{t.location}</p>
                    </div>
                    <span className="rounded-full bg-cream px-3 py-1 text-[11px] font-bold text-leaf ring-1 ring-leaf/15">
                      {t.favItem}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
