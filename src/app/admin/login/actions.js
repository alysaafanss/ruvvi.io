"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  hashPassword,
  verifyPassword,
  SESSION_COOKIE,
  SESSION_TOKEN,
  SESSION_COOKIE_OPTIONS,
} from "@/lib/admin-auth";

/* ── Rate limiter (in-memory, per-IP) ── */
const LOGIN_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 5;
const loginAttempts = new Map(); // ip -> { count, firstAttempt }

async function getClientIp() {
  const hdrs = await headers();
  return hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

function checkRateLimit(ip) {
  const now = Date.now();
  const record = loginAttempts.get(ip);

  if (!record || now - record.firstAttempt > LOGIN_WINDOW_MS) {
    loginAttempts.set(ip, { count: 1, firstAttempt: now });
    return true;
  }

  if (record.count >= MAX_ATTEMPTS) {
    return false; // blocked
  }

  record.count++;
  return true;
}

function resetRateLimit(ip) {
  loginAttempts.delete(ip);
}

/* ── Helpers ── */

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
  const ip = await getClientIp();
  if (!checkRateLimit(ip)) {
    return { error: "Too many attempts. Please wait 15 minutes." };
  }

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

  resetRateLimit(ip);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, SESSION_TOKEN, SESSION_COOKIE_OPTIONS);
  return { success: true };
}

export async function loginWithPassword(_prev, formData) {
  const ip = await getClientIp();
  if (!checkRateLimit(ip)) {
    return { error: "Too many attempts. Please wait 15 minutes." };
  }

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
    // Don't reveal whether the password or account is wrong
    return { error: "Invalid password." };
  }

  resetRateLimit(ip);
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
