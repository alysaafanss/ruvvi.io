"use client";

import { useState } from "react";
import EditableText from "@/components/editor/EditableText";
import { DEFAULTS } from "@/lib/content-defaults";

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-accent sm:py-6 lg:py-7"
        aria-expanded={open}
      >
        <span className="text-sm tracking-[0.05em] text-foreground/80 pr-4 sm:text-base">
          {question}
        </span>
        <div className={`flex h-6 w-6 shrink-0 items-center justify-center text-muted/40 transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ${open ? "max-h-96" : "max-h-0"}`}>
        <p className="pb-5 text-sm leading-relaxed text-muted/60 sm:pb-6 sm:text-base lg:pb-7">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ({ content = {} }) {
  const c = { ...DEFAULTS.faq, ...content };

  return (
    <section id="faq" className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <EditableText section="faq" field="heading" value={c.heading} tag="h2" className="text-3xl font-light tracking-[0.02em] text-foreground sm:text-4xl lg:text-5xl" />
          <EditableText section="faq" field="subtext" value={c.subtext} tag="p" className="mt-3 text-sm text-muted/60 sm:mt-4 sm:text-base lg:text-lg" />
        </div>

        <div className="mt-10 border-t border-border sm:mt-12">
          {(c.questions || []).map((q, i) => (
            <FAQItem key={i} question={q.question} answer={q.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
