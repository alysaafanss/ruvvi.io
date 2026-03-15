import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import PlaceholderImage from "@/components/PlaceholderImage";

const ROTATING_WORDS = ["READY.", "CALM.", "SHARP.", "STEADY."];

export default function Hero({ heroImages = [] }) {
  const mainImage = heroImages[0] || null;

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-background py-32 sm:py-36 lg:py-40">
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

            <div className="flex flex-col gap-4 sm:gap-5">
              <h1 className="font-display text-6xl leading-[0.95] tracking-[0.04em] text-foreground sm:text-7xl lg:text-8xl xl:text-9xl">
                <span className="whitespace-nowrap">
                  FEEL{" "}
                  <span className="rotate-words text-accent" style={{ height: "1.05em", width: "4.2em" }}>
                    {ROTATING_WORDS.map((word) => (
                      <span key={word} aria-hidden={word !== ROTATING_WORDS[0]}>
                        {word}
                      </span>
                    ))}
                  </span>
                </span>
                <br />
                <span className="text-accent">ON DEMAND.</span>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
                Place under your lip. Premium ingredients absorb fast.
                No water, no pills, no awkward moments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <AddToCartButton className="inline-flex items-center justify-center rounded-full border-[3px] border-foreground bg-foreground px-8 py-4 font-display text-base tracking-[0.1em] text-white transition-all hover:bg-foreground/90 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-10 sm:py-[18px] sm:text-lg">
                TRY RUVVI NOW
              </AddToCartButton>
              <p className="flex items-center gap-2 text-sm text-muted">
                <svg className="h-5 w-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                30-Day Guarantee
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            {mainImage ? (
              <div className="relative w-full max-w-lg">
                <Image
                  src={mainImage}
                  alt="RUVVI product"
                  width={800}
                  height={800}
                  className="h-auto w-full"
                  sizes="(max-width: 1024px) 90vw, 50vw"
                  priority
                />
              </div>
            ) : (
              <PlaceholderImage
                label="Product Hero"
                className="w-full max-w-lg"
                aspectRatio="aspect-square"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
