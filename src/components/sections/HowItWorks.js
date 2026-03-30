"use client";

import AddToCartButton from "@/components/AddToCartButton";
import EditableText from "@/components/editor/EditableText";
import { DEFAULTS } from "@/lib/content-defaults";

const STEP_ICONS = [
  <svg key="0" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>,
  <svg key="1" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" /></svg>,
  <svg key="2" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>,
];

export default function HowItWorks({ content = {}, images = [] }) {
  const c = { ...DEFAULTS.showcase, ...content };

  return (
    <section id="how-it-works" className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-[10px] tracking-[0.3em] uppercase text-accent mb-3">3-Step System</p>
          <EditableText section="showcase" field="heading" value={c.heading} tag="h2" className="font-display text-4xl font-light tracking-[0.02em] text-foreground sm:text-5xl lg:text-6xl" />
        </div>

        <div className="mt-14 grid grid-cols-1 gap-px bg-border sm:mt-20 lg:grid-cols-3">
          {(c.products || []).map((step, i) => (
            <div key={i} className="bg-background p-8 sm:p-10 lg:p-12">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex h-10 w-10 items-center justify-center border border-accent/30 text-accent">
                  {STEP_ICONS[i]}
                </div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-muted/40">Step {i + 1}</span>
              </div>
              <h3 className="font-display text-2xl font-light tracking-[0.02em] text-foreground sm:text-3xl">
                {step.name}
              </h3>
              <div className="thin-rule mt-4 mb-4 w-8" />
              <p className="text-sm leading-relaxed text-muted/60 sm:text-base">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <AddToCartButton className="inline-flex items-center border border-accent bg-accent px-10 py-4 text-xs tracking-[0.2em] uppercase text-background transition-all duration-300 hover:bg-accent-dark hover:border-accent-dark focus:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-12 sm:py-4.5 sm:text-sm">
            {c.shopAllText || "SHOP NOW"}
          </AddToCartButton>
        </div>
      </div>
    </section>
  );
}
