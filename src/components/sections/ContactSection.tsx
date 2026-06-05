"use client";
import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import Accordion from "../Accordion";

// SHADCN UI IMPORTS (Adjust these paths to match your project structure)
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "What’s your typical process for a new project?",
    answer: "We start with a discovery phase to understand your goals, audience, and competitors. From there, we move into strategy, design, and development—keeping you in the loop at every stage. Each service has its own milestones, but collaboration is constant throughout.",
  },
  {
    question: "How long does a project usually take?",
    answer: "Project timelines vary widely. A branding sprint might take 4-6 weeks, while a complex web application can span 3-6 months. We will provide a detailed timeline during the proposal phase.",
  },
  {
    question: "Do you offer packages or custom quotes?",
    answer: "While we have some standard starting packages for specific services, the vast majority of our work is custom-quoted to ensure you only pay for exactly what you need to achieve your goals.",
  },
  {
    question: "What’s included in a branding package?",
    answer: "Our core branding package typically includes logo design (variants), typography system, color palette, brand guidelines, and key asset application (e.g., business cards, social headers). It's designed to give your brand a fully realized, professional identity.",
  },
  {
    question: "Can you work with our existing dev or marketing team?",
    answer: "Absolutely. We often collaborate with internal teams, acting as a specialized extension. We are comfortable providing pure design assets, strategy, or partial development to integrate seamlessly with your current workflows.",
  },
];

interface ContactSectionProps {
  isStandalonePage?: boolean;
}

export default function ContactSection({ isStandalonePage = false }: ContactSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleMaskRef = useRef<HTMLDivElement>(null);
  const faqMaskRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(0); 

  useGSAP(() => {
    // ── 1. The Slanted Sheet Reveal (Parallax Effect) - Only on scroll page
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

      // ── 2. Content sliding up inside the sheet ──
      gsap.fromTo(
        contentRef.current,
        { y: 150 },
        {
          y: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: 1.5,
          },
        }
      );
    }

    // ── 3. Initial Setup for Reveals ──
    gsap.set(".mask-line", { y: "110%", opacity: 0 });
    gsap.set([".fade-in", ".faq-item", ".form-element"], { opacity: 0, y: 30 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%", 
      },
    });

    // ── 4. Sequence Animations ──
    tl.to(titleMaskRef.current?.querySelectorAll(".mask-line") ?? [], { 
      y: "0%", 
      opacity: 1, 
      duration: 1.2, 
      stagger: 0.1, 
      ease: "expo.out" 
    })
    .to(".fade-in", { 
      opacity: 1, y: 0, duration: 1, ease: "power3.out" 
    }, "-=0.8")
    // Staggered reveal for Shadcn form elements
    .to(".form-element", { 
      opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" 
    }, "-=0.6")
    // FAQ Section reveal
    .to(faqMaskRef.current?.querySelectorAll(".mask-line") ?? [], { 
      y: "0%", opacity: 1, duration: 1.2, stagger: 0.1, ease: "expo.out" 
    }, "-=0.4")
    .to(".faq-item", { 
      opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" 
    }, "-=0.6");

  }, { scope: sectionRef, dependencies: [isStandalonePage] });

  return (
    <section
      ref={sectionRef}
      id="contact"
      className={`relative z-30 bg-[#050505] text-white pb-16 px-6 md:px-12 lg:px-20 overflow-hidden w-full will-change-transform ${
        isStandalonePage ? "pt-8" : "-mt-16 md:-mt-24 pt-32 md:pt-48"
      }`}
      style={isStandalonePage ? {} : {
        clipPath: "polygon(0% 12%, 100% 0%, 100% 100%, 0% 100%)",
      }}
    >
      {/* contentRef wrapper applies the inner parallax sliding movement */}
      <div ref={contentRef} className="max-w-[1400px] mx-auto flex flex-col gap-24 will-change-transform">
        
        {/* ── PART 1: Top Contact Form & Main Text ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(300px,1.2fr)] gap-16 lg:gap-24 items-start w-full">
          
          {/* Left Column: Massive Heading & Description */}
          <div className="flex flex-col gap-10">
            <div className="main-title-mask" ref={titleMaskRef}>
              <div className="overflow-hidden pb-1">
                <span className="block text-white/50 font-mono text-xs uppercase tracking-widest leading-none mask-line">
                  (CONTACT US)
                </span>
              </div>
              <div className="overflow-hidden pb-2 mt-4">
                <h2 className="mask-line text-[clamp(4rem,10vw,8.5rem)] font-black uppercase text-white leading-[0.85] tracking-tighter">
                  Let’s Work <br /> Together
                </h2>
              </div>
            </div>
            
            <p className="text-white/80 text-lg md:text-xl font-medium leading-relaxed max-w-xl fade-in pt-6">
              Have a project in mind? We'd love to hear about it. Let’s create something great together!
            </p>
          </div>

          {/* Right Column: Shadcn Form & Details */}
          <div ref={formRef} className="flex flex-col gap-10 items-end w-full">
            
            {/* The Form Panel */}
            <div className="w-full bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-element">
                  <Input 
                    type="text" 
                    placeholder="Enter your name" 
                    id="name" 
                    className="h-14 bg-[#111] border-white/5 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-1 focus-visible:ring-[#f04e00] focus-visible:border-transparent transition-all duration-300" 
                  />
                </div>
                <div className="form-element">
                  <Input 
                    type="email" 
                    placeholder="Email" 
                    id="email" 
                    className="h-14 bg-[#111] border-white/5 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-1 focus-visible:ring-[#f04e00] focus-visible:border-transparent transition-all duration-300" 
                  />
                </div>
              </div>
              <div className="form-element">
                <Textarea 
                  placeholder="Message" 
                  id="message" 
                  rows={5} 
                  className="resize-none bg-[#111] border-white/5 text-white placeholder:text-white/30 rounded-xl focus-visible:ring-1 focus-visible:ring-[#f04e00] focus-visible:border-transparent p-4 transition-all duration-300" 
                />
              </div>
              
              <div className="form-element flex flex-col md:flex-row md:justify-between md:items-center gap-6 mt-2">
                <p className="text-white/50 text-[10px] max-w-sm font-mono tracking-wide leading-relaxed">
                  By submitting you agree to our <Link href="/terms" className="text-white hover:text-[#f04e00] transition-colors">Terms of Service</Link> and <Link href="/privacy" className="text-white hover:text-[#f04e00] transition-colors">Privacy Policy</Link>
                </p>
                <Button 
                  className="relative group flex items-center justify-center gap-3 bg-[#f04e00] hover:bg-[#ff5a1a] text-white px-10 h-14 rounded-full shadow-2xl shadow-[#f04e00]/20 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  <span className="text-sm font-extrabold uppercase tracking-widest relative z-10">Subscribe</span>
                  <span className="text-xl relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                  <div className="absolute inset-0 border border-white/20 rounded-full scale-[1.05] pointer-events-none" />
                </Button>
              </div>
            </div>

            {/* Book a Call CTA */}
            <p className="text-white text-base md:text-lg font-medium form-element">
              Prefer to hop on a call? <Link href="/booking" className="text-[#f04e00] font-bold hover:opacity-80 transition-opacity">Book a call</Link> instead.
            </p>

            {/* Visit Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12 w-full pt-12 border-t border-white/10 form-element">
              <div className="flex flex-col gap-3">
                <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">(Address)</span>
                <p className="text-white text-base md:text-lg font-medium leading-relaxed">
                  123 Market Street, <br /> Suite 400 <br /> Los Angeles, CA 90001
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-white/40 text-[10px] font-mono tracking-widest uppercase">(Office Hours)</span>
                <p className="text-white text-base md:text-lg font-medium leading-relaxed">
                  Monday - Friday <br /> 9:00 AM – 6:00 PM (GMT+7)
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ── PART 2: The FAQ Accordion ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(400px,2fr)] gap-16 lg:gap-24 w-full pt-20 border-t border-white/10">
          
          {/* FAQ Large Title */}
          <div className="flex flex-col gap-3" ref={faqMaskRef}>
            <div className="overflow-hidden pb-1">
              <h3 className="mask-line text-[clamp(4rem,10vw,9rem)] font-black uppercase text-white leading-[0.85] tracking-tighter">
                FAQ
              </h3>
            </div>
            <p className="text-white/80 text-base md:text-lg font-medium mask-line">
              Got specific questions? <Link href="#contact" className="text-[#f04e00] font-bold hover:opacity-80 transition-opacity">Contact Us</Link>
            </p>
          </div>

          {/* SHARED Accordion Component */}
          <div className="flex flex-col border border-white/10 rounded-2xl bg-[#0a0a0a] shadow-2xl divide-y divide-white/10">
            {faqs.map((faq, index) => (
              <Accordion 
                key={index} 
                className="faq-item"
                index={index}
                title={faq.question} 
                content={faq.answer} 
                activeFaq={activeFaq} 
                setActiveFaq={setActiveFaq}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}