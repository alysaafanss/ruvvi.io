"use client";

import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";

const ASPECT_RATIOS = [
  { label: "Free", value: null },
  { label: "1:1", value: 1 },
  { label: "4:5", value: 4 / 5 },
  { label: "3:2", value: 3 / 2 },
  { label: "16:9", value: 16 / 9 },
  { label: "9:16", value: 9 / 16 },
];

function createCroppedImage(imageSrc, pixelCrop) {
  return new Promise((resolve) => {
    const image = new window.Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
      canvas.toBlob(
        (blob) => resolve(blob),
        "image/jpeg",
        0.92
      );
    };
    image.src = imageSrc;
  });
}

export default function ImageCropper({ imageSrc, fileName, onCrop, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspectIdx, setAspectIdx] = useState(0);
  const [processing, setProcessing] = useState(false);

  const aspect = ASPECT_RATIOS[aspectIdx].value;

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  async function handleCrop() {
    if (!croppedAreaPixels) return;
    setProcessing(true);
    const blob = await createCroppedImage(imageSrc, croppedAreaPixels);
    const ext = fileName.split(".").pop() || "jpg";
    const safeName = fileName.replace(/\.[^/.]+$/, "");
    const file = new File([blob], `${safeName}.${ext}`, { type: "image/jpeg" });
    onCrop(file);
    setProcessing(false);
  }

  function handleSkip() {
    onCrop(null);
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4">
      <div className="flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-xl tracking-wide text-foreground">
            CROP IMAGE
          </h3>
          <button
            onClick={onCancel}
            className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100 focus:outline-none"
            aria-label="Cancel"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="relative h-[400px] bg-gray-900">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="flex flex-col gap-4 px-6 py-5">
          <div>
            <label className="mb-2 block text-xs font-semibold text-foreground">
              Aspect Ratio
            </label>
            <div className="flex flex-wrap gap-2">
              {ASPECT_RATIOS.map((ar, i) => (
                <button
                  key={ar.label}
                  onClick={() => setAspectIdx(i)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                    i === aspectIdx
                      ? "bg-foreground text-white"
                      : "bg-sage text-foreground hover:bg-mint"
                  }`}
                >
                  {ar.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold text-foreground" htmlFor="zoom-slider">
              Zoom
            </label>
            <input
              id="zoom-slider"
              type="range"
              min={1}
              max={3}
              step={0.05}
              value={zoom}
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-foreground"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSkip}
              className="flex-1 rounded-full border-2 border-foreground px-6 py-3 text-sm font-bold text-foreground transition-all hover:bg-foreground/5"
            >
              Upload Original
            </button>
            <button
              onClick={handleCrop}
              disabled={processing}
              className="flex-1 rounded-full border-[3px] border-foreground bg-foreground px-6 py-3 text-sm font-bold text-white transition-all hover:bg-foreground/90 disabled:opacity-50"
            >
              {processing ? "Processing..." : "Crop & Upload"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
