import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";

const PRODUCT_LABELS = ["Open Tin", "Pouch Close-up", "Pouch Texture", "Scale Reference"];

export default function ProductDetails({ images = [] }) {
  return (
    <section className="bg-foreground py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-3xl font-extrabold tracking-[0.04em] text-white sm:text-4xl lg:text-5xl">
              See the details
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-base lg:text-lg">
              Each pouch is precision-crafted for comfort, consistency, and
              performance. The compact tin fits in any pocket, and the soft
              pouch sits comfortably under the lip without anyone noticing.
            </p>
            <ul className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
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

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {PRODUCT_LABELS.map((label, i) => (
              <div key={label} className="overflow-hidden rounded-2xl sm:rounded-3xl">
                {images[i] ? (
                  <div className="relative aspect-square w-full">
                    <Image
                      src={images[i]}
                      alt={label}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 50vw, 25vw"
                    />
                  </div>
                ) : (
                  <PlaceholderImage label={label} aspectRatio="aspect-square" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
