"use client";

import { logout } from "@/app/admin/login/actions";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="rounded-full border-2 border-white/30 px-5 py-2 text-sm font-semibold text-white transition-all hover:border-white hover:bg-white/10"
      >
        Logout
      </button>
    </form>
  );
}
