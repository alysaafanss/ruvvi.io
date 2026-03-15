"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useEditor } from "./EditorProvider";
import PlaceholderImage from "@/components/PlaceholderImage";
import ImageCropper from "@/components/ImageCropper";
import { uploadImageAction } from "@/app/admin/actions";

export default function EditableImage({
  src,
  alt = "",
  category = "Hero",
  label = "Image",
  fill = false,
  width,
  height,
  className = "",
  containerClassName = "",
  aspectRatio = "aspect-square",
  sizes = "400px",
  onUploaded,
  children,
}) {
  const editor = useEditor();
  const [localSrc, setLocalSrc] = useState(null);
  const [cropSrc, setCropSrc] = useState(null);
  const [cropFile, setCropFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const categoryRef = useRef(category);

  const displaySrc = localSrc || src;

  const handleFileSelect = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCropFile(file);
    setCropSrc(URL.createObjectURL(file));
    e.target.value = "";
  }, []);

  const handleCrop = useCallback(
    async (croppedFile) => {
      const fileToUpload = croppedFile || cropFile;
      setCropSrc(null);
      setCropFile(null);

      setUploading(true);
      const formData = new FormData();
      formData.set("file", fileToUpload);
      formData.set("category", categoryRef.current);
      const result = await uploadImageAction(formData);
      setUploading(false);

      if (result.error) {
        alert(`Upload failed: ${result.error}`);
      } else {
        if (result.url) setLocalSrc(result.url);
        if (onUploaded) onUploaded(result.url);
      }
    },
    [cropFile, onUploaded]
  );

  if (children) {
    if (!editor) return children;

    return (
      <>
        <div
          className="group relative cursor-pointer"
          onClick={() => fileRef.current?.click()}
        >
          {children}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-foreground/0 transition-all group-hover:bg-foreground/50">
            <div className="flex flex-col items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
              {uploading ? (
                <svg className="h-8 w-8 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <>
                  <svg className="h-8 w-8 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                  </svg>
                  <span className="text-xs font-bold text-white drop-shadow-lg">Upload to {category}</span>
                </>
              )}
            </div>
          </div>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
        </div>
        {cropSrc && (
          <ImageCropper imageSrc={cropSrc} fileName={cropFile.name} onCrop={handleCrop} onCancel={() => { setCropSrc(null); setCropFile(null); }} />
        )}
      </>
    );
  }

  const imageElement = displaySrc ? (
    fill ? (
      <div className={`relative ${aspectRatio} w-full overflow-hidden ${containerClassName}`}>
        <Image src={displaySrc} alt={alt} fill className={`object-contain ${className}`} sizes={sizes} />
      </div>
    ) : (
      <div className={containerClassName}>
        <Image src={displaySrc} alt={alt} width={width || 800} height={height || 800} className={`h-auto w-full ${className}`} sizes={sizes} />
      </div>
    )
  ) : (
    <PlaceholderImage label={label} aspectRatio={aspectRatio} className={containerClassName} />
  );

  if (!editor) return imageElement;

  return (
    <>
      <div
        className="group relative cursor-pointer"
        onClick={() => fileRef.current?.click()}
      >
        {imageElement}
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-foreground/0 transition-all group-hover:bg-foreground/50">
          <div className="flex flex-col items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            {uploading ? (
              <svg className="h-8 w-8 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            ) : (
              <>
                <svg className="h-8 w-8 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
                </svg>
                <span className="text-xs font-bold text-white drop-shadow-lg">Upload to {category}</span>
              </>
            )}
          </div>
        </div>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileSelect} />
      </div>
      {cropSrc && (
        <ImageCropper imageSrc={cropSrc} fileName={cropFile.name} onCrop={handleCrop} onCancel={() => { setCropSrc(null); setCropFile(null); }} />
      )}
    </>
  );
}
