export default function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex items-center px-8 md:px-16 py-24 bg-black">
      <div className="max-w-4xl">
        <span className="text-xs tracking-widest text-neutral-500 uppercase">02 / About</span>
        <h2 className="mt-4 text-5xl md:text-7xl font-bold text-white leading-tight">
          Building things<br />that matter.
        </h2>
        <p className="mt-8 text-lg text-neutral-400 max-w-xl leading-relaxed">
          Full-stack developer focused on performant, visually rich web experiences. Obsessed with the intersection of engineering and design.
        </p>
      </div>
    </section>
  );
}
