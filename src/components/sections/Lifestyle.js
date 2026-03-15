import PlaceholderImage from "@/components/PlaceholderImage";

const SCENARIOS = [
  { label: "Getting Ready", span: "col-span-2 row-span-2" },
  { label: "Nightlife", span: "col-span-1 row-span-1" },
  { label: "Pocket Carry", span: "col-span-1 row-span-1" },
  { label: "Social", span: "col-span-2 row-span-1" },
];

export default function Lifestyle() {
  return (
    <section className="bg-secondary-bg py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Keep one on you.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Designed for the moments between the moments.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {SCENARIOS.map((scenario) => (
            <div key={scenario.label} className={scenario.span}>
              <PlaceholderImage
                label={scenario.label}
                className="h-full w-full min-h-[200px]"
                aspectRatio=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
