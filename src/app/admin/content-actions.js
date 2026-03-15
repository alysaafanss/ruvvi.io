"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function saveContentAction(sectionId, content) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("page_content")
    .upsert(
      { id: sectionId, content, updated_at: new Date().toISOString() },
      { onConflict: "id" }
    );

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}

export async function saveBulkContentAction(changes) {
  const supabase = await createClient();
  const rows = Object.entries(changes).map(([id, content]) => ({
    id,
    content,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("page_content")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/");
  return { success: true };
}
