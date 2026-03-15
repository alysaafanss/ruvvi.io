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
    <div className="border-b border-border">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-foreground pr-4">
          {question}
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          open ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-sm leading-relaxed text-muted">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Questions? We&apos;ve got answers.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Everything you need to know about RUVVI.
          </p>
        </div>

        <div className="mt-12">
          {QUESTIONS.map((q) => (
            <FAQItem key={q.question} question={q.question} answer={q.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}
