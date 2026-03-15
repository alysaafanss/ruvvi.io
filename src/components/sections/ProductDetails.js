import PlaceholderImage from "@/components/PlaceholderImage";

const PRODUCT_IMAGES = [
  { label: "Open Tin", aspect: "aspect-square" },
  { label: "Pouch Close-up", aspect: "aspect-square" },
  { label: "Pouch Texture", aspect: "aspect-square" },
  { label: "Scale Reference", aspect: "aspect-square" },
];

export default function ProductDetails() {
  return (
    <section className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              See the details.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Each pouch is precision-crafted for comfort, consistency, and
              performance. The compact tin fits in any pocket, and the soft
              pouch sits comfortably under the lip without anyone noticing.
            </p>
            <ul className="mt-8 flex flex-col gap-3">
              {[
                "Soft, textile-grade pouch material",
                "Compact metal tin — fits in any pocket",
                "15 pouches per tin",
                "Mint flavor",
              ].map((detail) => (
                <li
                  key={detail}
                  className="flex items-center gap-3 text-sm text-foreground"
                >
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-dark" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {PRODUCT_IMAGES.map((img) => (
              <PlaceholderImage
                key={img.label}
                label={img.label}
                aspectRatio={img.aspect}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
