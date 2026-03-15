import AddToCartButton from "@/components/AddToCartButton";

export default function FinalCTA() {
  return (
    <section id="shop" className="bg-foreground py-24 sm:py-28 lg:py-40">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl">
            Ready for a<br />
            confidence upgrade?
          </h2>
          <p className="mt-4 text-sm text-white/50 sm:mt-6 sm:text-base lg:text-lg">
            Presence matters. Be the person who never has to think twice.
          </p>
          <AddToCartButton className="mt-8 inline-flex items-center rounded-full border-[3px] border-accent bg-accent px-10 py-4 text-sm font-bold text-foreground transition-all hover:bg-accent-dark hover:border-accent-dark hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground sm:mt-10 sm:px-12 sm:py-[18px] sm:text-base">
            Shop RUVVI
          </AddToCartButton>
        </div>
      </div>
    </section>
  );
}
