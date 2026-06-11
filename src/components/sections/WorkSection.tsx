"use client";
import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link"; // Imported Next.js Link
import { FollowerPointerCard } from "../FollowerPointerCard";
import { useLoader } from "@/context/LoaderContext"; // Adjust path as needed

gsap.registerPlugin(ScrollTrigger);

// Updated with proper internal routing links
const projects = [
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
    image: "https://res.cloudinary.com/dcdssvhkm/image/upload/v1780684540/WhatsApp_Image_2026-06-05_at_11.58.21_PM_mfbmd2.jpg",
    link: "/works/hazu",
    year: "2023",
  },
];

interface WorkSectionProps {
  isStandalonePage?: boolean;
}

export default function WorkSection({ isStandalonePage = false }: WorkSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const titleTlRef = useRef<gsap.core.Timeline | null>(null);
  const firstProjectTlRef = useRef<gsap.core.Timeline | null>(null);
  const { isLoaderFinished } = useLoader();

  useGSAP(() => {
    // 1. ALWAYS RUN INITIAL STATES IMMEDIATELY (UNCONDITIONAL)
    gsap.set(".mask-title", { y: "110%", opacity: 0 });
    itemRefs.current.forEach((item) => {
      if (!item) return;
      const maskedTexts = item.querySelectorAll(".mask-text");
      const menuItems = item.querySelectorAll(".menu-item");
      const imgWrap = item.querySelector(".img-wrap");
      gsap.set(imgWrap, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(maskedTexts, { y: "110%", opacity: 0 });
      gsap.set(menuItems, { opacity: 0, x: -20 });
    });

    // 2. Section Clip-Path (Slant -> Flat) - Only on scroll page
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

      // Parallax: Content sliding up smoothly
      gsap.fromTo(
        contentRef.current,
        { y: 150 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 15%",
            scrub: 1.5,
          },
        }
      );
    }

    // 3. Main Title Mask Reveal
    const titleTl = gsap.timeline({ paused: true });
    titleTl.to(".mask-title", {
      y: "0%",
      opacity: 1,
      duration: 1,
      ease: "power4.out",
    });
    titleTlRef.current = titleTl;

    if (!isStandalonePage) {
      ScrollTrigger.create({
        trigger: ".mask-title-wrapper",
        start: "top 85%",
        onEnter: () => titleTl.play()
      });
    }

    // 4. Per-Project Timeline Animations
    itemRefs.current.forEach((item, index) => {
      if (!item) return;

      const maskedTexts = item.querySelectorAll(".mask-text");
      const menuItems = item.querySelectorAll(".menu-item");
      const imgWrap = item.querySelector(".img-wrap");

      const tl = gsap.timeline({ paused: true });
      tl.to(imgWrap, { clipPath: "inset(0% 0 0 0)", duration: 1.5, ease: "power3.inOut" })
        .to(maskedTexts, { y: "0%", opacity: 1, duration: 1.2, stagger: 0.1, ease: "power4.out" }, "-=1")
        .to(menuItems, { opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" }, "-=0.8");

      if (isStandalonePage && index === 0) {
        firstProjectTlRef.current = tl;
      } else {
        ScrollTrigger.create({
          trigger: item,
          start: "top 75%",
          onEnter: () => tl.play()
        });
      }
    });

  }, { scope: sectionRef, dependencies: [isStandalonePage] });

  // 5. Play timelines and refresh ScrollTriggers when loader finishes
  useEffect(() => {
    if (isLoaderFinished) {
      if (isStandalonePage) {
        titleTlRef.current?.play();
        firstProjectTlRef.current?.play();
      }
      ScrollTrigger.refresh();
    } else {
      if (isStandalonePage) {
        titleTlRef.current?.progress(0).pause();
        firstProjectTlRef.current?.progress(0).pause();
      }
    }
  }, [isLoaderFinished, isStandalonePage]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className={`relative z-30 bg-[#050505] px-6 md:px-16 overflow-hidden w-full will-change-transform ${isStandalonePage ? "pt-8 pb-32" : "py-32"
        }`}
      style={isStandalonePage ? {} : {
        clipPath: "polygon(0% 12%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      <div ref={contentRef} className="max-w-[1400px] mx-auto flex flex-col will-change-transform">

        <div className="mask-title-wrapper overflow-hidden pb-4 mb-24 md:mb-40">
          <h2 className="mask-title translate-y-[110%] opacity-0 text-[clamp(4rem,12vw,9rem)] font-black uppercase text-[#f04e00] leading-[0.85] tracking-tighter">
            LATEST WORK.
          </h2>
        </div>

        <div className="flex flex-col gap-32 md:gap-48">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-24 items-start"
            >

              {/* Left Side: Sticky Navigation Index */}
              <div className="flex flex-col gap-10 lg:sticky lg:top-40 pt-4">
                <div className="overflow-hidden pb-2">
                  <span className="mask-text block translate-y-[110%] opacity-0 text-[clamp(5rem,8vw,7rem)] font-black text-white leading-none tracking-tighter">
                    {project.id}.
                  </span>
                </div>

                <div className="flex flex-col gap-6 pt-4">
                  {projects.map((p) => {
                    const isActive = p.id === project.id;
                    return (
                      <div key={p.id} className="menu-item opacity-0 -translate-x-[20px] flex items-center gap-6 group cursor-default">
                        <div
                          className={`h-[2px] transition-all duration-500 ease-out ${isActive ? "w-16 bg-white" : "w-8 bg-neutral-800"
                            }`}
                        />
                        <span
                          className={`text-lg md:text-xl transition-all duration-500 tracking-wide ${isActive
                            ? "text-white font-bold underline decoration-2 underline-offset-[6px] decoration-white/30"
                            : "text-neutral-500 font-medium"
                            }`}
                        >
                          {p.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right Side: Media & Meta */}
              <div className="flex flex-col w-full">

                <div className="overflow-hidden mb-6 flex justify-between items-end">
                  <div className="flex flex-col gap-1">
                    <span className="mask-text translate-y-[110%] opacity-0 text-neutral-500 font-mono text-xs uppercase tracking-widest">
                      Year — {project.year}
                    </span>
                    <span className="mask-text translate-y-[110%] opacity-0 text-white/80 text-sm md:text-base font-light tracking-wide">
                      {project.subtitle}
                    </span>
                  </div>
                </div>

                {/* ── UPDATED: Wrapped with Next.js <Link> & Custom Follower ── */}
                <Link href={project.link} className="block w-full">
                  <FollowerPointerCard title="View Project" className="w-full">
                    <div className="img-wrap relative w-full aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-md group bg-neutral-900 flex items-center justify-center" style={{ clipPath: "inset(100% 0 0 0)" }}>
                      <div className="img-inner absolute inset-0 flex items-center justify-center">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-contain object-center opacity-90 transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) calc(100vw - 32px), (max-width: 1024px) calc(100vw - 128px), 784px"
                          priority={index === 0}
                        />
                      </div>
                    </div>
                  </FollowerPointerCard>
                </Link>

                {/* Bottom Tags */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <div key={tag} className="overflow-hidden">
                      <span className="mask-text block translate-y-[110%] opacity-0 text-[10px] text-neutral-500 border border-neutral-800 px-3 py-1.5 uppercase tracking-widest font-mono rounded-sm">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}