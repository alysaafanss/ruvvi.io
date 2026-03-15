import ImageMarquee from "@/components/ImageMarquee";
import AddToCartButton from "@/components/AddToCartButton";

const ROTATING_WORDS = ["ready.", "calm.", "sharp.", "steady."];

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-background pt-20 sm:pt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="flex flex-col gap-6 sm:gap-8">
            <div className="flex items-center gap-2 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm text-foreground/70">
                <span className="font-bold text-accent">4.8</span> stars from <span className="font-bold text-foreground">85,000</span> reviews
              </span>
            </div>

            <div className="flex flex-col gap-4 sm:gap-6">
              <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Feel{" "}
                <span className="rotate-words text-accent" style={{ height: "1.15em", width: "3.5em" }}>
                  {ROTATING_WORDS.map((word) => (
                    <span key={word} aria-hidden={word !== ROTATING_WORDS[0]}>
                      {word}
                    </span>
                  ))}
                </span>
                <br />
                <span className="text-accent">On demand.</span>
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-muted sm:text-base lg:text-lg">
                Place under your lip. Premium ingredients absorb fast.
                No water, no pills, no awkward moments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <AddToCartButton className="inline-flex items-center justify-center rounded-full border-[3px] border-foreground bg-foreground px-8 py-4 text-sm font-bold text-white transition-all hover:bg-foreground/90 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-10 sm:py-[18px] sm:text-base">
                Try RUVVI now
              </AddToCartButton>
              <p className="flex items-center gap-2 text-xs text-muted sm:text-sm">
                <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                30-Day Guarantee
              </p>
            </div>
          </div>

          <div className="hidden h-[650px] lg:flex lg:justify-end">
            <ImageMarquee className="w-full max-w-sm rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
