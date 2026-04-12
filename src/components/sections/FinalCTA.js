import AddToCartButton from "@/components/AddToCartButton";
import EditableText from "@/components/editor/EditableText";
import { DEFAULTS } from "@/lib/content-defaults";

export default function FinalCTA({ content = {} }) {
  const c = { ...DEFAULTS.finalCta, ...content };

  return (
    <section id="shop" className="relative bg-secondary-bg py-24 sm:py-28 lg:py-40 overflow-hidden">
      {/* Strong gradient blur atmosphere */}
      <div className="gradient-blur bg-accent/30 w-[700px] h-[700px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="gradient-blur-secondary bg-oxblood/15 w-[400px] h-[400px] bottom-0 right-0" />

      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <EditableText section="finalCta" field="heading" value={c.heading} tag="h2" className="text-4xl font-light tracking-[0.02em] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl" />
          <EditableText section="finalCta" field="subtext" value={c.subtext} tag="p" className="mt-4 text-sm text-muted/50 sm:mt-6 sm:text-base lg:text-lg" />
          <AddToCartButton className="mt-8 inline-flex items-center border border-accent bg-accent px-10 py-4 text-xs tracking-[0.2em] uppercase text-background transition-all duration-300 hover:bg-accent-dark hover:border-accent-dark focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-secondary-bg sm:mt-10 sm:px-12 sm:py-4.5 sm:text-sm">
            <EditableText section="finalCta" field="buttonText" value={c.buttonText} tag="span" />
          </AddToCartButton>
        </div>
      </div>
    </section>
  );
}
