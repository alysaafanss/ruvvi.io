import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";
import { DEFAULTS } from "@/lib/content-defaults";

export default function ProductDetails({ content = {}, images = [] }) {
  const c = { ...DEFAULTS.productDetails, ...content };

  return (
    <section className="bg-foreground py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <EditableText section="productDetails" field="heading" value={c.heading} tag="h2" className="font-display text-3xl tracking-[0.04em] text-white sm:text-4xl lg:text-5xl" />
            <EditableText section="productDetails" field="description" value={c.description} tag="p" className="mt-4 text-sm leading-relaxed text-white/60 sm:mt-6 sm:text-base lg:text-lg" />
            <ul className="mt-6 flex flex-col gap-3 sm:mt-8 sm:gap-4">
              {(c.details || []).map((detail, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/80">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-accent" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {(c.imageLabels || []).map((label, i) => (
              <div key={i} className="overflow-hidden rounded-2xl sm:rounded-3xl">
                <EditableImage
                  category="Product"
                  label={label}
                  aspectRatio="aspect-square"
                >
                  {images[i] ? (
                    <div className="relative aspect-square w-full">
                      <Image src={images[i]} alt={label} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
                    </div>
                  ) : (
                    <PlaceholderImage label={label} aspectRatio="aspect-square" />
                  )}
                </EditableImage>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
