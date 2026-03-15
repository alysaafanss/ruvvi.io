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
    <section className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Real experiences
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            From people who stay ready.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-3xl bg-sage p-8 transition-all hover:bg-mint"
            >
              <div className="flex items-center gap-1 text-accent-dark" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="mt-4 text-base font-medium leading-relaxed text-foreground">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="mt-5">
                <p className="text-sm font-bold text-foreground">
                  {testimonial.name}
                </p>
                <p className="mt-0.5 text-xs text-muted">{testimonial.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
