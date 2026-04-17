"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { isLoggedIn } from "@/app/admin/login/actions";

async function requireAdmin() {
  const authed = await isLoggedIn();
  if (!authed) throw new Error("Unauthorized");
}

export async function saveContentAction(sectionId, content) {
  await requireAdmin();
  const supabase = createAdminClient();

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
  await requireAdmin();
  const supabase = createAdminClient();
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
