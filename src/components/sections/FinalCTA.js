export default function FinalCTA() {
  return (
    <section id="shop" className="bg-foreground py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-5xl font-black uppercase tracking-tight text-background sm:text-6xl lg:text-8xl">
            Stay ready.
          </h2>
          <p className="mt-6 text-base text-background/60 sm:text-lg">
            Presence matters. Be the person who never has to think twice.
          </p>
          <a
            href="#shop"
            className="mt-10 inline-flex items-center rounded-full border-2 border-accent bg-accent px-12 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:bg-transparent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:text-base"
          >
            Shop RUVVI
          </a>
        </div>
      </div>
    </section>
  );
}
