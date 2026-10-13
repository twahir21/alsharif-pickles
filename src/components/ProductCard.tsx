"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaPepperHot, FaWhatsapp, FaEye } from "react-icons/fa6";
import { type Product, formatTZS } from "@/data/products";
import { waLink } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ProductCardProps {
  product: Product;
  onQuickView: (p: Product) => void;
}

export default function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [sizeIndex, setSizeIndex] = useState(0);
  const [isPopping, setIsPopping] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const currentSize = product.sizes[sizeIndex] || product.sizes[0];
  const currentImage = currentSize.image ?? product.image;

  // 3D Tilt Motion Values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["9deg", "-9deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-9deg", "9deg"]);

  // Dynamic glare overlay position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    if (reducedMotion) return;
    x.set(0);
    y.set(0);
  };

  const handleOrderClick = () => {
    setIsPopping(true);
    setTimeout(() => setIsPopping(false), 500);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="perspective-container relative group"
    >
      <motion.article
        style={{
          rotateX: reducedMotion ? 0 : rotateX,
          rotateY: reducedMotion ? 0 : rotateY,
        }}
        className="card-3d relative flex flex-col overflow-hidden rounded-3xl bg-white shadow-md ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl hover:shadow-leaf/15"
        id={product.id}
      >
        {/* Dynamic glare sheen overlay */}
        {!reducedMotion && (
          <motion.div
            style={{
              background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 65%)`,
            }}
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          />
        )}

        {/* Product Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden bg-cream-2">
          <Image
            src={currentImage}
            alt={`${product.name} ${currentSize.ml}ml`}
            fill
            sizes="(min-width:1280px) 300px, (min-width:640px) 45vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute left-3.5 top-3.5 z-10 rounded-full bg-chili px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-cream shadow-sm">
              {product.badge}
            </span>
          )}

          {/* Size Tag */}
          <span className="absolute right-3.5 top-3.5 z-10 rounded-full bg-leaf px-3 py-1 text-[11px] font-bold text-cream shadow-sm">
            {currentSize.ml}ml
          </span>

          {/* Quick View Button overlay on hover */}
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/25 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
            <button
              onClick={() => onQuickView(product)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-leaf shadow-lg transition hover:scale-105 hover:bg-cream"
              aria-label={`Quick view ${product.name}`}
            >
              <FaEye className="text-sm" /> Quick View
            </button>
          </div>
        </div>

        {/* Details Content */}
        <div className="flex flex-1 flex-col p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-leaf/75">
            {product.category === "pickle" ? "Pickle" : "Chilli sauce"} · {product.flavour}
          </p>

          <h3 className="mt-1 font-display text-xl font-extrabold leading-tight text-ink group-hover:text-leaf transition-colors">
            {product.name}
          </h3>

          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/70 line-clamp-2">
            {product.blurb}
          </p>

          {/* Heat Indicator */}
          <div className="mt-3 flex items-center gap-1.5" aria-label={`Heat level ${product.heat} of 3`}>
            {[1, 2, 3].map((n) => (
              <FaPepperHot
                key={n}
                className={n <= product.heat ? "text-chili text-sm" : "text-ink/15 text-sm"}
              />
            ))}
            <span className="ml-1.5 text-xs font-semibold text-ink/50">
              {["Mild", "Medium", "Fiery Hot"][product.heat - 1]}
            </span>
          </div>

          {/* Size Options */}
          {product.sizes.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.sizes.map((s, idx) => (
                <button
                  key={s.ml}
                  onClick={() => setSizeIndex(idx)}
                  className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                    idx === sizeIndex
                      ? "bg-leaf text-cream"
                      : "bg-cream-2 text-ink/70 hover:bg-leaf/10"
                  }`}
                >
                  {s.ml}ml
                </button>
              ))}
            </div>
          )}

          {/* Pricing & Order CTA */}
          <div className="mt-5 flex items-center justify-between gap-3 border-t border-black/5 pt-3">
            <div>
              <p className="font-display text-2xl font-black text-chili">
                {formatTZS(currentSize.price)}
              </p>
            </div>

            <div className="relative">
              {/* Order Pop Particle burst */}
              {isPopping && (
                <motion.span
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="pointer-events-none absolute -inset-2 rounded-full border-2 border-turmeric bg-turmeric/30"
                />
              )}

              <motion.a
                animate={isPopping ? { scale: [1, 1.18, 0.95, 1] } : {}}
                transition={{ duration: 0.4 }}
                onClick={handleOrderClick}
                href={waLink(
                  `Hello Alsharif Pickles, I would like to order: ${product.name} ${currentSize.ml}ml (${formatTZS(currentSize.price)}).`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-leaf px-4 py-2.5 text-sm font-bold text-cream shadow-md transition hover:bg-leaf-2 active:scale-95"
              >
                <FaWhatsapp className="text-base" /> Order
              </motion.a>
            </div>
          </div>
        </div>
      </motion.article>
    </div>
  );
}
