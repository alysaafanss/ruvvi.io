const TESTIMONIALS = [
  {
    quote: "This is part of my routine before going out. Discreet, effective, no questions asked.",
    name: "James R.",
    detail: "Verified buyer",
  },
  {
    quote: "I keep one in my jacket pocket at all times. It\u2019s become my go-to confidence move.",
    name: "Marcus T.",
    detail: "Verified buyer",
  },
  {
    quote: "Finally something that doesn\u2019t feel embarrassing to carry. Looks like a mint tin.",
    name: "David K.",
    detail: "Verified buyer",
  },
  {
    quote: "The format is genius. No pills, no drinks, no awkward moments. Just ready when I am.",
    name: "Alex P.",
    detail: "Verified buyer",
  },
];

export default function SocialProof() {
  return (
    <section className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-[0.04em] text-foreground sm:text-4xl lg:text-5xl">
            Real experiences
          </h2>
          <p className="mt-3 text-sm text-muted sm:mt-4 sm:text-base lg:text-lg">
            From people who stay ready.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl bg-sage p-6 transition-all hover:bg-mint sm:rounded-3xl sm:p-8"
            >
              <div className="flex items-center gap-1 text-accent" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-3 text-sm font-medium leading-relaxed text-foreground sm:mt-4 sm:text-base">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-4 sm:mt-5">
                <p className="text-sm font-bold text-foreground">{testimonial.name}</p>
                <p className="mt-0.5 text-xs text-muted">{testimonial.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
