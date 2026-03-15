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
          <EditableText section="showcase" field="heading" value={c.heading} tag="h2" className="font-display text-4xl tracking-[0.04em] text-foreground sm:text-5xl lg:text-6xl xl:text-7xl" />
        </div>

        <div className="mt-8 flex items-center justify-center gap-6 sm:mt-10">
          {(c.tabs || []).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`font-display text-sm tracking-[0.12em] transition-colors sm:text-base lg:text-lg ${
                activeTab === tab ? "text-foreground" : "text-foreground/30 hover:text-foreground/60"
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
            <div key={i} className="flex w-[300px] shrink-0 flex-col rounded-2xl border-2 border-border bg-white/50 sm:w-[360px] sm:rounded-3xl lg:w-[400px]">
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-4xl tracking-[0.04em] text-foreground sm:text-5xl lg:text-6xl">
                  {product.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
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
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl sm:rounded-2xl">
                      <Image src={images[i]} alt={product.name} fill className="object-contain" sizes="400px" />
                    </div>
                  ) : (
                    <PlaceholderImage label={product.tag} className="w-full" aspectRatio="aspect-[4/3]" />
                  )}
                </EditableImage>
              </div>
            </div>
          ))}

          <div className="flex w-[200px] shrink-0 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border sm:w-[240px] sm:rounded-3xl">
            <AddToCartButton className="flex flex-col items-center gap-3 p-8 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-foreground text-foreground">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="font-display text-lg tracking-[0.1em] text-foreground">
                {c.shopAllText || "SHOP ALL"}
              </span>
            </AddToCartButton>
          </div>
        </div>

        <button onClick={scrollLeft} className="absolute left-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border-2 border-foreground bg-white h-10 w-10 text-foreground shadow-md hover:bg-foreground hover:text-white transition-all sm:flex sm:left-4 sm:h-12 sm:w-12" aria-label="Scroll left">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
        </button>
        <button onClick={scrollRight} className="absolute right-2 top-1/2 hidden -translate-y-1/2 items-center justify-center rounded-full border-2 border-foreground bg-foreground h-10 w-10 text-white shadow-md hover:bg-foreground/85 transition-all sm:flex sm:right-4 sm:h-12 sm:w-12" aria-label="Scroll right">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
        </button>
      </div>
    </section>
  );
}
