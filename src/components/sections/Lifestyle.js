import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";
import { DEFAULTS } from "@/lib/content-defaults";

const SPANS = [
  "col-span-2 row-span-2",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
];

export default function Lifestyle({ content = {}, images = [] }) {
  const c = { ...DEFAULTS.lifestyle, ...content };

  return (
    <section className="relative bg-secondary-bg py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Gradient blur mood layer */}
      <div className="gradient-blur bg-accent/20 w-[600px] h-[600px] -top-40 -left-40" />
      <div className="gradient-blur-secondary bg-oxblood/15 w-[400px] h-[400px] bottom-20 right-0" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <EditableText section="lifestyle" field="heading" value={c.heading} tag="h2" className="font-display text-3xl font-light tracking-[0.02em] text-foreground sm:text-4xl lg:text-5xl" />
          <EditableText section="lifestyle" field="subtext" value={c.subtext} tag="p" className="mt-3 text-sm text-muted/60 sm:mt-4 sm:text-base lg:text-lg" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-1 sm:mt-16 sm:grid-cols-4 sm:gap-1">
          {(c.scenarioLabels || []).map((label, i) => (
            <div key={i} className={`${SPANS[i] || ""} overflow-hidden relative group`}>
              <EditableImage
                category="Lifestyle"
                label={label}
                aspectRatio=""
                containerClassName="h-full w-full min-h-[140px] sm:min-h-[200px]"
              >
                {images[i] ? (
                  <div className="relative h-full w-full min-h-[140px] sm:min-h-[200px]">
                    <Image src={images[i]} alt={label} fill className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" sizes="(max-width: 640px) 50vw, 25vw" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                ) : (
                  <PlaceholderImage label={label} className="h-full w-full min-h-[140px] sm:min-h-[200px]" aspectRatio="" />
                )}
              </EditableImage>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
