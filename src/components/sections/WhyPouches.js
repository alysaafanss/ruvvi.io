const FORMATS = [
  {
    name: "Chocolate",
    issues: ["Messy", "Slow to absorb", "Obvious to use"],
    isPouch: false,
  },
  {
    name: "Pills",
    issues: ["Needs water", "Slow onset", "Feels clinical"],
    isPouch: false,
  },
  {
    name: "Drinks",
    issues: ["Bulky", "Not discreet", "Slow absorption"],
    isPouch: false,
  },
];

const POUCH_ADVANTAGES = [
  "Completely discreet",
  "Pocket-sized & portable",
  "Fast-acting sublingual delivery",
  "No water needed",
  "Use anywhere, anytime",
];

export default function WhyPouches() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Why pouches
          </h2>
          <p className="mt-4 text-lg text-muted">
            Not all formats are created equal.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted">
              Other formats
            </h3>
            <div className="flex flex-col gap-4">
              {FORMATS.map((format) => (
                <div
                  key={format.name}
                  className="rounded-2xl border border-border bg-background p-6"
                >
                  <h4 className="text-base font-medium text-foreground">
                    {format.name}
                  </h4>
                  <ul className="mt-3 flex flex-col gap-2">
                    {format.issues.map((issue) => (
                      <li
                        key={issue}
                        className="flex items-center gap-2 text-sm text-muted"
                      >
                        <svg className="h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                        </svg>
                        {issue}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-muted">
              RUVVI Pouches
            </h3>
            <div className="flex h-full flex-col justify-center rounded-2xl border-2 border-accent bg-accent/5 p-8">
              <ul className="flex flex-col gap-4">
                {POUCH_ADVANTAGES.map((advantage) => (
                  <li
                    key={advantage}
                    className="flex items-center gap-3 text-base text-foreground"
                  >
                    <svg className="h-5 w-5 shrink-0 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                    {advantage}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
