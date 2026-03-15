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
    <section className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <EditableText section="lifestyle" field="heading" value={c.heading} tag="h2" className="font-display text-3xl tracking-[0.04em] text-foreground sm:text-4xl lg:text-5xl" />
          <EditableText section="lifestyle" field="subtext" value={c.subtext} tag="p" className="mt-3 text-sm text-muted sm:mt-4 sm:text-base lg:text-lg" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-16 sm:grid-cols-4 sm:gap-4 lg:gap-6">
          {(c.scenarioLabels || []).map((label, i) => (
            <div key={i} className={`${SPANS[i] || ""} overflow-hidden rounded-2xl sm:rounded-3xl`}>
              <EditableImage
                category="Lifestyle"
                label={label}
                aspectRatio=""
                containerClassName="h-full w-full min-h-[140px] sm:min-h-[200px]"
              >
                {images[i] ? (
                  <div className="relative h-full w-full min-h-[140px] sm:min-h-[200px]">
                    <Image src={images[i]} alt={label} fill className="object-cover" sizes="(max-width: 640px) 50vw, 25vw" />
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
