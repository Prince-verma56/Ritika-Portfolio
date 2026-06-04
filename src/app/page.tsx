import ClientLiquidHero from "@/components/ClientLiquidHero";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import Navbar from "@/components/Navbar";
import HeroContent from "@/components/HeroContent";
import ContactSection from "@/components/sections/ContactSection";
import ServicesSection from "@/components/sections/ServicesSection";

export default function Home() {
  return (
    <>
      {/* ── Fixed Navbar ── */}
      <Navbar />

      <main className="bg-black">

        {/* ════════════════════════════════
            1. HERO — Fuel-inspired layout
            ════════════════════════════════ */}
        <ClientLiquidHero
          imageUrl="https://res.cloudinary.com/dtslaveid/image/upload/v1780587423/Ritika_Landing_page_image_2_oekuqf.jpg"
          strength={0.12}
          brushRadius={0.18}
          dissipation={0.97}
        >
          <HeroContent />
        </ClientLiquidHero>

        {/* ════════ Sections ════════ */}
        <AboutSection />
        <ServicesSection />
        <WorkSection />
        <AchievementsSection />
        <ContactSection />

      </main>
    </>
  );
}
