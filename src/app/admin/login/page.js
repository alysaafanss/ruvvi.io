"use client";

import { useActionState, useEffect, useState } from "react";
import { setupPassword, loginWithPassword, isPasswordSet, isLoggedIn } from "./actions";
import { useRouter } from "next/navigation";

function SubmitButton({ label }) {
  return (
    <button
      type="submit"
      className="w-full rounded-xl bg-foreground py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-foreground/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
    >
      {label}
    </button>
  );
}

function SetupForm({ onSuccess }) {
  const [state, action] = useActionState(setupPassword, null);

  useEffect(() => {
    if (state?.success) onSuccess();
  }, [state, onSuccess]);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-foreground">
          Create password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          className="mt-1 block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          placeholder="Minimum 8 characters"
        />
      </div>
      <div>
        <label htmlFor="confirm" className="block text-sm font-semibold text-foreground">
          Confirm password
        </label>
        <input
          id="confirm"
          name="confirm"
          type="password"
          required
          minLength={8}
          className="mt-1 block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          placeholder="Re-enter password"
        />
      </div>
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}
      <SubmitButton label="Set Password & Enter" />
    </form>
  );
}

function LoginForm({ onSuccess }) {
  const [state, action] = useActionState(loginWithPassword, null);

  useEffect(() => {
    if (state?.success) onSuccess();
  }, [state, onSuccess]);

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-semibold text-foreground">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="mt-1 block w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-foreground placeholder:text-muted focus:border-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          placeholder="Enter admin password"
        />
      </div>
      {state?.error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{state.error}</p>
      )}
      <SubmitButton label="Log In" />
    </form>
  );
}

export default function AdminLoginPage() {
  const [hasPassword, setHasPassword] = useState(null);
  const router = useRouter();

  useEffect(() => {
    isLoggedIn().then((loggedIn) => {
      if (loggedIn) {
        router.replace("/admin");
        return;
      }
      isPasswordSet().then(setHasPassword);
    });
  }, [router]);

  function handleSuccess() {
    window.location.href = "/admin";
  }

  if (hasPassword === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <svg className="h-8 w-8 animate-spin text-foreground" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <h1 className="font-display text-3xl tracking-[0.15em] text-foreground">RUVVI</h1>
          <p className="mt-2 text-sm text-muted">
            {hasPassword ? "Enter your password to access the admin panel." : "Set up your admin password to get started."}
          </p>
        </div>
        <div className="mt-8 rounded-2xl border border-border bg-white p-6 shadow-sm">
          {hasPassword ? <LoginForm onSuccess={handleSuccess} /> : <SetupForm onSuccess={handleSuccess} />}
        </div>
      </div>
    </div>
  );
}
