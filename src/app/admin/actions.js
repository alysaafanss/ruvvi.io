"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isLoggedIn } from "@/app/admin/login/actions";
import {
  ensureBucket,
  uploadImage,
  deleteImage,
  listImages,
} from "@/lib/supabase/storage";

async function requireAdmin() {
  const authed = await isLoggedIn();
  if (!authed) throw new Error("Unauthorized");
}

export async function getImagesAction(category) {
  await requireAdmin();
  const supabase = createAdminClient();
  await ensureBucket(supabase);
  return listImages(supabase, category || null);
}

export async function uploadImageAction(formData) {
  await requireAdmin();
  const supabase = createAdminClient();
  await ensureBucket(supabase);

  const file = formData.get("file");
  const category = formData.get("category");

  if (!file || !category) {
    return { error: "File and category are required" };
  }

  try {
    const result = await uploadImage(supabase, file, category);
    revalidatePath("/");
    return { success: true, category, ...result };
  } catch (err) {
    return { error: err.message || "Upload failed" };
  }
}

export async function deleteImageAction(path) {
  await requireAdmin();
  const supabase = createAdminClient();
  try {
    await deleteImage(supabase, path);
    revalidatePath("/");
    return { success: true };
  } catch (err) {
    return { error: err.message || "Delete failed" };
  }
}

export async function getImagesByCategory(category) {
  await requireAdmin();
  const supabase = createAdminClient();
  const images = await listImages(supabase, category);
  return images.map((img) => img.url).filter(Boolean);
}
