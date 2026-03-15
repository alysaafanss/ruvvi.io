"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { getImagesAction, uploadImageAction, deleteImageAction } from "../actions";
import { formatFileSize } from "@/lib/supabase/storage";
import ImageCropper from "@/components/ImageCropper";

const CATEGORIES = [
  "All",
  "Hero",
  "Carousel",
  "Showcase",
  "Product",
  "Lifestyle",
  "Ingredients",
  "Social Proof",
];

const UPLOAD_CATEGORIES = CATEGORIES.filter((c) => c !== "All");

function ImageCard({ image, onDelete }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete ${image.name}?`)) return;
    setDeleting(true);
    const result = await deleteImageAction(image.path);
    if (result.success) {
      onDelete(image.path);
    } else {
      alert(result.error);
    }
    setDeleting(false);
  }

  return (
    <div className="group overflow-hidden rounded-2xl bg-white transition-shadow hover:shadow-lg">
      <div className="relative aspect-square bg-sage">
        {image.url ? (
          <Image
            src={image.url}
            alt={image.name}
            fill
            className="object-contain"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg className="h-10 w-10 text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <p className="truncate text-sm font-medium text-foreground">{image.name}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-mint px-2.5 py-0.5 text-xs font-semibold text-foreground">
            {image.category}
          </span>
          <span className="text-xs text-muted">{formatFileSize(image.size)}</span>
        </div>
        <div className="mt-3">
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="w-full rounded-xl bg-sage px-3 py-1.5 text-xs font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
            aria-label={`Delete ${image.name}`}
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

function UploadZone({ onUploadComplete }) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [category, setCategory] = useState("Hero");
  const [cropFile, setCropFile] = useState(null);
  const [cropSrc, setCropSrc] = useState(null);
  const fileRef = useRef(null);
  const pendingFilesRef = useRef([]);
  const categoryRef = useRef("Hero");

  function handleCategoryChange(value) {
    setCategory(value);
    categoryRef.current = value;
  }

  function openCropper(file) {
    const url = URL.createObjectURL(file);
    setCropFile(file);
    setCropSrc(url);
  }

  function startCropFlow(files) {
    if (!files?.length) return;
    pendingFilesRef.current = Array.from(files).slice(1);
    openCropper(files[0]);
  }

  async function handleCropDone(croppedFile) {
    const fileToUpload = croppedFile || cropFile;
    const uploadCategory = categoryRef.current;
    setCropFile(null);
    setCropSrc(null);

    setUploading(true);
    const formData = new FormData();
    formData.set("file", fileToUpload);
    formData.set("category", uploadCategory);
    const result = await uploadImageAction(formData);
    if (result.error) {
      alert(`Upload failed: ${result.error}`);
    }
    setUploading(false);

    if (pendingFilesRef.current.length > 0) {
      const next = pendingFilesRef.current.shift();
      openCropper(next);
    } else {
      onUploadComplete();
    }
  }

  function handleCropCancel() {
    setCropFile(null);
    setCropSrc(null);
    pendingFilesRef.current = [];
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragOver(false);
    startCropFlow(Array.from(e.dataTransfer.files));
  }

  return (
    <>
      <div className="rounded-3xl border-2 border-dashed border-border bg-white/50 p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
          <div className="flex-1">
            <label className="text-sm font-semibold text-foreground" htmlFor="upload-category">
              Upload to category
            </label>
            <select
              id="upload-category"
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="mt-1 block w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-medium text-foreground focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            >
              {UPLOAD_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div
            className={`flex flex-1 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 transition-all ${
              dragOver
                ? "border-foreground bg-mint/50"
                : "border-border hover:border-foreground/50 hover:bg-sage"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Drop files here or click to upload"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") fileRef.current?.click();
            }}
          >
            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => startCropFlow(Array.from(e.target.files))}
            />
            {uploading ? (
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 animate-spin text-foreground" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="text-sm font-semibold text-foreground">Uploading...</span>
              </div>
            ) : (
              <>
                <svg className="h-8 w-8 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                </svg>
                <p className="mt-2 text-sm font-semibold text-foreground">
                  Drop images here or click to browse
                </p>
                <p className="mt-1 text-xs text-muted">
                  JPG, PNG, WebP, AVIF up to 10MB
                </p>
                <p className="mt-2 rounded-full bg-foreground/10 px-3 py-1 text-xs font-bold text-foreground">
                  Uploading to: {category}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {cropSrc && (
        <ImageCropper
          imageSrc={cropSrc}
          fileName={cropFile.name}
          onCrop={handleCropDone}
          onCancel={handleCropCancel}
        />
      )}
    </>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-border py-20">
      <svg className="h-12 w-12 text-muted/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z" />
      </svg>
      <p className="mt-4 text-sm font-semibold text-foreground">No images in this category</p>
      <p className="mt-1 text-xs text-muted">Upload images above to get started.</p>
    </div>
  );
}

export default function AdminPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    const data = await getImagesAction(
      activeCategory === "All" ? null : activeCategory
    );
    setImages(data);
    setLoading(false);
  }, [activeCategory]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  function handleDelete(path) {
    setImages((prev) => prev.filter((img) => img.path !== path));
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="font-display text-lg tracking-wide text-white"
            >
              RUVVI
            </Link>
            <span className="text-white/30">/</span>
            <h1 className="font-display text-lg tracking-wide text-white">
              Media Gallery
            </h1>
          </div>
          <Link
            href="/"
            className="rounded-full border-2 border-white/30 px-5 py-2 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
          >
            View site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
        <UploadZone onUploadComplete={fetchImages} />

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <div className="rounded-2xl bg-sage p-1 inline-flex flex-wrap gap-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground ${
                  activeCategory === cat
                    ? "bg-white text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 text-sm text-muted">
          {loading ? "Loading..." : `${images.length} ${images.length === 1 ? "image" : "images"}`}
          {activeCategory === "Carousel" && (
            <span className="ml-2 text-xs text-accent">
              These images appear in the hero animated carousel
            </span>
          )}
        </div>

        <div className="mt-6">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <svg className="h-8 w-8 animate-spin text-foreground" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
          ) : images.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {images.map((image) => (
                <ImageCard
                  key={image.path}
                  image={image}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
