const projects = [
  { id: "01", title: "Project Alpha", tag: "Web App" },
  { id: "02", title: "Project Beta", tag: "Motion" },
  { id: "03", title: "Project Gamma", tag: "Design System" },
];

export default function WorkSection() {
  return (
    <section id="work" className="min-h-screen px-8 md:px-16 py-24 bg-neutral-950">
      <span className="text-xs tracking-widest text-neutral-500 uppercase">03 / Work</span>
      <h2 className="mt-4 text-5xl md:text-6xl font-bold text-white mb-16">Selected Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-neutral-800">
        {projects.map((p) => (
          <div key={p.id} className="bg-neutral-950 p-8 hover:bg-neutral-900 transition-colors cursor-pointer group">
            <span className="text-xs text-neutral-600">{p.id}</span>
            <h3 className="mt-4 text-2xl font-semibold text-white group-hover:text-neutral-300 transition-colors">
              {p.title}
            </h3>
            <span className="mt-2 inline-block text-xs tracking-widest text-neutral-500 uppercase border border-neutral-800 px-2 py-1">
              {p.tag}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
