"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Web Design &\nDevelopment",
    description: "Logos, colors, type, your brand, fully alive.",
    tags: ["Responsive Design", "Interaction Design"],
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  },
  {
    id: "02",
    title: "ML Pipelines &\nAI Solutions",
    description: "End-to-end machine learning — from data to deployment.",
    tags: ["Model Training", "Data Analytics"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
  },
  {
    id: "03",
    title: "IoT &\nEmbedded Systems",
    description: "Smart devices and dashboards for the physical world.",
    tags: ["Arduino", "Dashboard Design"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  },
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLHeadingElement>(null);
  const rowRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );
    }

    rowRefs.current.forEach((row) => {
      if (!row) return;
      const img  = row.querySelector(".service-img");
      const text = row.querySelector(".service-text");

      gsap.fromTo(img,  { opacity: 0, scale: 0.93 }, {
        opacity: 1, scale: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: row, start: "top 78%" },
      });
      gsap.fromTo(text, { opacity: 0, x: 40 }, {
        opacity: 1, x: 0, duration: 0.9, delay: 0.15, ease: "power2.out",
        scrollTrigger: { trigger: row, start: "top 78%" },
      });
    });
  }, []);

  return (
    <section ref={sectionRef} id="services" className="bg-[#0a0a0a] py-24 px-6 md:px-12 overflow-hidden">

      {/* Label + Title */}
      <span className="text-xs text-neutral-500 uppercase tracking-widest">(Services)</span>
      <h2
        ref={titleRef}
        className="text-[clamp(2.5rem,9vw,7rem)] font-black uppercase text-white leading-none tracking-tight mt-2 mb-20 opacity-0"
      >
        HOW I<br />CAN HELP?
      </h2>

      {/* Service rows */}
      <div className="flex flex-col">
        {services.map((service, i) => (
          <div
            key={service.id}
            ref={(el) => { rowRefs.current[i] = el; }}
            className="grid grid-cols-[auto_1fr_1.4fr] md:grid-cols-[80px_1fr_1.4fr] gap-6 items-center border-t border-neutral-800 py-10"
          >
            {/* Number */}
            <span className="text-[clamp(2rem,5vw,3.5rem)] font-black text-[#f04e00] leading-none self-start mt-1">
              {service.id}.
            </span>

            {/* Text */}
            <div className="service-text opacity-0">
              <h3 className="text-xl md:text-2xl font-black text-white uppercase leading-snug whitespace-pre-line">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-500 font-light leading-relaxed">
                {service.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest text-neutral-400 border border-neutral-700 px-3 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Image */}
            <div className="service-img relative aspect-[4/3] overflow-hidden opacity-0">
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
