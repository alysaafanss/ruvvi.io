import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";
import { DEFAULTS } from "@/lib/content-defaults";

export default function ProductDetails({ content = {}, images = [] }) {
  const c = { ...DEFAULTS.productDetails, ...content };

  return (
    <section className="bg-surface py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-4">Specifications</p>
            <EditableText section="productDetails" field="heading" value={c.heading} tag="h2" className="font-display text-3xl font-light tracking-[0.02em] text-foreground sm:text-4xl lg:text-5xl" />
            <div className="thin-rule mt-6 mb-6" />
            <EditableText section="productDetails" field="description" value={c.description} tag="p" className="text-sm leading-relaxed text-muted/70 sm:text-base" />
            <ul className="mt-6 flex flex-col gap-0">
              {(c.details || []).map((detail, i) => (
                <li key={i} className="flex items-center gap-3 border-b border-border py-3 text-sm text-foreground/70">
                  <span className="h-1 w-1 shrink-0 bg-accent" />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-1">
            {(c.imageLabels || []).map((label, i) => (
              <div key={i} className="overflow-hidden relative group">
                <EditableImage
                  category="Product"
                  label={label}
                  aspectRatio="aspect-square"
                >
                  {images[i] ? (
                    <div className="relative aspect-square w-full">
                      <Image src={images[i]} alt={label} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" sizes="(max-width: 640px) 50vw, 25vw" />
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
