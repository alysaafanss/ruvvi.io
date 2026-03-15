import EditableText from "@/components/editor/EditableText";
import { DEFAULTS } from "@/lib/content-defaults";

export default function WhyPouches({ content = {} }) {
  const c = { ...DEFAULTS.whyPouches, ...content };

  return (
    <section className="bg-mint py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <EditableText section="whyPouches" field="heading" value={c.heading} tag="h2" className="font-display text-3xl tracking-[0.04em] text-foreground sm:text-4xl lg:text-5xl" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-16 sm:gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3 sm:gap-4">
            {(c.formats || []).map((format, i) => (
              <div key={i} className="rounded-2xl bg-white/50 p-5 sm:rounded-3xl sm:p-6">
                <h4 className="font-display text-sm tracking-[0.04em] text-foreground sm:text-base">{format.name}</h4>
                <ul className="mt-2 flex flex-col gap-1.5 sm:mt-3 sm:gap-2">
                  {(format.issues || []).map((issue, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-foreground/60">
                      <svg className="h-4 w-4 shrink-0 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                      </svg>
                      {issue}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center rounded-2xl bg-foreground p-6 sm:rounded-3xl sm:p-8 lg:p-10">
            <EditableText section="whyPouches" field="pouchesHeading" value={c.pouchesHeading} tag="h3" className="font-display text-lg tracking-[0.04em] text-white sm:text-xl" />
            <ul className="mt-5 flex flex-col gap-4 sm:mt-6 sm:gap-5">
              {(c.advantages || []).map((advantage, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/90 sm:text-base">
                  <svg className="h-5 w-5 shrink-0 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
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
