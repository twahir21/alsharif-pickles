import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import FlavourShowcase from "@/components/FlavourShowcase";
import TasteGuide from "@/components/TasteGuide";
import Products from "@/components/Products";
import About from "@/components/About";
import Contact from "@/components/Contact";
import ProgressBar from "@/components/ProgressBar";
import LoadingScreen from "@/components/LoadingScreen";
import CustomCursor from "@/components/CustomCursor";
import FloatingSpices from "@/components/FloatingSpices";
import MobileOrderBar from "@/components/MobileOrderBar";
import WavyDivider from "@/components/WavyDivider";

export default function Home() {
  return (
    <>
      {/* Top Scroll Progress Indicator */}
      <ProgressBar />

      {/* Branded Loading Intro */}
      <LoadingScreen />

      {/* Desktop Custom Follower Cursor */}
      <CustomCursor />

      {/* Global Background Parallax Spices & Chillies */}
      <FloatingSpices />

      {/* Navigation Header */}
      <Navbar />

      <main className="relative z-20">
        <Hero />

        {/* Transition: Hero -> Marquee */}
        <WavyDivider fillColor="#14532d" className="-mb-1" />

        <Marquee />

        {/* Transition: Marquee -> Flavour Showcase */}
        <WavyDivider fillColor="#14532d" inverted className="-mt-1" />

        {/* Horizontal Flavour Showcase */}
        <FlavourShowcase />

        {/* Coastal Taste & Meal Pairing Guide (Fills space after horizontal scroll) */}
        <TasteGuide />

        {/* Full Products Catalog */}
        <Products />

        {/* Transition: Products -> About */}
        <WavyDivider fillColor="#14532d" className="-mb-1" />

        <About />

        {/* Transition: About -> Contact */}
        <WavyDivider fillColor="#14532d" inverted className="-mt-1" />

        <Contact />
      </main>

      {/* Sticky Mobile WhatsApp Order Floating Bar */}
      <MobileOrderBar />
    </>
  );
}
