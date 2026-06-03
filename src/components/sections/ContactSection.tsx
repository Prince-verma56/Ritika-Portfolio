export default function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex flex-col items-center justify-center px-8 bg-black text-center">
      <span className="text-xs tracking-widest text-neutral-500 uppercase">04 / Contact</span>
      <h2 className="mt-4 text-5xl md:text-8xl font-bold text-white">Let's talk.</h2>
      <a
        href="mailto:hello@yourportfolio.dev"
        className="mt-10 inline-block border border-white text-white px-8 py-4 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors"
      >
        hello@yourportfolio.dev
      </a>
    </section>
  );
}
