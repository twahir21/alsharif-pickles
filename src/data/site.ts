export const SITE = {
  name: "AL-SHARRYF Pickles",
  tagline: "The best appetite is at home",
  description:
    "AL-SHARRYF Pickles makes handmade Tanzanian pickles and chilli sauces: Ndimu (lemon & lime) pickle, Mango pickle, Mbirimbi pickle, and Ukwaju, Embe, Nanasi & Mbirimbi chilli sauces. Order in Dar es Salaam and across Tanzania.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://AL-SHARRYFpickles.co.tz",
  phones: ["+255712131969", "+255777512347"],
  phonesDisplay: ["+255 712 131 969", "+255 777 512 347"],
  email: "Asya491983@gmail.com",
  instagram: "asyaomar75",
  tiktok: "alsharyyf83pickles6",
  whatsapp: "255712131969",
  currency: "TZS",
};

export const waLink = (text: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
