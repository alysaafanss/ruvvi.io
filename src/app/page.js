"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { SmokeBackground } from "@/components/ui/spooky-smoke-animation";

/* ─── helpers ─── */

function getUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm = {};
  for (const key of ["utm_source", "utm_medium", "utm_campaign"]) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }
  return utm;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function formatPhone(raw) {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 0) return "";
  if (digits.length <= 3) return `(${digits}`;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/* ─── Supabase waitlist subscribe ─── */

async function subscribeToWaitlist({ email, phone, referredBy }) {
  const utm = getUtmParams();
  const supabase = createClient();

  const row = {
    email,
    utm_source: utm.utm_source || null,
    utm_medium: utm.utm_medium || null,
    utm_campaign: utm.utm_campaign || null,
    referred_by: referredBy || null,
  };

  if (phone) {
    row.phone = `+1${phone.replace(/\D/g, "")}`;
  }

  try {
    const { error } = await supabase.from("waitlist").upsert(row, { onConflict: "email" });

    if (error) {
      console.error("Waitlist insert failed:", error.message, error.details, error.hint);
    }

    if (typeof window !== "undefined") {
      if (window.gtag) {
        window.gtag("event", email && !phone ? "email_signup" : "phone_signup", {
          event_category: "waitlist",
        });
      }
      if (window.fbq) window.fbq("track", "Lead");
      if (window.ttq) window.ttq.track("SubmitForm");
    }

    return { ok: !error };
  } catch {
    return { ok: false };
  }
}

/* ─── Social icons ─── */

function TikTokIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
    </svg>
  );
}

/* ─── Value Proposition Dot ─── */

function CopperDot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shrink-0" />;
}

/* ─── Main Page Component ─── */

export default function ComingSoon() {
  const [step, setStep] = useState("email"); // "email" | "phone" | "done"
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [shaking, setShaking] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const inputRef = useRef(null);
  const phoneRef = useRef(null);

  useEffect(() => {
    if (step === "phone" && phoneRef.current) {
      phoneRef.current.focus();
    }
  }, [step]);

  function triggerShake() {
    setShaking(true);
    setTimeout(() => setShaking(false), 300);
  }

  async function handleEmailSubmit(e) {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Please enter a valid email.");
      triggerShake();
      return;
    }

    setLoading(true);
    await subscribeToWaitlist({ email, phone: null });
    setLoading(false);

    // Transition to phone step
    setTransitioning(true);
    setTimeout(() => {
      setStep("phone");
      setTransitioning(false);
    }, 300);
  }

  async function handlePhoneSubmit(e) {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10) {
      setError("Please enter a valid phone number.");
      triggerShake();
      return;
    }

    setLoading(true);
    await subscribeToWaitlist({ email, phone });
    setLoading(false);

    setTransitioning(true);
    setTimeout(() => {
      setStep("done");
      setTransitioning(false);
    }, 300);
  }

  function handleSkip() {
    setTransitioning(true);
    setTimeout(() => {
      setStep("done");
      setTransitioning(false);
    }, 300);
  }

  const VALUE_PROPS = [
    "Clinically Dosed",
    "Felt in 30 Minutes",
    "No Prescription Needed",
  ];

  return (
    <div className="cs-bg relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden px-5 sm:px-6"
      style={{ background: "#000000" }}
    >
      {/* Smoke animation background */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-60">
        <SmokeBackground smokeColor="#9A6B45" />
      </div>

      {/* Subtle grain/noise texture at 2-3% opacity */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />

      {/* ── Content container ── */}
      <div className="relative z-10 flex w-full max-w-[520px] flex-col items-center text-center">

        {/* Logo — approved bold wordmark */}
        <div className="cs-logo">
          <Image
            src="/ruvvi-logo.png"
            alt="RUVVI"
            width={693}
            height={137}
            priority
            sizes="220px"
            className="w-[45vw] max-w-[220px] h-auto sm:w-[220px]"
          />
        </div>

        {/* Headline */}
        <h2 className="cs-headline mt-8 text-[32px] font-semibold leading-[1.1] tracking-[0.03em] text-foreground sm:mt-12 sm:text-[56px] md:text-[64px]">
          For the night ahead.
        </h2>

        {/* Subheadline */}
        <p className="cs-sub mt-3 max-w-[500px] text-[16px] font-normal leading-[1.5] text-muted sm:mt-5 sm:text-[20px]">
          Sexual wellness, reimagined.
        </p>

        {/* ── Form area ── */}
        <div className={`cs-form mt-8 w-full sm:mt-10 ${transitioning ? "step-exit" : step !== "email" ? "step-enter" : ""}`}>

          {/* Step 1: Email */}
          {step === "email" && (
            <form onSubmit={handleEmailSubmit} className="w-full" noValidate>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    placeholder="Enter your email"
                    autoComplete="email"
                    className={`h-[50px] w-full bg-transparent px-4 text-[16px] text-foreground placeholder-muted outline-none transition-colors duration-200 border ${shaking ? "shake" : ""} ${error ? "border-error" : "border-border focus:border-accent"} rounded-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="h-[50px] shrink-0 bg-accent-dark px-6 text-[14px] font-medium uppercase tracking-[0.1em] text-[#000000] transition-all duration-200 hover:bg-accent hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 rounded-none sm:px-8 sm:text-[15px]"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-1">
                      <span className="animate-pulse">.</span>
                      <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>.</span>
                      <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>.</span>
                    </span>
                  ) : (
                    "Get Early Access"
                  )}
                </button>
              </div>
              {error && (
                <p className="mt-2 text-left text-[13px] text-error">{error}</p>
              )}
            </form>
          )}

          {/* Step 2: Phone */}
          {step === "phone" && (
            <div className="w-full">
              <p className="mb-4 text-[18px] font-medium text-foreground sm:text-[20px]">
                Want a text when we launch?
              </p>

              <form onSubmit={handlePhoneSubmit} className="w-full" noValidate>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
                  <div className="relative flex-1">
                    <input
                      ref={phoneRef}
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatPhone(e.target.value));
                        setError("");
                      }}
                      placeholder="Phone number"
                      autoComplete="tel"
                      className={`h-[50px] w-full bg-transparent px-4 text-[16px] text-foreground placeholder-muted outline-none transition-colors duration-200 border ${shaking ? "shake" : ""} ${error ? "border-error" : "border-border focus:border-accent"} rounded-none`}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="h-[50px] shrink-0 bg-accent-dark px-6 text-[14px] font-medium uppercase tracking-[0.1em] text-[#000000] transition-all duration-200 hover:bg-accent hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100 rounded-none sm:px-8 sm:text-[15px]"
                  >
                    {loading ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>.</span>
                        <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>.</span>
                      </span>
                    ) : (
                      "Notify Me"
                    )}
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-left text-[13px] text-error">{error}</p>
                )}
                <p className="mt-2 text-[12px] text-muted">US/CA numbers only. We&apos;ll text you once.</p>
              </form>
              <button
                onClick={handleSkip}
                className="mt-3 text-[13px] font-normal text-muted underline-offset-2 transition-colors duration-200 hover:text-foreground hover:underline"
              >
                Skip
              </button>
            </div>
          )}

          {/* Step 3: Confirmation */}
          {step === "done" && (
            <div className="w-full">
              <p className="text-[28px] font-semibold tracking-[0.02em] text-foreground sm:text-[32px]">
                You&apos;re in.
              </p>
              <p className="mt-2 text-[16px] font-normal text-muted sm:text-[18px]">
                We&apos;ll let you know before anyone else.
              </p>
              <div className="mt-6">
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="https://tiktok.com/@ruvvi.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center text-accent transition-colors duration-200 hover:text-accent-light"
                    aria-label="TikTok"
                  >
                    <TikTokIcon className="h-5 w-5" />
                  </a>
                  <a
                    href="https://instagram.com/ruvvi.co"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-10 w-10 items-center justify-center text-accent transition-colors duration-200 hover:text-accent-light"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Value Propositions ── */}
        <div className="cs-props mt-10 w-full max-w-[600px] sm:mt-12">
          {/* Desktop: horizontal row with dividers */}
          <div className="hidden items-center justify-center sm:flex">
            {VALUE_PROPS.map((prop, i) => (
              <div key={prop} className="flex items-center">
                {i > 0 && <div className="mx-5 h-4 w-px bg-border" />}
                <span className="text-[15px] font-medium tracking-[0.05em] text-foreground">
                  {prop}
                </span>
              </div>
            ))}
          </div>
          {/* Mobile: stacked with dividers */}
          <div className="flex flex-col items-center gap-0 sm:hidden">
            {VALUE_PROPS.map((prop, i) => (
              <div key={prop} className="flex flex-col items-center">
                {i > 0 && <div className="my-2.5 h-px w-12 bg-border" />}
                <span className="text-[14px] font-medium tracking-[0.05em] text-foreground">
                  {prop}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="absolute bottom-0 left-0 right-0 px-5 py-5 text-center sm:px-6">
        {step !== "done" && (
          <div className="flex items-center justify-center gap-4">
            <a
              href="https://tiktok.com/@ruvvi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center text-accent transition-colors duration-200 hover:text-accent-light"
              aria-label="TikTok"
            >
              <TikTokIcon className="h-4 w-4" />
            </a>
            <a
              href="https://instagram.com/ruvvi.co"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center text-accent transition-colors duration-200 hover:text-accent-light"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>
        )}
        <div className="mt-2 flex items-center justify-center gap-4 text-[11px] text-muted sm:text-[12px]">
          <span>&copy; {new Date().getFullYear()} Ruvvi. All rights reserved.</span>
          <a href="/privacy" className="transition-colors duration-200 hover:text-foreground">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
