"use client";

import { useState } from "react";

const QUESTIONS = [
  {
    question: "How fast does it work?",
    answer:
      "Most users feel the effects within 15\u201330 minutes. Sublingual absorption allows the active ingredients to enter your system faster than traditional pills or capsules.",
  },
  {
    question: "How many can I use per day?",
    answer:
      "We recommend starting with one pouch to assess your response. You can use up to two pouches per day. Do not exceed the recommended daily intake.",
  },
  {
    question: "Does it contain nicotine?",
    answer:
      "No. RUVVI pouches contain zero nicotine. While the format is similar to nicotine pouches, our formula uses only performance-focused botanical and amino acid ingredients.",
  },
  {
    question: "How discreet is it?",
    answer:
      "Completely discreet. The pouch sits comfortably under your upper lip and is virtually invisible. The tin looks like a premium mint container.",
  },
  {
    question: "What flavor is available?",
    answer:
      "We\u2019re launching with Mint \u2014 a clean, subtle flavor that\u2019s pleasant and not overpowering. Additional flavors are coming soon.",
  },
  {
    question: "Can I subscribe?",
    answer:
      "Yes. Subscribe and save 15% on every order. You can skip, pause, or cancel your subscription at any time with no commitment.",
  },
];

function FAQItem({ question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-3xl bg-sage transition-all hover:bg-mint">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-dark focus-visible:ring-offset-2 rounded-3xl sm:p-8"
        aria-expanded={open}
      >
        <span className="font-display text-base font-bold text-foreground pr-4 sm:text-lg">
          {question}
        </span>
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-foreground/10 transition-transform duration-200 ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg
            className="h-4 w-4 text-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <p className="px-6 pb-6 text-sm leading-relaxed text-muted sm:px-8 sm:pb-8 sm:text-base">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="bg-background py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Got questions?
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Everything you need to know about RUVVI.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-3">
          {QUESTIONS.map((q) => (
            <FAQItem key={q.question} question={q.question} answer={q.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
