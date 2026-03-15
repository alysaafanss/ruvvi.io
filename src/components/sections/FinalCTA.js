export default function FinalCTA() {
  return (
    <section id="shop" className="bg-foreground py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl">
            Ready for a<br />
            confidence upgrade?
          </h2>
          <p className="mt-6 text-base text-white/50 sm:text-lg">
            Presence matters. Be the person who never has to think twice.
          </p>
          <a
            href="#shop"
            className="mt-10 inline-flex items-center rounded-full bg-accent px-12 py-4 text-sm font-semibold text-foreground transition-all hover:bg-accent-dark hover:text-white hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:text-base"
          >
            Shop RUVVI
          </a>
        </div>
      </div>
    </section>
  );
}
