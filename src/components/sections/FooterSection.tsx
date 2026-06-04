"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const nameRef    = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!nameRef.current) return;
    gsap.fromTo(
      nameRef.current,
      { opacity: 0, y: 80, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1, duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: nameRef.current, start: "top 88%" },
      }
    );
  }, []);

  return (
    <footer
      ref={sectionRef}
      id="contact"
      className="relative bg-[#f04e00] overflow-hidden"
      style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)" }}
    >
      <div className="px-6 md:px-12 pt-20 pb-12">
        <h2
          ref={nameRef}
          className="text-[clamp(3rem,14vw,11rem)] font-black uppercase text-black leading-none tracking-tighter opacity-0"
        >
          RITIKA<br />RAWAT<span className="text-black/40">®</span>
        </h2>

        <div className="mt-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-t border-black/20 pt-6">
          <div className="flex flex-col gap-1">
            <a
              href="mailto:hello@ritikarawat.dev"
              className="text-sm text-black font-medium hover:text-black/70 transition-colors"
            >
              hello@ritikarawat.dev
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-black/70 hover:text-black transition-colors"
            >
              GitHub ↗
            </a>
          </div>
          <span className="text-xs text-black/50 uppercase tracking-widest">
            © 2025 Ritika Rawat
          </span>
        </div>
      </div>
    </footer>
  );
}
