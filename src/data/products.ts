// NOTE: prices are PLACEHOLDERS in TZS. Edit them here and everything
// (cards, WhatsApp order text, SEO structured data) updates automatically.

export type Category = "pickle" | "sauce";

export type Product = {
  id: string;
  name: string;
  local: string; // Swahili name
  category: Category;
  flavour: string;
  blurb: string;
  image: string;
  heat: 1 | 2 | 3;
  sizes: { ml: number; price: number; image?: string }[];
  badge?: string;
  pairings: string[];
  ingredients: string[];
  colorTheme: {
    bg: string;
    text: string;
    accent: string;
    tagBg: string;
  };
};

export const products: Product[] = [
  {
    id: "ndimu-lemon",
    name: "Ndimu Lemon Pickle",
    local: "Ndimu Lemon",
    category: "pickle",
    flavour: "Lemon",
    blurb:
      "Zesty lemon cured with carrot, garlic, ginger, chilli and spices. Sharp, bright and bold.",
    image: "/images/products/ndimu-lemon.jpg",
    heat: 2,
    sizes: [{ ml: 400, price: 8000 }],
    badge: "Best seller",
    pairings: ["Pilau", "Fish curry", "Roast chicken", "Chapati"],
    ingredients: ["Fresh lemon", "Carrot", "Garlic", "Ginger", "Chilli", "Mustard seeds", "Spices", "Oil"],
    colorTheme: {
      bg: "#713f12",
      text: "#fef9c3",
      accent: "#facc15",
      tagBg: "#854d0e",
    },
  },
  {
    id: "ndimu-lime-chilli",
    name: "Ndimu Lime Chilli Pickle",
    local: "Ndimu Chokaa",
    category: "pickle",
    flavour: "Lime & Chilli",
    blurb:
      "Fresh lime with fiery pilipili, carrot, garlic, onion and ginger. Made for rice, chapati and grills.",
    image: "/images/products/ndimu-lime.jpg",
    heat: 3,
    sizes: [{ ml: 400, price: 8000 }],
    pairings: ["Biryani", "Nyama Choma", "Mishkaki", "Samaki wa Kupaka"],
    ingredients: ["Coastal green lime", "Pilipili mbuzi", "Garlic", "Onion", "Ginger", "Salt", "Spices"],
    colorTheme: {
      bg: "#14532d",
      text: "#dcfce7",
      accent: "#4ade80",
      tagBg: "#166534",
    },
  },
  {
    id: "mango-pickle",
    name: "Mango Pickle",
    local: "Achari ya Embe",
    category: "pickle",
    flavour: "Mango",
    blurb:
      "Tangy green mango pickled in a deep, spiced chilli base. Classic coastal comfort.",
    image: "/images/products/mango-pickle.jpg",
    heat: 2,
    sizes: [{ ml: 370, price: 7000 }],
    pairings: ["Wali na Maharage", "Chapati", "Samosas", "Pilau"],
    ingredients: ["Green raw mango", "Pilipili", "Fenugreek", "Mustard seeds", "Garlic", "Vinegar", "Spices"],
    colorTheme: {
      bg: "#854d0e",
      text: "#fef08a",
      accent: "#eab308",
      tagBg: "#a16207",
    },
  },
  {
    id: "mbirimbi-pickle",
    name: "Mbirimbi Pickle",
    local: "Achari ya Mbirimbi",
    category: "pickle",
    flavour: "Bilimbi",
    blurb:
      "Sour mbirimbi (bilimbi) with carrot, garlic, onion, pilipili, ginger and vinegar.",
    image: "/images/products/mbirimbi-pickle.jpg",
    heat: 2,
    sizes: [{ ml: 370, price: 7000 }],
    pairings: ["Coconut fish curry", "Wali wa nazi", "Mshikaki", "Mandazi"],
    ingredients: ["Fresh mbirimbi (bilimbi)", "Carrot", "Garlic", "Onion", "Chilli", "Ginger", "Vinegar"],
    colorTheme: {
      bg: "#064e3b",
      text: "#d1fae5",
      accent: "#34d399",
      tagBg: "#065f46",
    },
  },
  {
    id: "ukwaju-sauce",
    name: "Ukwaju Tamarind Chilli Sauce",
    local: "Mchuzi wa Ukwaju",
    category: "sauce",
    flavour: "Tamarind",
    blurb:
      "Sweet-sour tamarind meets chilli in a rich, smooth sauce. Brilliant on chips, samosas and mishkaki.",
    image: "/images/products/ukwaju-250.jpg",
    heat: 2,
    sizes: [
      { ml: 250, price: 5000, image: "/images/products/ukwaju-250.jpg" },
      { ml: 370, price: 7000, image: "/images/products/ukwaju-370.jpg" },
    ],
    badge: "Two sizes",
    pairings: ["Chips Mayai", "Mishkaki", "Katlesi", "Bajia", "Samosas"],
    ingredients: ["Pure tamarind pulp", "Pilipili", "Cumin", "Garlic", "Brown sugar", "Sea salt", "Vinegar"],
    colorTheme: {
      bg: "#451a03",
      text: "#fed7aa",
      accent: "#f97316",
      tagBg: "#5c2406",
    },
  },
  {
    id: "embe-sauce",
    name: "Embe Mango Chilli Sauce",
    local: "Mchuzi wa Embe",
    category: "sauce",
    flavour: "Mango & Chilli",
    blurb:
      "Sun-ripe mango softened with a kick of chilli. Fruity, golden and addictive.",
    image: "/images/products/embe-250.jpg",
    heat: 2,
    sizes: [{ ml: 250, price: 5000 }],
    pairings: ["Fried chicken", "Crispy fish", "Spring rolls", "French fries"],
    ingredients: ["Ripe mango pulp", "Red chilli", "Ginger", "Garlic", "Cane sugar", "Citrus", "Vinegar"],
    colorTheme: {
      bg: "#9a3412",
      text: "#ffedd5",
      accent: "#ea580c",
      tagBg: "#c2410c",
    },
  },
  {
    id: "nanasi-sauce",
    name: "Nanasi Pineapple Chilli Sauce",
    local: "Mchuzi wa Nanasi",
    category: "sauce",
    flavour: "Pineapple",
    blurb:
      "Tropical pineapple sweetness with a slow, warm chilli finish. A crowd pleaser.",
    image: "/images/products/nanasi-250.jpg",
    heat: 1,
    sizes: [{ ml: 250, price: 5000 }],
    pairings: ["Grilled prawns", "Burgers", "Roast beef", "Chips"],
    ingredients: ["Fresh pineapple puree", "Mild chilli", "Lime juice", "Ginger", "Natural spices"],
    colorTheme: {
      bg: "#7c2d12",
      text: "#fed7aa",
      accent: "#fb923c",
      tagBg: "#9a3412",
    },
  },
  {
    id: "mbirimbi-sauce",
    name: "Mbirimbi Chilli Sauce",
    local: "Mchuzi wa Mbirimbi",
    category: "sauce",
    flavour: "Bilimbi",
    blurb:
      "Tart mbirimbi blended with carrot, garlic, onion, chilli, ginger and vinegar.",
    image: "/images/products/mbirimbi-sauce-250.jpg",
    heat: 3,
    sizes: [{ ml: 250, price: 5000 }],
    pairings: ["Swahili seafood", "Fish fillets", "Chapati rolls", "Ugali wa samaki"],
    ingredients: ["Mbirimbi (bilimbi)", "Fiery habanero chilli", "Garlic", "Carrot", "Vinegar", "Spices"],
    colorTheme: {
      bg: "#022c22",
      text: "#a7f3d0",
      accent: "#10b981",
      tagBg: "#064e3b",
    },
  },
];

export const formatTZS = (n: number) =>
  `TSh ${n.toLocaleString("en-US")}`;
