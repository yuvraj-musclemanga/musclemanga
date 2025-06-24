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

export async function getFullCatalogue() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return data;
}

export async function getTopFromCollection(collection: string) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("collection", collection)
    .limit(4)
    .order("orderedby", { ascending: true });

  if (error) {
    console.error("Supabase error:", error.message);
    return [];
  }

  return data;
}
