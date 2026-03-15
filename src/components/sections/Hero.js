import ImageMarquee from "@/components/ImageMarquee";

const ROTATING_WORDS = ["ready.", "calm.", "confident.", "present."];

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-mint pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-5 lg:gap-8">
          <div className="flex flex-col gap-8 lg:col-span-3">
            <div className="flex flex-col gap-6">
              <p className="font-display text-sm font-semibold text-accent-dark">
                Discreet performance pouches
              </p>
              <h1 className="font-display text-5xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
                Confidence
                <br />
                on demand.
                <br />
                Stay{" "}
                <span className="rotate-words text-accent-dark" style={{ height: "1.15em", width: "5.5em" }}>
                  {ROTATING_WORDS.map((word) => (
                    <span key={word} aria-hidden={word !== ROTATING_WORDS[0]}>
                      {word}
                    </span>
                  ))}
                </span>
              </h1>
              <p className="max-w-md text-base leading-relaxed text-foreground/70 sm:text-lg">
                Place under your lip. Premium ingredients absorb fast.
                No water, no pills, no awkward moments.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#shop"
                className="inline-flex items-center justify-center rounded-full bg-foreground px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-foreground/85 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2"
              >
                Try RUVVI now
              </a>
              <p className="flex items-center gap-2 text-sm text-foreground/60">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                30 day risk-free trial
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
              {["Discreet format", "Fast absorption", "Sugar free"].map((badge) => (
                <span
                  key={badge}
                  className="rounded-full bg-white/50 px-4 py-1.5 text-xs font-semibold text-foreground/80"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="hidden h-[600px] lg:col-span-2 lg:flex lg:gap-4 lg:justify-end">
            <ImageMarquee className="w-44 rounded-2xl" />
            <ImageMarquee
              className="w-44 rounded-2xl mt-12"
              items={[
                "Getting ready",
                "Night out",
                "Pouch texture",
                "Pocket shot",
                "Scale reference",
                "Tin design",
                "Social proof",
                "UGC content",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
