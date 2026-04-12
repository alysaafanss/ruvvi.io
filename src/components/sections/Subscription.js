import AddToCartButton from "@/components/AddToCartButton";
import EditableText from "@/components/editor/EditableText";
import { DEFAULTS } from "@/lib/content-defaults";

export default function Subscription({ content = {} }) {
  const c = { ...DEFAULTS.subscription, ...content };

  return (
    <section className="relative bg-surface py-20 sm:py-24 lg:py-32 overflow-hidden">
      {/* Deeper gradient atmosphere */}
      <div className="gradient-blur bg-accent/25 w-[600px] h-[600px] -bottom-40 -right-40" />
      <div className="gradient-blur-secondary bg-oxblood/20 w-[500px] h-[500px] -top-20 -left-20" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <EditableText section="subscription" field="eyebrow" value={c.eyebrow} tag="p" className="text-[10px] tracking-[0.3em] uppercase text-accent" />
          <EditableText section="subscription" field="heading" value={c.heading} tag="h2" className="mt-3 text-3xl font-light tracking-[0.02em] text-foreground sm:text-4xl lg:text-5xl" />
          <EditableText section="subscription" field="subtext" value={c.subtext} tag="p" className="mx-auto mt-4 max-w-lg text-sm text-muted/60 sm:text-base lg:text-lg" />

          <ul className="mx-auto mt-8 flex max-w-md flex-col gap-0 text-left sm:mt-10">
            {(c.benefits || []).map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 border-b border-border px-4 py-3 text-sm text-foreground/70 sm:px-5 sm:py-3.5">
                <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>

          <AddToCartButton className="mt-8 inline-flex items-center border border-accent bg-accent px-10 py-4 text-xs tracking-[0.2em] uppercase text-background transition-all duration-300 hover:bg-accent-dark hover:border-accent-dark focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface sm:mt-10 sm:px-12 sm:py-[18px] sm:text-sm">
            <EditableText section="subscription" field="buttonText" value={c.buttonText} tag="span" />
          </AddToCartButton>
        </div>
      </div>
    </section>
  );
}
