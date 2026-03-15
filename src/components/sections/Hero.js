import PlaceholderImage from "@/components/PlaceholderImage";

const TRUST_BADGES = [
  {
    label: "Discreet Format",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
      </svg>
    ),
  },
  {
    label: "Fast Absorption",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    label: "Sugar Free",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

const ROTATING_WORDS = ["READY.", "CALM.", "CONFIDENT.", "PRESENT."];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
              <h1 className="font-display text-6xl font-black uppercase leading-[0.9] tracking-tight text-foreground sm:text-7xl lg:text-8xl xl:text-9xl">
                STAY
                <br />
                <span className="rotate-words text-accent-dark" style={{ height: "1.1em" }}>
                  {ROTATING_WORDS.map((word) => (
                    <span key={word} className="text-accent-dark" aria-hidden={word !== ROTATING_WORDS[0]}>
                      {word}
                    </span>
                  ))}
                </span>
              </h1>
              <p className="max-w-lg text-base leading-relaxed text-muted sm:text-lg">
                Discreet performance pouches designed for presence, control, and
                moments that matter.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href="#shop"
                className="inline-flex items-center justify-center rounded-full border-2 border-foreground bg-foreground px-10 py-4 text-sm font-bold uppercase tracking-widest text-background transition-all hover:bg-transparent hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Shop RUVVI
              </a>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center rounded-full border-2 border-foreground px-10 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:bg-foreground hover:text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                Learn more
              </a>
            </div>

            <div className="flex flex-wrap gap-6 pt-2">
              {TRUST_BADGES.map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-muted"
                >
                  {badge.icon}
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <PlaceholderImage
              label="Product Hero"
              className="w-full max-w-md"
              aspectRatio="aspect-[4/5]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
