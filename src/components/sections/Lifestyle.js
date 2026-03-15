import PlaceholderImage from "@/components/PlaceholderImage";

const SCENARIOS = [
  { label: "Getting Ready", span: "col-span-2 row-span-2" },
  { label: "Nightlife", span: "col-span-1 row-span-1" },
  { label: "Pocket Carry", span: "col-span-1 row-span-1" },
  { label: "Social", span: "col-span-2 row-span-1" },
];

export default function Lifestyle() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Keep one on you
          </h2>
          <p className="mt-3 text-sm text-muted sm:mt-4 sm:text-base lg:text-lg">
            Designed for the moments between the moments.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4 lg:gap-6">
          {SCENARIOS.map((scenario) => (
            <div key={scenario.label} className={`${scenario.span} overflow-hidden rounded-2xl sm:rounded-3xl`}>
              <PlaceholderImage
                label={scenario.label}
                className="h-full w-full min-h-[140px] sm:min-h-[200px]"
                aspectRatio=""
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
