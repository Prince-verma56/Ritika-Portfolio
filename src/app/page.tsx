import ClientLiquidHero from "@/components/ClientLiquidHero";
import AboutSection from "@/components/sections/AboutSection";
import WorkSection from "@/components/sections/WorkSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main>
      {/* HERO — swap imageUrl with your own image path inside /public */}
      <ClientLiquidHero
        imageUrl="https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=2400"
        strength={0.12}
        brushRadius={0.18}
        dissipation={0.97}
      >
        <div className="pointer-events-auto">
          <span className="text-xs tracking-widest text-neutral-400 uppercase">01 / Portfolio</span>
          <h1 className="mt-3 text-6xl md:text-9xl font-bold text-white leading-none">
            YOUR<br />NAME
          </h1>
          <p className="mt-4 text-neutral-400 text-sm tracking-widest uppercase">
            Developer — Designer — Builder
          </p>
        </div>
      </ClientLiquidHero>

      <AboutSection />
      <WorkSection />
      <ContactSection />
    </main>
  );
}

