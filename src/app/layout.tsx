import type { Metadata, Viewport } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/data/site";
import { products } from "@/data/products";
import SmoothScroll from "@/components/SmoothScroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#14532d",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Alsharif Pickles | Handmade Pickles & Chilli Sauces in Tanzania",
    template: "%s | Alsharif Pickles",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "Alsharif Pickles",
    "Al Sharryf",
    "pickles Tanzania",
    "achari Tanzania",
    "ndimu pickle",
    "lemon pickle",
    "mango pickle",
    "mbirimbi pickle",
    "ukwaju sauce",
    "tamarind chilli sauce",
    "pineapple chilli sauce",
    "mango chilli sauce",
    "pilipili sauce",
    "handmade pickles Dar es Salaam",
    "buy pickles Dar es Salaam",
    "Swahili pickles",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_TZ",
    url: SITE.url,
    siteName: SITE.name,
    title: "Alsharif Pickles | The best appetite is at home",
    description: SITE.description,
    images: [
      {
        url: "/images/og.jpg",
        width: 1080,
        height: 808,
        alt: "Alsharif Pickles chilli sauce range: Ukwaju, Embe, Nanasi and Mbirimbi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alsharif Pickles | Handmade Pickles & Chilli Sauces",
    description: SITE.description,
    images: ["/images/og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "food",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness", "FoodEstablishment"],
      "@id": `${SITE.url}/#org`,
      name: SITE.name,
      alternateName: "Al Sharryf",
      slogan: SITE.tagline,
      url: SITE.url,
      logo: `${SITE.url}/icon.svg`,
      image: `${SITE.url}/images/og.jpg`,
      description: SITE.description,
      email: SITE.email,
      telephone: SITE.phones,
      priceRange: "TSh 5,000 - TSh 8,000",
      areaServed: "TZ",
      address: { "@type": "PostalAddress", addressCountry: "TZ", addressRegion: "Dar es Salaam" },
      sameAs: [
        `https://www.instagram.com/${SITE.instagram}`,
        `https://www.tiktok.com/@${SITE.tiktok}`,
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}/#website`,
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": `${SITE.url}/#org` },
      inLanguage: "en",
    },
    {
      "@type": "ItemList",
      name: "Alsharif Pickles products",
      itemListElement: products.flatMap((p, i) =>
        p.sizes.map((s, j) => ({
          "@type": "ListItem",
          position: i * 2 + j + 1,
          item: {
            "@type": "Product",
            name: `${p.name} ${s.ml}ml`,
            description: p.blurb,
            image: `${SITE.url}${s.image ?? p.image}`,
            brand: { "@type": "Brand", name: SITE.name },
            category: p.category === "pickle" ? "Pickles" : "Sauces",
            offers: {
              "@type": "Offer",
              priceCurrency: "TZS",
              price: s.price,
              availability: "https://schema.org/InStock",
              url: `${SITE.url}/#${p.id}`,
              seller: { "@id": `${SITE.url}/#org` },
            },
          },
        })),
      ),
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${jakarta.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
