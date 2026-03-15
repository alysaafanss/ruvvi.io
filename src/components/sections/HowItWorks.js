const STEPS = [
  {
    number: "01",
    title: "Open the tin.",
    description: "Compact, pocket-sized tin you can carry anywhere.",
  },
  {
    number: "02",
    title: "Place pouch under lip.",
    description: "Soft, comfortable pouch that sits discreetly in place.",
  },
  {
    number: "03",
    title: "Stay ready.",
    description: "Fast-absorbing ingredients go to work in minutes.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Simple as that
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Three steps. No water, no waiting, no questions.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center rounded-3xl bg-sage p-10 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-dark/10">
                <span className="font-display text-2xl font-extrabold text-accent-dark">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-6 font-display text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-12 text-center text-sm text-muted">
          Designed for daily carry. Use whenever you want to feel steady,
          present, and confident.
        </p>
      </div>
    </section>
  );
}
