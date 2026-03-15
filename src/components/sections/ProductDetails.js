import PlaceholderImage from "@/components/PlaceholderImage";

const PRODUCT_IMAGES = [
  { label: "Open Tin", aspect: "aspect-square" },
  { label: "Pouch Close-up", aspect: "aspect-square" },
  { label: "Pouch Texture", aspect: "aspect-square" },
  { label: "Scale Reference", aspect: "aspect-square" },
];

export default function ProductDetails() {
  return (
    <section className="bg-foreground py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              See the details
            </h2>
            <p className="mt-6 text-base leading-relaxed text-white/60 sm:text-lg">
              Each pouch is precision-crafted for comfort, consistency, and
              performance. The compact tin fits in any pocket, and the soft
              pouch sits comfortably under the lip without anyone noticing.
            </p>
            <ul className="mt-8 flex flex-col gap-4">
              {[
                "Soft, textile-grade pouch material",
                "Compact metal tin \u2014 fits in any pocket",
                "15 pouches per tin",
                "Mint flavor",
              ].map((detail) => (
                <li key={detail} className="flex items-center gap-3 text-sm font-medium text-white/80">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {PRODUCT_IMAGES.map((img) => (
              <div key={img.label} className="overflow-hidden rounded-3xl">
                <PlaceholderImage label={img.label} aspectRatio={img.aspect} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
