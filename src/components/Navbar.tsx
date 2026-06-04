"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const navLinks = [
  { label: "About",    href: "#about",       num: "01" },
  { label: "Services", href: "#services",    num: "02" },
  { label: "Work",     href: "#work",        num: "03" },
  { label: "Contact",  href: "#contact",     num: "04" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const rightGroupRef = useRef<HTMLDivElement>(null);
  
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Store the timeline so we can play/reverse it on button click
  const menuTl = useRef<gsap.core.Timeline | null>(null);

  // 1. Initial Entrance Animations
  useGSAP(() => {
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -24 },
      { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
    );
    gsap.fromTo(
      linksRef.current?.querySelectorAll("a") ?? [],
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power2.out", delay: 0.4 }
    );
    gsap.fromTo(
      rightGroupRef.current,
      { opacity: 0, x: 24 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.5 }
    );

    // 2. Setup Mobile Menu Timeline (Paused by default)
    menuTl.current = gsap.timeline({ paused: true })
      .to(".mobile-menu-overlay", {
        autoAlpha: 1, // Handles both opacity and visibility
        duration: 0.5,
        ease: "power3.inOut",
      })
      .fromTo(
        ".mobile-link",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: "power3.out" },
        "-=0.2"
      )
      .fromTo(
        ".mobile-meta",
        { opacity: 0 },
        { opacity: 1, duration: 0.4 },
        "-=0.2"
      );
  }, { scope: navRef, dependencies: [] });

  // 3. Play or Reverse Menu Timeline on State Change
  useEffect(() => {
    if (isMenuOpen) {
      menuTl.current?.play();
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      menuTl.current?.reverse();
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  // Scroll detection for background blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-[9999] transition-all duration-500"
    >
      {/* ── Main Top Bar ── */}
      <div 
        className="relative z-50 flex items-center justify-between px-6 md:px-10 h-20 md:h-24 transition-colors duration-500"
        style={{
          background: scrolled || isMenuOpen ? "rgba(0,0,0,0.85)" : "transparent",
          backdropFilter: scrolled || isMenuOpen ? "blur(12px)" : "none",
          borderBottom: scrolled && !isMenuOpen ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        {/* Logo */}
        <a
          ref={logoRef}
          href="#"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 select-none"
          style={{ opacity: 0 }}
        >
          <span className="text-white font-black text-lg md:text-xl uppercase tracking-wider leading-none">
            RITIKA<span className="text-[#f04e00]">®</span>
          </span>
        </a>

        {/* Center Desktop Links */}
        <div ref={linksRef} className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link relative flex items-start gap-1 text-white/70 hover:text-white text-xs uppercase tracking-[0.18em] font-medium transition-colors duration-300"
            >
              <sup className="text-[#f04e00] text-[8px] font-bold leading-none mt-0.5">
                {link.num}
              </sup>
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Group: Status Pill & Mobile Menu Toggle */}
        <div ref={rightGroupRef} className="flex items-center gap-4" style={{ opacity: 0 }}>
          
          {/* Availability Pill (Hidden on very small screens to save space) */}
          <div className="hidden sm:flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 bg-white/5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span className="text-[10px] text-white/80 uppercase tracking-widest font-medium">
              Available
            </span>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-10 h-10 gap-1.5 bg-white/5 border border-white/10 rounded-full"
            aria-label="Toggle Menu"
          >
            <span className={`block w-4 h-[1px] bg-white transition-transform duration-300 ${isMenuOpen ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`block w-4 h-[1px] bg-white transition-transform duration-300 ${isMenuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {/* ── Mobile Fullscreen Menu Overlay ── */}
      <div 
        className="mobile-menu-overlay invisible opacity-0 fixed inset-0 w-full h-screen bg-[#050505] z-40 flex flex-col justify-center px-6 pt-20"
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link) => (
            <div key={link.href} className="overflow-hidden">
              <a
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="mobile-link flex items-start gap-4 text-white text-5xl font-black uppercase tracking-tighter"
              >
                <span className="text-[#f04e00] text-sm font-mono mt-1">{link.num}</span>
                {link.label}
              </a>
            </div>
          ))}
        </div>

        {/* Mobile Menu Footer Meta */}
        <div className="mobile-meta absolute bottom-12 left-6 flex flex-col gap-2">
          <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
            Based in India
          </span>
          <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
            Open for freelance opportunities
          </span>
        </div>
      </div>
    </nav>
  );
}