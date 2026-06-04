import ClientLiquidHero from "@/components/ClientLiquidHero";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import AchievementsSection from "@/components/sections/AchievementsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import FooterSection from "@/components/sections/FooterSection";

export default function Home() {
  return (
    <main className="bg-black overflow-x-hidden">

      {/* 1. Hero */}
      <ClientLiquidHero
        imageUrl="/Images/Ritika Landing page image.jpeg"
        strength={0.12}
        brushRadius={0.18}
        dissipation={0.97}
      >
        <div className="pointer-events-auto w-full flex flex-col md:flex-row md:items-end md:justify-between">
          {/* Left: name */}
          <div>
            <span className="text-xs tracking-widest text-neutral-400 uppercase">
              01 / Portfolio
            </span>
            <h1 className="mt-2 text-[clamp(3.5rem,14vw,10rem)] font-black uppercase leading-none tracking-tighter text-white">
              RITIKA<br />RAWAT
            </h1>
            <p className="mt-3 text-neutral-400 text-xs tracking-widest uppercase">
              Developer — Designer — Builder
            </p>
          </div>
          {/* Right: tagline (hidden on mobile) */}
          <p className="hidden md:block text-right text-sm font-light text-neutral-300 italic mb-2 leading-relaxed">
            Beyond Visuals.<br />Build with VISION.
          </p>
        </div>
      </ClientLiquidHero>

      {/* 2. About + TechStack */}
      <AboutSection />

      {/* 3. Work */}
      <WorkSection />

      {/* 4. Achievements */}
      <AchievementsSection />

      {/* 5. Services */}
      <ServicesSection />

      {/* 6. Footer */}
      <FooterSection />

    </main>
  );
}
