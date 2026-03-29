import EditableText from "@/components/editor/EditableText";
import { DEFAULTS } from "@/lib/content-defaults";

const ICONS = [
  <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" /></svg>,
  <svg key="3" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
  <svg key="4" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" /></svg>,
];

export default function WhyRuvvi({ content = {} }) {
  const c = { ...DEFAULTS.whyRuvvi, ...content };

  return (
    <section className="bg-secondary-bg py-20 sm:py-24 lg:py-32">
      <div className="thin-rule mx-auto max-w-7xl mb-16 sm:mb-20" />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <EditableText section="whyRuvvi" field="heading" value={c.heading} tag="h2" className="font-display text-3xl font-light tracking-[0.02em] text-foreground sm:text-4xl lg:text-5xl" />
          <EditableText section="whyRuvvi" field="subtext" value={c.subtext} tag="p" className="mt-3 text-sm text-muted/70 sm:mt-4 sm:text-base lg:text-lg" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px bg-border sm:mt-16 sm:grid-cols-2 lg:grid-cols-3">
          {(c.benefits || []).map((benefit, i) => (
            <div key={i} className="bg-secondary-bg p-6 transition-all duration-300 hover:bg-surface sm:p-8">
              <div className="flex h-10 w-10 items-center justify-center border border-accent/30 text-accent">
                {ICONS[i] || ICONS[0]}
              </div>
              <h3 className="mt-5 text-xs tracking-[0.2em] uppercase text-foreground">
                {benefit.title}
              </h3>
              <div className="thin-rule mt-3 mb-3 w-8" />
              <p className="text-sm leading-relaxed text-muted/60">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
