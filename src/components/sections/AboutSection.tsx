"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLoader } from "@/context/LoaderContext";
import ShimmerText from "@/components/kokonutui/shimmer-text";

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  "NEXT.JS", "TENSORFLOW", "MONGODB", "TAILWIND", "GSAP", "REACT", "PYTHON", "FIGMA"
];

interface AboutSectionProps {
  isStandalonePage?: boolean;
}

export default function AboutSection({ isStandalonePage = false }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const tiltWrapperRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const { isLoaderFinished } = useLoader();

  useGSAP(() => {
    // 1. ALWAYS RUN INITIAL STATES IMMEDIATELY TO PREVENT FOUC
    // Increased rotateZ to 4 for a slightly more dramatic "slice" effect
    gsap.set(".mask-reveal-inner", { y: "120%", opacity: 0, rotateZ: 4 });

    if (tiltWrapperRef.current) {
      gsap.set(tiltWrapperRef.current, {
        transformPerspective: 1200,
        transformOrigin: "50% 50%",
      });
    }

    // 2. Section Clip-Path (Slant -> Flat)
    if (!isStandalonePage) {
      gsap.fromTo(
        sectionRef.current,
        { clipPath: "polygon(0% 12%, 100% 0%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top top",
            scrub: 1,
          }
        }
      );

      // Parallax: Content sliding up
      gsap.fromTo(
        contentRef.current,
        { y: 200 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 10%",
            scrub: 1.5,
          },
        }
      );
    }

    // 3. THE PREMIUM MASK REVEAL FROM BOTTOM
    const textElements = gsap.utils.toArray(".mask-reveal-inner");

    if (isStandalonePage) {
      // Standalone page timeline
      const tl = gsap.timeline({ paused: true });
      tl.to(textElements, {
        y: "0%",
        opacity: 1,
        rotateZ: 0,
        duration: 1.4, // Slower duration for a buttery feel
        stagger: 0.1,
        ease: "expo.out" // Classic Awwwards easing curve
      });
      tlRef.current = tl;
    } else {
      // Scroll-triggered line-by-line reveal
      textElements.forEach((el: any) => {
        gsap.to(el, {
          y: "0%",
          opacity: 1,
          rotateZ: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el.parentElement, // Triggers exactly when the specific line's wrapper enters
            start: "top 90%", // Triggers slightly earlier so it's fluid as you scroll
            toggleActions: "play none none none" // Ensures it plays once and stays
          }
        });
      });
    }

    // 4. 3D Tilted Marquee Container
    if (tiltWrapperRef.current) {
      gsap.fromTo(
        tiltWrapperRef.current,
        { rotationY: 12, rotationZ: 3, skewX: 3 },
        {
          rotationY: -10, rotationZ: -3, skewX: -2,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        }
      );
    }

    // 5. Horizontal Marquee Track Speed
    if (marqueeRef.current) {
      gsap.to(marqueeRef.current, {
        xPercent: -35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        }
      });
    }

  }, { scope: sectionRef, dependencies: [isStandalonePage] });

  useEffect(() => {
    if (isLoaderFinished) {
      if (isStandalonePage && tlRef.current) {
        tlRef.current.play();
      }
      ScrollTrigger.refresh();
    } else {
      if (isStandalonePage && tlRef.current) {
        tlRef.current.progress(0).pause();
      }
    }
  }, [isLoaderFinished, isStandalonePage]);

  return (
    <div className="w-full relative drop-shadow-[0_-1px_1px_rgba(255,255,255,0.05)] drop-shadow-[0_-10px_30px_rgba(240,78,0,0.05)]">
      <section
        ref={sectionRef}
        id="about"
        className={`relative z-20 bg-[#050505] text-white pb-40 w-full will-change-transform overflow-hidden ${isStandalonePage ? "pt-8" : "pt-24"
          }`}
        style={isStandalonePage ? {} : { clipPath: "polygon(0% 12%, 100% 0%, 100% 100%, 0% 100%)" }}
      >
        <div
          ref={contentRef}
          className={`max-w-[1400px] mx-auto flex flex-col will-change-transform ${isStandalonePage ? "pt-0" : "pt-12 md:pt-20"
            }`}
        >

          {/* Top Meta Row */}
          <div className="px-6 md:px-12 border-b border-white/10 pb-6 mb-16 md:mb-24">
            <div className="overflow-hidden">
              <div className="mask-reveal-inner flex justify-between items-center text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest text-white/50">
                <span>• 02</span>
                <span>[About]</span>
                <span>© 2026</span>
              </div>
            </div>
          </div>

          {/* ── Intro Typography ── */}
          <div className="w-full flex flex-col gap-2 md:gap-4 px-6 md:px-12 lg:pl-[10%]">

            {/* CRITICAL FIX: Added `bg-clip-text text-transparent` to all gradient texts below */}
            <div className="overflow-hidden pb-2">
              <h2 className="mask-reveal-inner text-[clamp(2rem,5vw,5.5rem)] font-medium leading-[1.05] tracking-tight flex flex-wrap items-baseline">
                <ShimmerText as="span" hoverOnly={true} text="Hi, I'm" className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-400 to-white" />
                <span className="whitespace-pre"> </span>
                <ShimmerText as="span" hoverOnly={true} text="Ritika" className="inline-flex font-black text-[#f04e00]" />
                <span className="whitespace-pre"> </span>
                <ShimmerText as="span" hoverOnly={true} text="– a B.Tech AI & Data" className="inline-flex font-medium bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-400 to-white" />
              </h2>
            </div>

            <div className="overflow-hidden pb-2">
              <ShimmerText
                as="h2"
                text="Analytics student who ships real things."
                hoverOnly={true}
                className="mask-reveal-inner text-[clamp(2rem,5vw,5.5rem)] font-medium leading-[1.05] tracking-tight inline-flex bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-400 to-white"
              />
            </div>

            <div className="overflow-hidden pb-2 mt-4 md:mt-8">
              <ShimmerText
                as="h2"
                text="I build across the stack: ML pipelines,"
                hoverOnly={true}
                className="mask-reveal-inner text-[clamp(1.5rem,4vw,4.5rem)] font-light leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 via-white to-neutral-400 inline-flex"
              />
            </div>

            <div className="overflow-hidden pb-2">
              <ShimmerText
                as="h2"
                text="mobile apps, IoT dashboards, and"
                hoverOnly={true}
                className="mask-reveal-inner text-[clamp(1.5rem,4vw,4.5rem)] font-light leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 via-white to-neutral-400 inline-flex"
              />
            </div>

            <div className="overflow-hidden pb-2">
              <ShimmerText
                as="h2"
                text="interfaces people actually want to use."
                hoverOnly={true}
                className="mask-reveal-inner text-[clamp(1.5rem,4vw,4.5rem)] font-light leading-[1.1] tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-400 via-white to-neutral-400 inline-flex"
              />
            </div>
          </div>

        </div>

        {/* ── 3D Tilted Marquee Container ── */}
        <div
          ref={tiltWrapperRef}
          className="mt-32 md:mt-48 border-y border-white/10 py-6 md:py-10 bg-[#0a0a0a] flex overflow-hidden select-none will-change-transform shadow-2xl"
        >
          <div ref={marqueeRef} className="flex whitespace-nowrap gap-12 md:gap-16 will-change-transform pl-12">
            {[...techStack, ...techStack, ...techStack, ...techStack].map((tech, idx) => (
              <span
                key={idx}
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white flex items-center gap-12 md:gap-16"
              >
                <span>{tech}</span>
                <span className="text-xl md:text-3xl text-[#f04e00]">•</span>
              </span>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}