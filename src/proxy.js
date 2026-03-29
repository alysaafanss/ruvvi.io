import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

const SESSION_COOKIE = "admin_session";

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  // --- Admin route protection ---
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get(SESSION_COOKIE)?.value;
    const secret = process.env.ADMIN_SESSION_SECRET || "";
    if (!token || !secret || token !== secret) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // --- Supabase session refresh ---
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl?.startsWith("http")) {
    return NextResponse.next();
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  await supabase.auth.getClaims();

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
