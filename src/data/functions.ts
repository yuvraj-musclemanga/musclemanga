import { supabase } from "./supabaseClient";

export async function getProduct(id: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return data;
}

export async function getFullCatalogue(collection: string) {
  const { data, error } =
    collection === ""
      ? await supabase.from("products").select("*")
      : await supabase
          .from("products")
          .select("*")
          .eq("collection", collection);

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return data;
}

export async function getTopFromCollection(
  collection: string,
  limit: number = 4
) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("collection", collection)
    .limit(limit)
    .order("orderedby", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return data;
}

export async function getWishlist(email: string) {
  const { data, error } = await supabase
    .from("wishlists")
    .select("wishlist")
    .eq("id", email);

  if (error) {
    console.log("Supabase error:", error.message);
    return [];
  }

  return data;
}
