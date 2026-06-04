"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScrollReveal } from "@/hooks/useScrollReveal";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "Python", "JavaScript", "TypeScript", "React", "Next.js",
  "HTML", "CSS", "Java", "Node.js", "TensorFlow", "MongoDB",
  "Flutter", "Arduino", "SQL", "Tailwind",
];

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const nameRef    = useScrollReveal<HTMLHeadingElement>({ type: "clip", duration: 1.1 });
  const bioRef     = useScrollReveal<HTMLParagraphElement>({ type: "up",   delay: 0.2 });
  const taglineRef = useScrollReveal<HTMLDivElement>({ type: "up",   delay: 0.1, duration: 1 });

  // Parallax diagonal divider
  useEffect(() => {
    const divider = dividerRef.current;
    if (!divider) return;
    const tween = gsap.to(divider, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });
    return () => tween.kill();
  }, []);

  const doubled = [...techStack, ...techStack];

  return (
    <section ref={sectionRef} id="about" className="relative bg-black overflow-hidden">

      {/* ── Diagonal orange divider from Hero ── */}
      <div
        ref={dividerRef}
        className="absolute top-0 left-0 w-full h-40 bg-[#f04e00] origin-top will-change-transform"
        style={{ clipPath: "polygon(0 0, 100% 0, 100% 40%, 0 100%)" }}
      />

      {/* ── Main content ── */}
      <div className="relative z-10 px-6 md:px-12 pt-48 pb-0">

        {/* Available badge */}
        <div className="flex items-center gap-2 mb-6">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs tracking-widest text-green-400 uppercase font-medium">
            Available for Projects
          </span>
        </div>

        {/* Giant name */}
        <h2
          ref={nameRef}
          className="text-[clamp(3.5rem,14vw,11rem)] font-black uppercase leading-none tracking-tighter text-white"
          style={{ fontFamily: "var(--font-space)" }}
        >
          RITIKA<br />RAWAT
        </h2>

        {/* Tagline */}
        <div ref={taglineRef} className="mt-4 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
          <span className="text-xs tracking-widest text-neutral-400 uppercase">(About)</span>
          <p className="text-sm md:text-base text-neutral-300 font-light italic max-w-xs text-right hidden md:block">
            Beyond Visuals.<br />Build with VISION.
          </p>
        </div>

        {/* Bio text */}
        <p
          ref={bioRef}
          className="mt-8 text-lg md:text-xl text-white leading-relaxed max-w-2xl font-light"
        >
          Hi, I'm{" "}
          <span className="text-[#f04e00] font-semibold">Ritika</span>
          {" "}— a B.Tech AI & Data Analytics student who ships real things.{" "}
          <br className="hidden md:block" />
          I build across the stack: ML pipelines, mobile apps, IoT dashboards,
          <br className="hidden md:block" />
          and interfaces people actually want to use.
        </p>
      </div>

      {/* ── TechStack Marquee strip ── */}
      <div className="relative mt-20 bg-[#f04e00] py-5 overflow-hidden">
        {/* Diagonal cut top */}
        <div
          className="absolute -top-6 left-0 w-full h-8 bg-black"
          style={{ clipPath: "polygon(0 0, 100% 100%, 100% 0)" }}
        />

        <div className="flex overflow-hidden">
          <div className="marquee-track">
            {doubled.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-6 px-6 text-black font-black text-sm md:text-base uppercase tracking-widest whitespace-nowrap"
              >
                {tech}
                <span className="text-black/40 text-lg">✦</span>
              </span>
            ))}
          </div>
        </div>

        {/* Diagonal cut bottom */}
        <div
          className="absolute -bottom-6 left-0 w-full h-8 bg-black"
          style={{ clipPath: "polygon(0 100%, 100% 0, 0 0)" }}
        />
      </div>

    </section>
  );
}
