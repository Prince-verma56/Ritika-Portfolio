"use client";
import { useRef, useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import { useLoader } from "@/context/LoaderContext";
import { FollowerPointerCard } from "@/components/FollowerPointerCard";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  image: string;
  link: string;
  year: string;
  visual?: React.ReactNode;
};

const projects: Project[] = [
  {
    id: "01",
    title: "Adhayaya",
    subtitle: "Indian Heritage & Travel Platform",
    tags: ["Next.js", "WebGL", "Travel"],
    image: "https://res.cloudinary.com/dtslaveid/image/upload/v1781108027/Screenshot_2026-06-09_202735_ixq9ul.png",
    link: "/works/adhayaya",
    year: "2024",
  },
  {
    id: "02",
    title: "Dhritam",
    subtitle: "AI-Powered Health Monitoring",
    tags: ["Python", "TensorFlow", "IoT"],
    image: "https://res.cloudinary.com/dtslaveid/image/upload/v1780759046/four_d9ouzk.jpg",
    link: "/works/dhritam",
    year: "2024",
  },
  {
    id: "03",
    title: "Hazu",
    subtitle: "Predictive Analytics Dashboard",
    tags: ["React", "D3.js", "ML"],
    image: "https://res.cloudinary.com/dtslaveid/image/upload/v1781279279/WhatsApp_Image_2026-06-05_at_11.49.17_PM_kvqsvv.jpg",
    link: "/works/hazu",
    year: "2023",
  },
];

interface WorkSectionProps {
  isStandalonePage?: boolean;
}

export default function WorkSection({ isStandalonePage = false }: WorkSectionProps) {
  // ── ARCHITECTURE FIX: Separated wrapper from section to protect pin-spacer logic
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<HTMLDivElement>(null);
  const { isLoaderFinished } = useLoader();

  const [activeIndex, setActiveIndex] = useState(0);
  const prevIndexRef = useRef(0);

  const parallaxInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mouseParallaxRaf = useRef<number | null>(null);

  // Mouse-move parallax handler
  const handleShowcaseMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = showcaseRef.current;
    const inner = parallaxInnerRefs.current[activeIndex];
    if (!el || !inner) return;

    if (mouseParallaxRaf.current) cancelAnimationFrame(mouseParallaxRaf.current);
    mouseParallaxRaf.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      
      gsap.to(inner, {
        x: nx * -14,
        y: ny * -10,
        scale: 1.06,
        duration: 0.9,
        ease: "power2.out",
        overwrite: "auto",
      });
    });
  }, [activeIndex]);

  const handleShowcaseMouseLeave = useCallback(() => {
    if (mouseParallaxRaf.current) cancelAnimationFrame(mouseParallaxRaf.current);
    const inner = parallaxInnerRefs.current[activeIndex];
    if (!inner) return;
    
    gsap.to(inner, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
      overwrite: "auto",
    });
  }, [activeIndex]);

  // Provide GSAP Context so we can trigger animations outside the standard useGSAP cycle
  const { contextSafe } = useGSAP({ scope: wrapperRef });

  // ── 1. MASTER ENTRANCE & PINNING LOGIC ──
  useGSAP(() => {
    if (!isLoaderFinished || !sectionRef.current || !wrapperRef.current) return;

    if (!isStandalonePage) {
      gsap.fromTo(
        sectionRef.current,
        { clipPath: "polygon(0% 12%, 100% 0%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(
        [".work-top-line", ".work-top-glow"],
        { attr: { d: "M 0 12 L 100 0" } },
        {
          attr: { d: "M 0 0 L 100 0" },
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(
        contentRef.current,
        { y: 120 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top bottom",
            end: "top 10%",
            scrub: 1,
          },
        }
      );

      gsap.fromTo(
        ".work-left-col",
        { x: -120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "top 15%",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(
        ".showcase-container",
        { x: 120, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 80%",
            end: "top 15%",
            scrub: 1,
          }
        }
      );

      gsap.fromTo(
        ".mask-title",
        { y: "110%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top 90%",
            end: "top 10%",
            scrub: 1,
          }
        }
      );
    } else {
      // ── Standalone Entry ──
      // gsap.set() immediately forces invisible state before first paint completes,
      // preventing the flash-then-reanimate glitch on /works page.
      gsap.set(".mask-title", { y: "110%", opacity: 0 });
      gsap.set([".work-left-col", ".showcase-container"], { opacity: 0, y: 50 });

      // Stagger the entrance in with a short delay so the route transition settles first
      const tl = gsap.timeline({ delay: 0.3 });
      tl.to(".mask-title", { y: "0%", opacity: 1, duration: 1.0, ease: "power3.out" })
        .to(".work-left-col", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, "-=0.6")
        .to(".showcase-container", { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" }, "-=0.7");
    }

    // Scroll Configuration
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const pinDistance = isTouchDevice ? projects.length * 100 : projects.length * 300;

    // Pinning the Structural Wrapper prevents all Next.js Routing Conflicts
    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: "top top",
      end: `+=${pinDistance}vh`,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        const index = Math.min(
          projects.length - 1,
          Math.floor(self.progress * projects.length)
        );
        setActiveIndex((prev) => (prev !== index ? index : prev));
      }
    });

    // NOTE: No separate showcase-container scroll parallax here — it conflicts
    // with the entrance animation's x-transform on home page. The image parallax
    // inside each card (parallaxInnerRefs) is sufficient for the depth effect.

    parallaxInnerRefs.current.forEach((inner) => {
      if (!inner) return;
      gsap.fromTo(
        inner,
        { yPercent: 0 },
        {
          yPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: `+=${pinDistance}vh`,
            scrub: 1.5,
          },
        }
      );
    });

    gsap.to(".support-visual", {
      y: 15,
      rotation: 5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

  }, { dependencies: [isStandalonePage, isLoaderFinished] }); // ActiveIndex removed to stop constant revert cycles

  // ── 2. CINEMATIC CROSSFADES (Fast-Scroll Safe) ──
  // By using contextSafe + normal useEffect, we prevent GSAP from reverting the timeline 
  // if you rapidly scroll past multiple projects.
  const triggerCrossfade = contextSafe((current: number, prev: number) => {
    if (current === prev) return;

    // Force strict Z-indexing
    gsap.set(`.img-container-${current}`, { zIndex: 10 });
    gsap.set(`.img-container-${prev}`, { zIndex: 5 });

    // Incoming Image Reveal
    gsap.fromTo(`.img-container-${current}`,
      { opacity: 0, clipPath: "inset(100% 0 0 0)" },
      { opacity: 1, clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.inOut", overwrite: "auto" }
    );
    
    // Incoming Parallax Reset
    gsap.fromTo(`.img-container-${current} .parallax-inner`,
      { scale: 1.05 },
      { scale: 1, duration: 1.2, ease: "power4.inOut", overwrite: "auto" }
    );

    // Outgoing Image Fade
    gsap.to(`.img-container-${prev}`, { opacity: 0, duration: 1, ease: "power3.inOut", overwrite: "auto" });

    // Peripheral Visuals Update
    gsap.to(`.visual-${prev}`, { opacity: 0, scale: 0.8, duration: 0.6, ease: "power2.out", overwrite: "auto" });
    gsap.fromTo(`.visual-${current}`,
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 0.15, scale: 1, y: 0, duration: 1, ease: "power3.out", overwrite: "auto" }
    );
  });

  useEffect(() => {
    if (isLoaderFinished) {
      triggerCrossfade(activeIndex, prevIndexRef.current);
      prevIndexRef.current = activeIndex;
    }
  }, [activeIndex, isLoaderFinished, triggerCrossfade]);


  return (
    <div ref={wrapperRef} className={`relative w-full z-30 bg-[#050505]${isStandalonePage ? " -mt-32" : ""}`}>
      <section
        ref={sectionRef}
        id="work"
        className={`relative w-full h-screen overflow-hidden flex items-center will-change-transform`}
        style={isStandalonePage ? {} : { clipPath: "polygon(0% 12%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        {/* ── Slanted Glowing Top Separator Line ── */}
        {!isStandalonePage && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-40" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="workTopLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="30%" stopColor="#f04e00" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#f04e00" stopOpacity="0.8" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="workTopGlowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="transparent" />
                <stop offset="30%" stopColor="#f04e00" stopOpacity="0.25" />
                <stop offset="70%" stopColor="#f04e00" stopOpacity="0.25" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <filter id="workTopGlowBlur" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path
              className="work-top-glow"
              d="M 0 12 L 100 0"
              vectorEffect="non-scaling-stroke"
              fill="none"
              stroke="url(#workTopGlowGrad)"
              strokeWidth="8"
              filter="url(#workTopGlowBlur)"
            />
            <path
              className="work-top-line"
              d="M 0 12 L 100 0"
              vectorEffect="non-scaling-stroke"
              fill="none"
              stroke="url(#workTopLineGrad)"
              strokeWidth="1.5"
            />
          </svg>
        )}

        <div ref={contentRef} className={`relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-16 flex flex-col justify-center gap-6 md:gap-12 h-full will-change-transform ${isStandalonePage ? "pt-32" : ""}`}>

          {/* ── LATEST WORK. HEADING ── */}
          <div className="mask-title-wrapper overflow-hidden pb-1 select-none pointer-events-none w-full">
            <h2 className="mask-title translate-y-[110%] opacity-0 text-[clamp(2.5rem,7vw,6.5rem)] font-black uppercase text-[#f04e00] leading-[0.85] tracking-tighter">
              LATEST WORK.
            </h2>
          </div>

          {/* ── COLUMNS WRAPPER ── */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 w-full">

            {/* ── LEFT NAVIGATION COLUMN ── */}
            <div
              className="work-left-col w-full md:w-[35%] lg:w-[30%] flex flex-col justify-center gap-6 md:gap-12 md:pr-10"
              style={isStandalonePage ? { opacity: 0 } : undefined}
            >

              <div className="flex flex-col">
                <span className="text-white/30 text-[10px] font-mono tracking-[0.3em] uppercase mb-4">
                  SELECTED PROJECT
                </span>

                {/* Morphing Project Number */}
                <div className="relative h-[100px] overflow-hidden">
                  {projects.map((p, i) => (
                    <div
                      key={`num-${p.id}`}
                      className={`absolute inset-0 flex items-center transition-transform duration-800 ease-[cubic-bezier(0.87,0,0.13,1)] ${
                        i === activeIndex
                          ? "translate-y-0 opacity-100"
                          : i < activeIndex
                            ? "-translate-y-full opacity-0"
                            : "translate-y-full opacity-0"
                      }`}
                    >
                      <span className="text-[6rem] xl:text-[8rem] font-black text-[#f04e00] leading-none tracking-tighter">
                        {p.id}.
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Navigation List */}
              <div className="flex flex-col gap-6 relative">
                {projects.map((p, i) => {
                  const isActive = i === activeIndex;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`View project ${p.title}`}
                      className="relative flex items-center gap-4 group text-left w-full cursor-pointer bg-transparent border-none outline-none focus-visible:outline-none"
                    >
                      {/* Animated Active Indicator */}
                      <div className="w-6 flex justify-end overflow-hidden shrink-0">
                        <span className={`block w-4 h-[2px] bg-[#f04e00] origin-right transition-transform duration-500 ${isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"}`} />
                      </div>

                      <span
                        className={`text-2xl xl:text-3xl tracking-wide transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] relative select-none ${
                          isActive
                            ? "text-white font-black scale-100 origin-left"
                            : "text-white/40 font-medium scale-95 blur-[1px] origin-left group-hover:text-white/70 group-hover:blur-none group-hover:scale-[0.97]"
                        }`}
                      >
                        {p.title}
                        {/* Growing Underline for active state */}
                        <div className={`absolute -bottom-1 left-0 h-[2px] bg-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left ${isActive ? "w-full scale-x-100" : "w-full scale-x-0 group-hover:scale-x-50"}`} />
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── RIGHT SHOWCASE COLUMN ── */}
            <div
              className="showcase-container w-full md:w-[65%] lg:w-[70%] h-auto md:h-[60vh] lg:h-[70vh] flex items-center justify-center md:justify-end relative"
              style={isStandalonePage ? { opacity: 0 } : undefined}
            >

              <div
                ref={showcaseRef}
                className="relative w-full max-w-[900px] aspect-16/10 group"
                onMouseMove={handleShowcaseMouseMove}
                onMouseLeave={handleShowcaseMouseLeave}
              >
                {/* Layer 3: Soft Orange Ambient Glow */}
                <div className="absolute inset-0 bg-[#f04e00] blur-[100px] opacity-10 group-hover:opacity-20 transition-opacity duration-700 scale-90 z-0 pointer-events-none" />

                {/* Ghost Image Stacks (Creates physical depth) */}
                <div className="absolute inset-0 bg-[#0a0a0a] border border-white/5 rounded-2xl scale-[0.97] translate-y-[20px] z-0 shadow-2xl" />
                <div className="absolute inset-0 bg-[#080808] border border-white/5 rounded-2xl scale-[0.94] translate-y-[40px] -z-10 shadow-2xl" />

                {/* The Cinematic Image Container wrapped in Custom Follower */}
                <FollowerPointerCard title="View Project" className="absolute inset-0 w-full h-full z-10 rounded-2xl overflow-hidden">
                  <Link href={projects[activeIndex].link} className="absolute inset-0 cursor-none overflow-hidden rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors duration-500 shadow-[0_0_50px_rgba(0,0,0,0.5)] block w-full h-full">

                    {/* Layer 2: Noise Texture Overlay */}
                    <div className="absolute inset-0 z-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay pointer-events-none" />

                    {/* Mapped Images for Crossfades */}
                    {projects.map((p, i) => (
                      <div
                        key={`img-${p.id}`}
                        className={`img-container-${i} absolute inset-0 will-change-transform`}
                        style={{ opacity: i === 0 ? 1 : 0, zIndex: i === 0 ? 10 : 1 }}
                      >
                        {/* parallax-inner: 10% oversize on each axis so the shift never reveals edges */}
                        <div
                          className="parallax-inner w-[110%] h-[110%] relative"
                          style={{ top: "-5%", left: "-5%", willChange: "transform" }}
                          ref={(el) => { parallaxInnerRefs.current[i] = el; }}
                        >
                          <Image
                            src={p.image}
                            alt={p.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 70vw, 900px"
                            priority={i === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-[#050505]/40" />
                        </div>

                        {/* ── IMAGE CORNER DETAILS ── */}
                        <div className="absolute inset-0 z-30 p-8 flex flex-col justify-between pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="text-white/60 font-mono text-[10px] tracking-[0.3em] uppercase">
                            Project {p.id}
                          </div>

                          <div className="flex justify-between items-end">
                            <div className="text-white/60 font-mono text-[10px] tracking-[0.3em] uppercase">
                              Year — {p.year}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </Link>
                </FollowerPointerCard>

                {/* ── FLOATING SUPPORT VISUALS ── */}
                {projects.map((p, i) => (
                  <div
                    key={`visual-${p.id}`}
                    className={`visual-${i} support-visual absolute right-[-8%] top-[-10%] z-20 pointer-events-none drop-shadow-[0_10px_20px_rgba(240,78,0,0.2)]`}
                    style={{ opacity: i === 0 ? 0.15 : 0 }}
                  >
                    {p.visual}
                  </div>
                ))}

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}