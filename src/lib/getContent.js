import { createClient } from "@/lib/supabase/server";
import { DEFAULTS } from "@/lib/content-defaults";

export { DEFAULTS };

function deepMerge(defaults, overrides) {
  if (!overrides) return defaults;
  const result = { ...defaults };
  for (const key of Object.keys(overrides)) {
    if (overrides[key] !== undefined && overrides[key] !== null) {
      result[key] = overrides[key];
    }
  }
  return result;
}

export async function getAllContent() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("page_content")
      .select("id, content");

    if (error || !data) return { ...DEFAULTS };

    const merged = { ...DEFAULTS };
    for (const row of data) {
      if (merged[row.id]) {
        merged[row.id] = deepMerge(DEFAULTS[row.id], row.content);
      } else {
        merged[row.id] = row.content;
      }
    }
    return merged;
  } catch {
    return { ...DEFAULTS };
  }
}
