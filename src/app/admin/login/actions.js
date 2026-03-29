"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  hashPassword,
  verifyPassword,
  SESSION_COOKIE,
  SESSION_TOKEN,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/admin-auth";

async function getPasswordHash() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("admin_settings")
    .select("value")
    .eq("key", "password_hash")
    .single();
  return data?.value || null;
}

export async function isPasswordSet() {
  const hash = await getPasswordHash();
  return !!hash;
}

export async function setupPassword(_prev, formData) {
  const password = formData.get("password");
  const confirm = formData.get("confirm");

  if (!password || password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password !== confirm) {
    return { error: "Passwords do not match." };
  }

  const existing = await getPasswordHash();
  if (existing) {
    return { error: "Password is already set. Please log in instead." };
  }

  const hash = hashPassword(password);
  const supabase = await createClient();
  const { error } = await supabase
    .from("admin_settings")
    .insert({ key: "password_hash", value: hash });

  if (error) {
    return { error: "Failed to save password. Make sure the admin_settings table exists." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_TOKEN, SESSION_COOKIE_OPTIONS);
  return { success: true };
}

export async function loginWithPassword(_prev, formData) {
  const password = formData.get("password");
  if (!password) {
    return { error: "Please enter your password." };
  }

  const hash = await getPasswordHash();
  if (!hash) {
    return { error: "No password set. Please refresh the page." };
  }

  const valid = verifyPassword(password, hash);
  if (!valid) {
    return { error: "Invalid password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_TOKEN, SESSION_COOKIE_OPTIONS);
  return { success: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

export async function isLoggedIn() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  return !!token && token === SESSION_TOKEN;
}
