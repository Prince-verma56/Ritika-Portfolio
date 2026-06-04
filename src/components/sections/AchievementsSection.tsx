"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    title: "Global AI Summit Winner",
    highlight: "1st Position",
    description:
      "Secured 1st position among competing teams and won a ₹50,000 cash prize for innovation in healthcare technology.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  },
  {
    title: "CODEPUNK Hackathon",
    highlight: "Top 10 Runner-up",
    description:
      "Recognized as Top 10 Runner-ups in Internal University rounds for IoT innovation management.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  },
];

export default function AchievementsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bannerRef  = useRef<HTMLDivElement>(null);
  const cardRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Parallax on the orange banner
    if (bannerRef.current) {
      gsap.to(bannerRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      });
    }

    // Animate cards
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(
        card,
        { opacity: 0, y: 60 },
        {
          opacity: 1, y: 0, duration: 0.9, delay: i * 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 82%" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="achievements" className="relative bg-black overflow-hidden">

      {/* ── Orange diagonal banner ── */}
      <div
        ref={bannerRef}
        className="relative w-full bg-[#f04e00] py-10 px-6 md:px-12 will-change-transform"
        style={{ clipPath: "polygon(0 15%, 100% 0, 100% 85%, 0 100%)" }}
      >
        <div className="py-4">
          <h2 className="text-[clamp(1.8rem,6vw,4.5rem)] font-black uppercase text-black leading-none tracking-tight">
            LET&apos;S TALK ABOUT<br />ACHIEVEMENTS
          </h2>
        </div>
      </div>

      {/* ── Achievement cards ── */}
      <div className="relative z-10 px-6 md:px-12 py-16 flex flex-col gap-16">
        {achievements.map((item, i) => (
          <div
            key={i}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center opacity-0"
          >
            {/* Image */}
            <div
              className={`relative aspect-video overflow-hidden ${
                i % 2 === 1 ? "md:order-2" : ""
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>

            {/* Text */}
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <span className="text-[#f04e00] text-xs uppercase tracking-widest font-bold">
                {item.highlight}:
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-black text-white uppercase">
                {item.title}
              </h3>
              <p className="mt-4 text-neutral-300 text-base leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
