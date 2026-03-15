const BUCKET = "images";

const CATEGORY_FOLDERS = {
  Hero: "hero",
  Carousel: "carousel",
  Product: "product",
  Lifestyle: "lifestyle",
  Ingredients: "ingredients",
  "Social Proof": "social-proof",
};

export { BUCKET, CATEGORY_FOLDERS };

export function getCategoryFolder(category) {
  return CATEGORY_FOLDERS[category] || category.toLowerCase().replace(/\s+/g, "-");
}

export function getPublicUrl(supabase, path) {
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return data?.publicUrl || null;
}

export async function ensureBucket(supabase) {
  const { data, error } = await supabase.storage.getBucket(BUCKET);
  if (data) return true;
  if (error?.message?.includes("not found") || error?.statusCode === "404") {
    const { error: createError } = await supabase.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
      allowedMimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"],
    });
    return !createError;
  }
  return false;
}

export async function uploadImage(supabase, file, category) {
  const folder = getCategoryFolder(category);
  const ext = file.name.split(".").pop();
  const safeName = file.name
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]/g, "-")
    .toLowerCase();
  const path = `${folder}/${safeName}-${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, { cacheControl: "3600", upsert: false });

  if (error) throw error;
  return { path: data.path, url: getPublicUrl(supabase, data.path) };
}

export async function deleteImage(supabase, path) {
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}

export async function listImages(supabase, category) {
  const folder = category ? getCategoryFolder(category) : null;

  if (folder) {
    const { data, error } = await supabase.storage
      .from(BUCKET)
      .list(folder, { sortBy: { column: "created_at", order: "desc" } });
    if (error) return [];
    return (data || [])
      .filter((f) => f.name && !f.name.startsWith("."))
      .map((f) => ({
        name: f.name,
        path: `${folder}/${f.name}`,
        category,
        size: f.metadata?.size || 0,
        createdAt: f.created_at,
        url: getPublicUrl(supabase, `${folder}/${f.name}`),
      }));
  }

  const allImages = [];
  for (const [cat, fold] of Object.entries(CATEGORY_FOLDERS)) {
    const { data } = await supabase.storage
      .from(BUCKET)
      .list(fold, { sortBy: { column: "created_at", order: "desc" } });
    if (data) {
      data
        .filter((f) => f.name && !f.name.startsWith("."))
        .forEach((f) => {
          allImages.push({
            name: f.name,
            path: `${fold}/${f.name}`,
            category: cat,
            size: f.metadata?.size || 0,
            createdAt: f.created_at,
            url: getPublicUrl(supabase, `${fold}/${f.name}`),
          });
        });
    }
  }
  return allImages.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
}

export function formatFileSize(bytes) {
  if (!bytes) return "—";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
