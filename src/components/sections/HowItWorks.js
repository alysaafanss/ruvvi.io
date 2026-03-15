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
    <section id="how-it-works" className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Simple as that
          </h2>
          <p className="mt-3 text-sm text-muted sm:mt-4 sm:text-base lg:text-lg">
            Three steps. No water, no waiting, no questions.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-3 sm:gap-6">
          {STEPS.map((step) => (
            <div
              key={step.number}
              className="flex flex-col items-center rounded-2xl bg-sage p-8 text-center sm:rounded-3xl sm:p-10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-dark/10 sm:h-16 sm:w-16">
                <span className="font-display text-xl font-extrabold text-accent-dark sm:text-2xl">
                  {step.number}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-foreground sm:mt-6 sm:text-xl">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted sm:mt-3">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-xs text-muted sm:mt-12 sm:text-sm">
          Designed for daily carry. Use whenever you want to feel steady,
          present, and confident.
        </p>
      </div>
    </section>
  );
}
