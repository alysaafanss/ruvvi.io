const BENEFITS = [
  "Monthly delivery to your door",
  "Save 15% on every order",
  "Skip or cancel anytime",
  "Early access to new flavors",
];

export default function Subscription() {
  return (
    <section className="bg-mint py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-sm font-semibold text-accent-dark">
            Subscribe & save
          </p>
          <h2 className="mt-3 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            15% off every order.
            <br />
            Never run out.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-foreground/60 sm:text-lg">
            Set your schedule, and we handle the rest. No commitment, skip or cancel anytime.
          </p>

          <ul className="mx-auto mt-10 flex max-w-md flex-col gap-3 text-left">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-3 rounded-2xl bg-white/50 px-5 py-3 text-sm font-medium text-foreground"
              >
                <svg className="h-5 w-5 shrink-0 text-accent-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>

          <a
            href="#shop"
            className="mt-10 inline-flex items-center rounded-full bg-foreground px-10 py-4 text-sm font-semibold text-white transition-all hover:bg-foreground/85 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2"
          >
            Subscribe now
          </a>
        </div>
      </div>
    </section>
  );
}
