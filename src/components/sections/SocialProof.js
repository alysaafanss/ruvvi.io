import EditableText from "@/components/editor/EditableText";
import { DEFAULTS } from "@/lib/content-defaults";

export default function SocialProof({ content = {} }) {
  const c = { ...DEFAULTS.socialProof, ...content };

  return (
    <section className="bg-secondary-bg py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <EditableText section="socialProof" field="heading" value={c.heading} tag="h2" className="text-3xl font-light tracking-[0.02em] text-foreground sm:text-4xl lg:text-5xl" />
          <EditableText section="socialProof" field="subtext" value={c.subtext} tag="p" className="mt-3 text-sm text-muted/60 sm:mt-4 sm:text-base lg:text-lg" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-px bg-border sm:mt-16 sm:grid-cols-2">
          {(c.testimonials || []).map((t, i) => (
            <div key={i} className="bg-secondary-bg p-6 transition-all duration-300 hover:bg-surface sm:p-8">
              <div className="flex items-center gap-1 text-accent" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} className="h-3 w-3 fill-current sm:h-3.5 sm:w-3.5" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="thin-rule mt-5 mb-4 w-8" />
              <div>
                <p className="text-xs tracking-[0.15em] uppercase text-foreground/70">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted/40">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
