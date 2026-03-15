"use server";

import { createClient } from "@/lib/supabase/server";
import {
  ensureBucket,
  uploadImage,
  deleteImage,
  listImages,
  BUCKET,
} from "@/lib/supabase/storage";

export async function getImagesAction(category) {
  const supabase = await createClient();
  await ensureBucket(supabase);
  return listImages(supabase, category || null);
}

export async function uploadImageAction(formData) {
  const supabase = await createClient();
  await ensureBucket(supabase);

  const file = formData.get("file");
  const category = formData.get("category");

  if (!file || !category) {
    return { error: "File and category are required" };
  }

  try {
    const result = await uploadImage(supabase, file, category);
    return { success: true, ...result };
  } catch (err) {
    return { error: err.message || "Upload failed" };
  }
}

export async function deleteImageAction(path) {
  const supabase = await createClient();
  try {
    await deleteImage(supabase, path);
    return { success: true };
  } catch (err) {
    return { error: err.message || "Delete failed" };
  }
}

export async function getImagesByCategory(category) {
  const supabase = await createClient();
  const images = await listImages(supabase, category);
  return images.map((img) => img.url).filter(Boolean);
}
