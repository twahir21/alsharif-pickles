const words = [
  "Ndimu Lemon & Lime",
  "Embe Mango",
  "Mbirimbi Bilimbi",
  "Ukwaju Tamarind",
  "Nanasi Pineapple",
  "Pilipili Mbuzi Fire",
  "Tangawizi Ginger",
  "Kitunguu Saumu Garlic",
];

export default function Marquee() {
  const row = [...words, ...words];
  return (
    <div
      className="relative z-10 overflow-hidden bg-leaf py-3 sm:py-4 text-cream"
      aria-hidden="true"
    >
      <div className="marquee-track flex w-max gap-8 sm:gap-12 whitespace-nowrap select-none">
        {[...row, ...row].map((w, i) => (
          <span
            key={i}
            className="flex items-center gap-8 sm:gap-12 font-display text-base sm:text-xl lg:text-2xl font-black uppercase tracking-wider text-cream/95"
          >
            {w}
            <span className="text-turmeric text-sm sm:text-base drop-shadow-sm">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

