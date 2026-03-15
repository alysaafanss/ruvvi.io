import AddToCartButton from "@/components/AddToCartButton";
import EditableText from "@/components/editor/EditableText";
import { DEFAULTS } from "@/lib/content-defaults";

export default function Subscription({ content = {} }) {
  const c = { ...DEFAULTS.subscription, ...content };

  return (
    <section className="bg-mint py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <EditableText section="subscription" field="eyebrow" value={c.eyebrow} tag="p" className="font-display text-xs tracking-[0.12em] text-accent sm:text-sm" />
          <EditableText section="subscription" field="heading" value={c.heading} tag="h2" className="mt-3 font-display text-3xl tracking-[0.04em] text-foreground sm:text-4xl lg:text-5xl" />
          <EditableText section="subscription" field="subtext" value={c.subtext} tag="p" className="mx-auto mt-4 max-w-lg text-sm text-muted sm:text-base lg:text-lg" />

          <ul className="mx-auto mt-8 flex max-w-md flex-col gap-2 text-left sm:mt-10 sm:gap-3">
            {(c.benefits || []).map((benefit, i) => (
              <li key={i} className="flex items-center gap-3 rounded-xl bg-white/50 px-4 py-2.5 text-sm font-medium text-foreground sm:rounded-2xl sm:px-5 sm:py-3">
                <svg className="h-5 w-5 shrink-0 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                {benefit}
              </li>
            ))}
          </ul>

          <AddToCartButton className="mt-8 inline-flex items-center rounded-full border-[3px] border-foreground bg-foreground px-10 py-4 font-display text-sm tracking-[0.1em] text-white transition-all hover:bg-foreground/90 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:mt-10 sm:px-12 sm:py-[18px] sm:text-base">
            <EditableText section="subscription" field="buttonText" value={c.buttonText} tag="span" />
          </AddToCartButton>
        </div>
      </div>
    </section>
  );
}
