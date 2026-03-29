export default function PlaceholderImage({
  label = "Image",
  className = "",
  aspectRatio = "aspect-square",
  icon,
}) {
  return (
    <div
      className={`flex items-center justify-center bg-surface border border-border ${aspectRatio} ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-muted/30">
        {icon || (
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
            />
          </svg>
        )}
        <span className="text-[10px] tracking-[0.2em] uppercase">
          {label}
        </span>
      </div>
    </div>
  );
}
