"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

export default function HeroContent() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // ── 1. Initial Setup (Hidden States) ──────
    gsap.set([
      ".h-card",
      ".h-desc",
      ".h-cta-text",
      ".h-cta-line",
      ".h-role-label",
      ".h-role-item",
      ".h-copyright",
    ], { opacity: 0 });

    gsap.set(".h-cross", { opacity: 0, scale: 0, rotate: -45 });

    // Setup for vertical slide reveals
    gsap.set([".h-desc", ".h-role-label", ".h-role-item"], { y: 15 });
    gsap.set(".h-cta-text", { y: 10 });
    gsap.set(".h-cta-line", { scaleX: 0, transformOrigin: "left center" });

    // Massive text starts pushed down
    gsap.set(".h-massive-text", { yPercent: 120, opacity: 0 });

    // ── 2. Master Timeline ─────────────
    const tl = gsap.timeline({ delay: 0.2 });

    // Top Right Card
    tl.to(".h-card", { opacity: 1, duration: 0.8, ease: "power3.out" });

    // Mid-Left Content (Description & CTA)
    tl.to(".h-desc", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, "-=0.4")
      .to(".h-cta-text", { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.5")
      .to(".h-cta-line", { opacity: 1, scaleX: 1, duration: 0.7, ease: "expo.out" }, "-=0.4");

    // Bottom-Left Roles
    tl.to(".h-role-label", { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, "-=0.3")
      .to(".h-role-item", { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: "power2.out" }, "-=0.2");

    // Crosshairs Scatter
    tl.to(".h-cross", {
      opacity: 1,
      scale: 1,
      rotate: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "back.out(2)",
    }, "-=0.4");

    // Copyright Timeline string
    tl.to(".h-copyright", { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4");

    // Massive Bottom Text Reveal
    tl.to(".h-massive-text", {
      yPercent: 0,
      opacity: 1,
      duration: 1.5,
      ease: "expo.out"
    }, "-=0.8");

  }, { scope: rootRef, dependencies: [] });

  return (
    <div ref={rootRef} className="absolute inset-0 pointer-events-none select-none z-10 flex flex-col justify-between overflow-hidden p-6 md:p-10 pt-24 md:pt-32">

      {/* ── BACKGROUND CROSSHAIRS ── */}
      {[
        { top: "35%", left: "75%" },
        { top: "50%", left: "55%" },
        { top: "65%", left: "85%" },
        { top: "45%", left: "25%" },
      ].map((pos, i) => (
        <div
          key={i}
          className="h-cross absolute text-white/30 text-lg font-light hidden md:block"
          style={{ top: pos.top, left: pos.left }}
        >
          +
        </div>
      ))}

      {/* ── TOP SECTION (Mobile: Adjusts below Navbar) ── */}
      <div className="flex justify-end w-full">
        {/* Availability Card (Top Right) */}
        <div className="h-card flex items-center gap-2 md:gap-3 bg-white pointer-events-auto cursor-pointer px-3 md:px-4 py-1.5 md:py-2 rounded-sm w-[180px] md:w-[200px]">
          <div className="relative w-6 h-6 md:w-8 md:h-8 bg-neutral-900 rounded-sm overflow-hidden flex-shrink-0">
            <Image
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop"
              alt="Avatar"
              fill
              className="object-cover grayscale"
            />
          </div>
          <div className="flex flex-col grow">
            <span className="text-black text-[10px] md:text-[11px] lg:text-base font-bold leading-tight">Ritika Rawat</span>
            <span className="text-neutral-500 text-[8px] md:text-[9px] lg:text-sm uppercase tracking-wider">Open to Work</span>
          </div>
          <div className="w-1.5 h-1.5 bg-black rounded-sm shrink-0" />
        </div>
      </div>

      {/* ── MIDDLE PERIMETER ── */}
      <div className="absolute top-[40%] md:top-[35%] left-6 md:left-10 flex flex-col gap-6 md:gap-8 max-w-[260px] md:max-w-[280px]">

        {/* Description */}
        {/* Adjusted from generic text-[14px] to responsive classes */}
        <p className="h-desc text-sm md:text-[15px] lg:text-base text-white/90 font-medium leading-[1.6]">
          Building at the intersection of code & design. Your next digital experience will kickoff within 24 hours.
        </p>

        {/* CTA */}
        <a href="#work" className="group flex flex-col gap-2 pointer-events-auto w-fit">
          <div className="flex items-center gap-2">
            {/* Scaled text size for better legibility */}
            <span className="h-cta-text text-white text-xs md:text-4xl lg:text-base font-bold tracking-widest uppercase">Explore Now</span>
            <span className="h-cta-text text-white/50 text-[10px] md:text-4xl lg:text-base group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
          </div>
          <span className="h-cta-line block h-[1px] bg-white w-full" />
        </a>

      </div>

      {/* ── BOTTOM PERIMETER ── */}
      <div className="relative w-full flex flex-col justify-end h-full mt-auto">

        {/* Roles List */}
        <div className="absolute bottom-28 md:bottom-20 left-0 flex flex-col gap-1">
          <div className="h-role-label flex items-baseline gap-2 mb-1">
            <span className="text-[#f04e00] text-lg md:text-xl font-bold">01/</span>
            <span className="text-white text-lg md:text-xl font-bold tracking-wide">Developer</span>
          </div>
          <span className="h-role-item text-white/80 text-lg md:text-xl font-medium tracking-wide">Designer</span>
          <span className="h-role-item text-white/80 text-lg md:text-xl font-medium tracking-wide">Builder</span>
        </div>

        {/* Copyright / Timeline (Absolute Bottom Left) */}
        {/* FIXED: Scaled down from text-2xl to a proper delicate text size for perimeter data */}
        <div className="h-copyright absolute bottom-2 left-0 flex items-center gap-2 text-[10px] md:text-xs font-mono text-white/40 tracking-widest z-30">
          <span>© 2026</span>
          <span className="tracking-[0.5em] hidden md:inline">||||||</span>
          <span className="hidden md:inline">19'</span>
        </div>

        {/* Massive Center-Bottom Text */}
        <div className="absolute bottom-[2%] md:bottom-[-4%] left-1/2 -translate-x-1/2 w-[120vw] flex justify-center overflow-hidden z-0">
          <h1
            className="h-massive-text font-black uppercase text-white leading-[0.75] tracking-tighter text-center"
            style={{
              fontSize: "clamp(6rem, 24vw, 24rem)",
              letterSpacing: "-0.06em"
            }}
          >
            RITIKA
          </h1>
        </div>

      </div>

    </div>
  );
}