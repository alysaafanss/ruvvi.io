import PlaceholderImage from "@/components/PlaceholderImage";

const DEFAULT_ITEMS = [
  "Lifestyle shot",
  "Product close-up",
  "Getting ready",
  "Pocket carry",
  "Night out",
  "Social setting",
];

export default function ImageMarquee({ items = DEFAULT_ITEMS, className = "" }) {
  const doubled = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track flex flex-col gap-4">
        {doubled.map((label, i) => (
          <div key={`${label}-${i}`} className="shrink-0 overflow-hidden rounded-2xl">
            <PlaceholderImage
              label={label}
              className="w-full"
              aspectRatio="aspect-[4/5]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
