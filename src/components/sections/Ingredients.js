const INGREDIENTS = [
  {
    name: "Nitrosigine",
    description: "Clinically studied complex that boosts nitric oxide levels for enhanced blood flow within 30 minutes.",
    color: "bg-accent-dark/10 text-accent-dark",
  },
  {
    name: "Vaso6",
    description: "Green tea-derived compound that supports vasodilation and healthy circulation.",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Rhodiola Rosea",
    description: "Adaptogenic herb that reduces stress and fatigue while supporting calm focus and endurance.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Horny Goat Weed",
    description: "Traditional botanical containing icariin, used for centuries to support vitality and natural energy.",
    color: "bg-rose-100 text-rose-700",
  },
  {
    name: "Pine Bark",
    description: "Rich in antioxidants that support blood vessel health and healthy nitric oxide production.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Saffron",
    description: "Premium botanical that supports mood, confidence, and overall well-being.",
    color: "bg-orange-100 text-orange-700",
  },
  {
    name: "Kanna",
    description: "South African succulent extract that promotes calm, presence, and mental clarity.",
    color: "bg-teal-100 text-teal-700",
  },
];

export default function Ingredients() {
  return (
    <section id="ingredients" className="bg-sage py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="lg:sticky lg:top-32">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Transparent
              <br />
              ingredients
            </h2>
            <p className="mt-4 text-base text-muted sm:text-lg">
              No proprietary blends. Every ingredient serves a purpose.
              Clinically studied. Clearly dosed.
            </p>
            <a
              href="#shop"
              className="mt-8 inline-flex items-center rounded-full bg-foreground px-8 py-3.5 text-sm font-semibold text-white transition-all hover:bg-foreground/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2"
            >
              Get started for free
            </a>
          </div>

          <div className="flex flex-col gap-4">
            {INGREDIENTS.map((ingredient) => (
              <div
                key={ingredient.name}
                className="rounded-3xl bg-white/60 p-6 transition-all hover:bg-white/80 sm:p-8"
              >
                <div className="flex items-center gap-3">
                  <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${ingredient.color}`}>
                    {ingredient.name}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">
                  {ingredient.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
