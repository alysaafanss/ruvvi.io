"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import AddToCartButton from "@/components/AddToCartButton";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";
import { DEFAULTS } from "@/lib/content-defaults";

export default function HowItWorks({ content = {}, images = [] }) {
  const c = { ...DEFAULTS.showcase, ...content };
  const [activeTab, setActiveTab] = useState((c.tabs || [])[0] || "ALL");
  const scrollRef = useRef(null);

  function scrollRight() {
    scrollRef.current?.scrollBy({ left: 340, behavior: "smooth" });
  }

  function scrollLeft() {
    scrollRef.current?.scrollBy({ left: -340, behavior: "smooth" });
  }

  return (
    <section id="how-it-works" className="bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <EditableText section="showcase" field="heading" value={c.heading} tag="h2" className="font-display text-4xl font-light tracking-[0.02em] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl" />
        </div>

        <div className="mt-8 flex items-center justify-center gap-8 sm:mt-10">
          {(c.tabs || []).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-xs tracking-[0.2em] uppercase transition-colors duration-300 sm:text-sm ${
                activeTab === tab ? "text-foreground" : "text-foreground/25 hover:text-foreground/50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="relative mt-10 sm:mt-14">
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto px-5 pb-4 sm:gap-6 sm:px-6 lg:px-8"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {(c.products || []).map((product, i) => (
            <div key={i} className="flex w-[300px] shrink-0 flex-col border border-border bg-secondary-bg sm:w-[360px] lg:w-[400px]">
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-3xl font-light tracking-[0.02em] text-foreground sm:text-4xl lg:text-5xl">
                  {product.name}
                </h3>
                <div className="thin-rule mt-4 mb-4" />
                <p className="text-sm leading-relaxed text-muted sm:text-base">
                  {product.description}
                </p>
              </div>
              <div className="mt-auto px-4 pb-4 sm:px-6 sm:pb-6">
                <EditableImage
                  category="Showcase"
                  label={product.tag}
                  aspectRatio="aspect-[4/3]"
                  containerClassName="w-full"
                >
                  {images[i] ? (
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image src={images[i]} alt={product.name} fill className="object-contain" sizes="400px" />
                    </div>
                  ) : (
                    <PlaceholderImage label={product.tag} className="w-full" aspectRatio="aspect-[4/3]" />
                  )}
                </EditableImage>
              </div>
            </div>
          ))}

          <div className="flex w-[200px] shrink-0 flex-col items-center justify-center border border-dashed border-border sm:w-[240px]">
            <AddToCartButton className="flex flex-col items-center gap-3 p-8 text-center">
              <div className="flex h-12 w-12 items-center justify-center border border-foreground/30 text-foreground/50">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-xs tracking-[0.2em] uppercase text-foreground/50">
                {c.shopAllText || "SHOP ALL"}
              </span>
            </AddToCartButton>
          </div>
        </div>

        <button onClick={scrollLeft} className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center border border-border bg-secondary-bg h-10 w-10 text-foreground/50 transition-all duration-300 hover:bg-surface hover:text-foreground sm:flex sm:left-4 sm:h-12 sm:w-12" aria-label="Scroll left">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        </button>
        <button onClick={scrollRight} className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center border border-border bg-accent h-10 w-10 text-background transition-all duration-300 hover:bg-accent-dark sm:flex sm:right-4 sm:h-12 sm:w-12" aria-label="Scroll right">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        </button>
      </div>
    </section>
  );
}
