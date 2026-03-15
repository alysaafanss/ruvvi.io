"use client";

import { useState } from "react";
import Link from "next/link";

const CATEGORIES = [
  "All",
  "Hero",
  "Product",
  "Lifestyle",
  "Ingredients",
  "Social Proof",
];

const PLACEHOLDER_IMAGES = [
  { id: 1, name: "hero-product-tin.jpg", category: "Hero", size: "2.4 MB" },
  { id: 2, name: "hero-pouch-close.jpg", category: "Hero", size: "1.8 MB" },
  { id: 3, name: "tin-open-top.jpg", category: "Product", size: "1.2 MB" },
  { id: 4, name: "pouch-texture.jpg", category: "Product", size: "980 KB" },
  { id: 5, name: "pouch-scale-ref.jpg", category: "Product", size: "1.1 MB" },
  { id: 6, name: "tin-pocket-carry.jpg", category: "Product", size: "1.5 MB" },
  { id: 7, name: "lifestyle-date-night.jpg", category: "Lifestyle", size: "2.1 MB" },
  { id: 8, name: "lifestyle-nightlife.jpg", category: "Lifestyle", size: "1.9 MB" },
  { id: 9, name: "lifestyle-social.jpg", category: "Lifestyle", size: "2.3 MB" },
  { id: 10, name: "lifestyle-pocket.jpg", category: "Lifestyle", size: "1.4 MB" },
  { id: 11, name: "ingredient-citrulline.jpg", category: "Ingredients", size: "650 KB" },
  { id: 12, name: "ingredient-icariin.jpg", category: "Ingredients", size: "720 KB" },
  { id: 13, name: "ugc-testimonial-1.jpg", category: "Social Proof", size: "1.6 MB" },
  { id: 14, name: "ugc-testimonial-2.jpg", category: "Social Proof", size: "1.3 MB" },
];

function ImageCard({ image }) {
  return (
    <div className="group rounded-xl border border-border bg-background overflow-hidden transition-shadow hover:shadow-md">
      <div className="flex aspect-square items-center justify-center bg-secondary-bg">
        <svg
          className="h-10 w-10 text-muted/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
          />
        </svg>
      </div>
      <div className="p-4">
        <p className="truncate text-sm font-medium text-foreground">
          {image.name}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-foreground">
            {image.category}
          </span>
          <span className="text-xs text-muted">{image.size}</span>
        </div>
        <div className="mt-3 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            className="flex-1 rounded-lg bg-secondary-bg px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={`Replace ${image.name}`}
          >
            Replace
          </button>
          <button
            className="rounded-lg bg-secondary-bg px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            aria-label={`Delete ${image.name}`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border py-20">
      <svg
        className="h-12 w-12 text-muted/40"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
        />
      </svg>
      <p className="mt-4 text-sm font-medium text-foreground">No images yet</p>
      <p className="mt-1 text-xs text-muted">
        Upload images to get started.
      </p>
    </div>
  );
}

export default function AdminPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? PLACEHOLDER_IMAGES
      : PLACEHOLDER_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-lg font-medium tracking-[0.25em] text-foreground"
            >
              RUVVI
            </Link>
            <span className="text-muted">/</span>
            <h1 className="text-lg font-medium text-foreground">
              Media Gallery
            </h1>
          </div>
          <button
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors hover:bg-foreground/85 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            aria-label="Upload image"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Upload
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-secondary-bg text-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-4 text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? "image" : "images"}
        </div>

        <div className="mt-6">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {filtered.map((image) => (
                <ImageCard key={image.id} image={image} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
