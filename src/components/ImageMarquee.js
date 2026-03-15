import PlaceholderImage from "@/components/PlaceholderImage";

const DEFAULT_ITEMS = [
  "Tin open",
  "Pouch close-up",
  "Lifestyle date",
  "Pocket carry",
  "Nightlife",
  "Social setting",
  "Product detail",
  "Texture shot",
];

export default function ImageMarquee({ items = DEFAULT_ITEMS, className = "" }) {
  const doubled = [...items, ...items];

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
      <div className="marquee-track flex flex-col gap-4">
        {doubled.map((label, i) => (
          <PlaceholderImage
            key={`${label}-${i}`}
            label={label}
            className="w-full shrink-0"
            aspectRatio="aspect-[3/4]"
          />
        ))}
      </div>
    </div>
  );
}
