const BENEFITS = [
  "Monthly delivery to your door",
  "Save 15% on every order",
  "Skip or cancel anytime",
  "Early access to new flavors",
];

export default function Subscription() {
  return (
    <section className="bg-secondary-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-foreground p-10 text-center sm:p-16">
          <p className="font-display text-sm font-bold uppercase tracking-widest text-accent">
            Subscribe &amp; save
          </p>
          <h2 className="mt-4 font-display text-4xl font-black uppercase tracking-tight text-background sm:text-5xl">
            15% off every order.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-background/70">
            Never run out. Set your schedule, and we handle the rest.
          </p>

          <ul className="mx-auto mt-10 flex max-w-sm flex-col gap-4 text-left">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-3 text-sm font-medium text-background/80"
              >
                <svg className="h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>

          <a
            href="#shop"
            className="mt-10 inline-flex items-center rounded-full border-2 border-accent bg-accent px-10 py-4 text-sm font-bold uppercase tracking-widest text-foreground transition-all hover:bg-transparent hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
          >
            Subscribe Now
          </a>
        </div>
      </div>
    </section>
  );
}
