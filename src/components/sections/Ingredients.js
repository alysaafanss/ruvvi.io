"use client";

import { useState, useCallback, useRef } from "react";
import Image from "next/image";
import AddToCartButton from "@/components/AddToCartButton";
import PlaceholderImage from "@/components/PlaceholderImage";
import EditableText from "@/components/editor/EditableText";
import EditableImage from "@/components/editor/EditableImage";
import { DEFAULTS } from "@/lib/content-defaults";

function getIdx(i, len) {
  return ((i % len) + len) % len;
}

function IngredientImage({ src, label, className = "" }) {
  return (
    <EditableImage category="Ingredients" label={label} aspectRatio="aspect-square" containerClassName={className}>
      {src ? (
        <div className={`relative aspect-square w-full overflow-hidden ${className}`}>
          <Image src={src} alt={label} fill className="object-contain" sizes="(max-width: 640px) 80vw, 400px" />
        </div>
      ) : (
        <PlaceholderImage label={label} aspectRatio="aspect-square" className={className} />
      )}
    </EditableImage>
  );
}

export default function Ingredients({ content = {}, ingredientImages = [] }) {
  const c = { ...DEFAULTS.ingredients, ...content };
  const items = c.ingredients || [];
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState("right");
  const touchRef = useRef(null);

  const go = useCallback((dir) => {
    setDirection(dir);
    setCurrent((prev) => dir === "right" ? getIdx(prev + 1, items.length) : getIdx(prev - 1, items.length));
  }, [items.length]);

  const onTouchStart = useCallback((e) => { touchRef.current = e.touches[0].clientX; }, []);
  const onTouchEnd = useCallback((e) => {
    if (touchRef.current === null) return;
    const diff = touchRef.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) go(diff > 0 ? "right" : "left");
    touchRef.current = null;
  }, [go]);

  if (items.length === 0) return null;

  const prevIdx = getIdx(current - 1, items.length);
  const nextIdx = getIdx(current + 1, items.length);
  const ingredient = items[current];
  const slideClass = direction === "right" ? "slide-from-right" : "slide-from-left";

  return (
    <section id="ingredients" className="bg-background py-20 sm:py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="text-center">
          <EditableText section="ingredients" field="heading" value={c.heading} tag="h2" className="font-display text-3xl tracking-[0.04em] text-foreground sm:text-4xl lg:text-5xl" />
          <div className="mt-4 flex items-center justify-center gap-2">
            {items.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > current ? "right" : "left"); setCurrent(i); }}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${i === current ? "w-8 bg-foreground" : "w-2 bg-foreground/20 hover:bg-foreground/40"}`}
                aria-label={`Go to ${items[i].name}`} />
            ))}
          </div>
        </div>

        <div className="relative mt-12 sm:mt-16" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          <div className="flex items-center justify-center gap-4 sm:gap-8 lg:gap-12">
            <button onClick={() => go("left")} className="hidden w-40 shrink-0 cursor-pointer opacity-30 transition-all duration-300 hover:opacity-50 sm:block lg:w-52" aria-label="Previous">
              <IngredientImage src={ingredientImages[prevIdx]?.url} label={items[prevIdx].name} className="rounded-2xl scale-90" />
            </button>
            <div key={`img-${current}`} className={`w-full max-w-xs sm:max-w-sm shrink-0 ${slideClass}`}>
              <IngredientImage src={ingredientImages[current]?.url} label={ingredient.name} className="rounded-3xl" />
            </div>
            <button onClick={() => go("right")} className="hidden w-40 shrink-0 cursor-pointer opacity-30 transition-all duration-300 hover:opacity-50 sm:block lg:w-52" aria-label="Next">
              <IngredientImage src={ingredientImages[nextIdx]?.url} label={items[nextIdx].name} className="rounded-2xl scale-90" />
            </button>
          </div>

          <button onClick={() => go("left")} className="absolute left-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-white text-foreground transition-all hover:bg-foreground hover:text-white active:scale-90 focus:outline-none sm:left-2 sm:h-12 sm:w-12" aria-label="Previous">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" /></svg>
          </button>
          <button onClick={() => go("right")} className="absolute right-0 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-foreground bg-foreground text-white transition-all hover:bg-foreground/85 active:scale-90 focus:outline-none sm:right-2 sm:h-12 sm:w-12" aria-label="Next">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" /></svg>
          </button>
        </div>

        <div key={`text-${current}`} className="fade-up mx-auto mt-8 max-w-lg text-center sm:mt-10">
          <p className="font-display text-xs tracking-[0.12em] text-muted">{ingredient.category}</p>
          <h3 className="mt-2 font-display text-2xl tracking-[0.04em] text-foreground sm:text-3xl lg:text-4xl">{ingredient.name}</h3>
          <p className="mt-4 text-sm leading-relaxed text-foreground sm:text-base"><span className="font-bold">Main benefits: </span>{ingredient.benefits}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base"><span className="font-bold text-foreground">How it works: </span>{ingredient.origin}</p>
        </div>

        <div className="mt-10 flex justify-center">
          <AddToCartButton className="inline-flex items-center rounded-full border-[3px] border-foreground bg-foreground px-8 py-3.5 font-display text-sm tracking-[0.1em] text-white transition-all hover:bg-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:px-10 sm:py-4">
            <EditableText section="ingredients" field="buttonText" value={c.buttonText} tag="span" />
          </AddToCartButton>
        </div>
      </div>
    </section>
  );
}
