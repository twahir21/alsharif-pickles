"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPepperHot, FaXmark } from "react-icons/fa6";
import { HiSparkles } from "react-icons/hi2";
import { type Product, formatTZS } from "@/data/products";
import { waLink } from "@/data/site";

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function QuickViewModal({ product, onClose }: QuickViewModalProps) {
  const [sizeIndex, setSizeIndex] = useState(0);

  // Reset size selection when product changes
  useEffect(() => {
    setSizeIndex(0);
  }, [product]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (product) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [product, onClose]);

  if (!product) return null;

  const currentSize = product.sizes[sizeIndex] || product.sizes[0];
  const currentImage = currentSize.image ?? product.image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          aria-hidden="true"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl ring-1 ring-black/10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-product-title"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-full bg-cream-2 text-ink/70 transition hover:bg-chili hover:text-white"
            aria-label="Close details"
          >
            <FaXmark className="text-lg" />
          </button>

          <div className="grid gap-6 p-6 sm:grid-cols-2 sm:gap-8 sm:p-8">
            {/* Image side */}
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-cream-2">
              <Image
                src={currentImage}
                alt={`${product.name} ${currentSize.ml}ml`}
                fill
                priority
                sizes="(min-width: 640px) 400px, 90vw"
                className="object-cover"
              />
              {product.badge && (
                <span className="absolute left-3 top-3 rounded-full bg-chili px-3 py-1 text-xs font-bold uppercase tracking-wider text-cream shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Info side */}
            <div className="flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-leaf">
                  {product.category === "pickle" ? "Artisanal Pickle" : "Craft Chilli Sauce"} ·{" "}
                  {product.local}
                </p>
                <h2
                  id="modal-product-title"
                  className="mt-1 font-display text-2xl font-black text-ink sm:text-3xl"
                >
                  {product.name}
                </h2>

                {/* Heat level */}
                <div className="mt-3 flex items-center gap-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/60 mr-1">
                    Heat:
                  </span>
                  {[1, 2, 3].map((n) => (
                    <FaPepperHot
                      key={n}
                      className={n <= product.heat ? "text-chili text-base" : "text-ink/15 text-base"}
                    />
                  ))}
                  <span className="ml-2 text-xs font-bold text-ink/70">
                    {["Mild", "Medium", "Hot Fiery"][product.heat - 1]}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-ink/75">{product.blurb}</p>

                {/* Size Selector */}
                {product.sizes.length > 1 && (
                  <div className="mt-5">
                    <label className="text-xs font-bold uppercase tracking-wider text-ink/60">
                      Select Size:
                    </label>
                    <div className="mt-2 flex gap-2">
                      {product.sizes.map((s, idx) => (
                        <button
                          key={s.ml}
                          onClick={() => setSizeIndex(idx)}
                          className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                            idx === sizeIndex
                              ? "bg-leaf text-cream shadow-sm"
                              : "bg-cream-2 text-ink/70 hover:bg-leaf/10"
                          }`}
                        >
                          {s.ml}ml Jar
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ingredients & Pairings */}
                <div className="mt-5 space-y-3 rounded-2xl bg-cream-2/50 p-4">
                  {product.pairings && product.pairings.length > 0 && (
                    <div>
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-leaf">
                        <HiSparkles className="text-turmeric text-sm" /> Best Paired With:
                      </div>
                      <p className="mt-1 text-xs text-ink/70">
                        {product.pairings.join(", ")}
                      </p>
                    </div>
                  )}

                  {product.ingredients && product.ingredients.length > 0 && (
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-leaf">
                        Ingredients:
                      </span>
                      <p className="mt-1 text-xs text-ink/70">
                        {product.ingredients.join(" · ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 flex items-center justify-between border-t border-black/10 pt-4">
                <div>
                  <p className="text-xs text-ink/50 uppercase font-semibold">Total Price</p>
                  <p className="font-display text-3xl font-black text-chili">
                    {formatTZS(currentSize.price)}
                  </p>
                </div>

                <a
                  href={waLink(
                    `Hello AL-SHARRYF Pickles, I would like to order: ${product.name} ${currentSize.ml}ml (${formatTZS(currentSize.price)}).`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-chili px-6 py-3 font-bold text-cream shadow-lg shadow-chili/25 transition hover:bg-chili-2 hover:shadow-xl"
                >
                  <FaWhatsapp className="text-lg" /> Order on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
