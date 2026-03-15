import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";

const DEFAULT_LABELS = [
  "Lifestyle shot",
  "Product close-up",
  "Getting ready",
  "Pocket carry",
  "Night out",
  "Social setting",
];

export default function ImageMarquee({ images = [], labels = DEFAULT_LABELS, className = "" }) {
  const hasImages = images.length > 0;
  const items = hasImages ? images : labels;
  const doubled = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track flex flex-col gap-4">
        {doubled.map((item, i) => (
          <div key={`${hasImages ? item : item}-${i}`} className="shrink-0 overflow-hidden rounded-2xl">
            {hasImages ? (
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={item}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="200px"
                />
              </div>
            ) : (
              <PlaceholderImage
                label={item}
                className="w-full"
                aspectRatio="aspect-[4/5]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
