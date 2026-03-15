import AddToCartButton from "@/components/AddToCartButton";

const BENEFITS = [
  "Monthly delivery to your door",
  "Save 15% on every order",
  "Skip or cancel anytime",
  "Early access to new flavors",
];

export default function Subscription() {
  return (
    <section className="bg-mint py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-display text-xs font-bold text-accent sm:text-sm">
            Subscribe & save
          </p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            15% off every order.
            <br />
            Never run out.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted sm:text-base lg:text-lg">
            Set your schedule, and we handle the rest. No commitment, skip or cancel anytime.
          </p>

          <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2 text-left sm:mt-10 sm:gap-3">
            {BENEFITS.map((benefit) => (
              <li
                key={benefit}
                className="flex items-center gap-3 rounded-xl bg-white/50 px-4 py-2.5 text-sm font-medium text-foreground sm:rounded-2xl sm:px-5 sm:py-3"
              >
                <svg className="h-5 w-5 shrink-0 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>

          <AddToCartButton className="mt-8 inline-flex items-center rounded-full border-[3px] border-foreground bg-foreground px-10 py-4 text-sm font-bold text-white transition-all hover:bg-foreground/90 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:mt-10 sm:px-12 sm:py-[18px] sm:text-base">
            Subscribe now
          </AddToCartButton>
        </div>
      </div>
    </section>
  );
}
