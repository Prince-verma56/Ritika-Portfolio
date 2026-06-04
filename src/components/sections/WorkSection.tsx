"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01",
    title: "Adhayaya",
    subtitle: "Indian Heritage & Travel Platform",
    tags: ["Next.js", "WebGL", "Travel"],
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80",
    link: "#",
  },
  {
    id: "02",
    title: "Dhritam",
    subtitle: "AI-Powered Health Monitoring",
    tags: ["Python", "TensorFlow", "IoT"],
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
    link: "#",
  },
  {
    id: "03",
    title: "Hazu",
    subtitle: "Predictive Analytics Dashboard",
    tags: ["React", "D3.js", "ML"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    link: "#",
  },
];

const allTitles = projects.map((p) => p.title);

export default function WorkSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const titleRef    = useRef<HTMLHeadingElement>(null);
  const itemRefs    = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Animate section title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, x: -80 },
        {
          opacity: 1, x: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
        }
      );
    }

    // Animate each project row
    itemRefs.current.forEach((item) => {
      if (!item) return;
      const number = item.querySelector(".project-number");
      const names  = item.querySelectorAll(".project-name");
      const card   = item.querySelector(".project-card");

      gsap.fromTo(
        number,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 80%" },
        }
      );
      gsap.fromTo(
        names,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.7, stagger: 0.08, delay: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 80%" },
        }
      );
      gsap.fromTo(
        card,
        { opacity: 0, x: 100, scale: 0.96 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1, delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 75%" },
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} id="work" className="bg-black py-24 px-6 md:px-12 overflow-hidden">

      {/* Section heading */}
      <h2
        ref={titleRef}
        className="text-[clamp(2.5rem,10vw,7rem)] font-black uppercase text-[#f04e00] leading-none tracking-tight mb-20 opacity-0"
      >
        LATEST WORK.
      </h2>

      {/* Project rows */}
      <div className="flex flex-col gap-20">
        {projects.map((project, i) => (
          <div
            key={project.id}
            ref={(el) => { itemRefs.current[i] = el; }}
            className="grid grid-cols-2 md:grid-cols-[1fr_2fr] gap-8 items-center border-t border-neutral-800 pt-8"
          >
            {/* Left: number + project name list */}
            <div>
              <span className="project-number block text-[clamp(3rem,8vw,6rem)] font-black text-white leading-none mb-4 opacity-0">
                {project.id}.
              </span>
              <div className="flex flex-col gap-1">
                {allTitles.map((name, j) => (
                  <span
                    key={j}
                    className={`project-name text-sm md:text-base opacity-0 transition-colors ${
                      name === project.title
                        ? "text-white font-semibold border-l-2 border-[#f04e00] pl-3"
                        : "text-neutral-600 pl-3"
                    }`}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: image card */}
            <div className="project-card relative group overflow-hidden opacity-0">
              <div className="relative aspect-[16/9] overflow-hidden rounded-sm">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 60vw"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500" />
                {/* View Project button */}
                <a
                  href={project.link}
                  className="absolute bottom-4 right-4 bg-white text-black text-xs font-bold uppercase tracking-widest px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-1 pointer-events-auto"
                >
                  View Project ↗
                </a>
              </div>
              {/* Project subtitle + tags */}
              <div className="mt-3 flex items-center justify-between">
                <span className="text-xs text-neutral-500 uppercase tracking-widest">
                  {project.subtitle}
                </span>
                <div className="flex gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] text-neutral-600 border border-neutral-800 px-2 py-0.5 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
