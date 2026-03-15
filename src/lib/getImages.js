import { createClient } from "@/lib/supabase/server";
import { listImages } from "@/lib/supabase/storage";

export async function getImagesByCategory(category) {
  try {
    const supabase = await createClient();
    const images = await listImages(supabase, category);
    return images.map((img) => ({ url: img.url, name: img.name }));
  } catch {
    return [];
  }
}

export async function getAllSectionImages() {
  try {
    const supabase = await createClient();
    const [hero, carousel, showcase, product, lifestyle, ingredients, socialProof] =
      await Promise.all([
        listImages(supabase, "Hero"),
        listImages(supabase, "Carousel"),
        listImages(supabase, "Showcase"),
        listImages(supabase, "Product"),
        listImages(supabase, "Lifestyle"),
        listImages(supabase, "Ingredients"),
        listImages(supabase, "Social Proof"),
      ]);

    return {
      hero: hero.map((i) => i.url),
      carousel: carousel.map((i) => i.url),
      showcase: showcase.map((i) => i.url),
      product: product.map((i) => i.url),
      lifestyle: lifestyle.map((i) => i.url),
      ingredients: ingredients.map((i) => ({ url: i.url, name: i.name })),
      socialProof: socialProof.map((i) => i.url),
    };
  } catch {
    return {
      hero: [],
      carousel: [],
      showcase: [],
      product: [],
      lifestyle: [],
      ingredients: [],
      socialProof: [],
    };
  }
}
