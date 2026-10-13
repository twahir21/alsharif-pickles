"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { products, type Category, type Product } from "@/data/products";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import TextReveal from "./TextReveal";

const tabs: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All Items" },
  { id: "pickle", label: "Artisanal Pickles" },
  { id: "sauce", label: "Chilli Sauces" },
];

export default function Products() {
  const [tab, setTab] = useState<"all" | Category>("all");
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const list = products.filter((p) => tab === "all" || p.category === tab);

  return (
    <section id="products" className="relative bg-cream-2/60 py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        {/* Section Header with Kinetic Typography */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-chili">
            Small Batch Craft
          </p>

          <div className="mt-3">
            <TextReveal
              text="Pickles & sauces worth bragging about"
              as="h2"
              className="font-display text-4xl font-black text-leaf md:text-5xl lg:text-6xl"
              highlightWord="bragging"
              highlightClassName="italic text-chili"
            />
          </div>

          <p className="mt-4 text-base sm:text-lg text-ink/75 leading-relaxed">
            Every jar and bottle is made by hand in Tanzania. Tap order to start a direct WhatsApp
            chat with your items ready for quick confirmation and delivery.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex justify-center gap-2" role="tablist">
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all ${
                tab === t.id
                  ? "bg-leaf text-cream shadow-md shadow-leaf/20 scale-105"
                  : "bg-white text-ink/70 ring-1 ring-black/10 hover:text-leaf hover:bg-cream"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Products Grid with 3D Tilt Cards */}
        <motion.div
          layout
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setQuickViewProduct(prod)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Pricing notice */}
        <p className="mt-12 text-center text-sm text-ink/55">
          Prices in Tanzanian shillings. Bulk orders, restaurants and event catering welcome —
          message us anytime for custom quotes.
        </p>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />
    </section>
  );
}
