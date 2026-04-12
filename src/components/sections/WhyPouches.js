import EditableText from "@/components/editor/EditableText";
import { DEFAULTS } from "@/lib/content-defaults";

export default function WhyPouches({ content = {} }) {
  const c = { ...DEFAULTS.whyPouches, ...content };

  return (
    <section className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <EditableText section="whyPouches" field="heading" value={c.heading} tag="h2" className="text-3xl font-light tracking-[0.02em] text-foreground sm:text-4xl lg:text-5xl" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-px bg-border sm:mt-16 lg:grid-cols-2">
          <div className="flex flex-col gap-px bg-border">
            {(c.formats || []).map((format, i) => (
              <div key={i} className="bg-background p-5 sm:p-6">
                <h4 className="text-xs tracking-[0.2em] uppercase text-foreground/60">{format.name}</h4>
                <ul className="mt-3 flex flex-col gap-2">
                  {(format.issues || []).map((issue, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-muted/50">
                      <svg className="h-3.5 w-3.5 shrink-0 text-oxblood" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center bg-surface p-6 sm:p-8 lg:p-10">
            <EditableText section="whyPouches" field="pouchesHeading" value={c.pouchesHeading} tag="h3" className="text-xl font-light tracking-[0.02em] text-foreground sm:text-2xl" />
            <div className="thin-rule mt-4 mb-5 w-12" />
            <ul className="flex flex-col gap-4 sm:gap-5">
              {(c.advantages || []).map((advantage, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-foreground/80 sm:text-base">
                  <svg className="h-4 w-4 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {advantage}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
