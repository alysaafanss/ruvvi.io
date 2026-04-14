import Link from "next/link";

export const metadata = {
  title: "Privacy Policy — RUVVI",
  description: "RUVVI privacy policy. How we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background px-5 py-16 sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="text-[13px] font-normal tracking-[0.05em] text-muted transition-colors duration-200 hover:text-foreground"
        >
          &larr; Back
        </Link>

        <h1 className="mt-8 text-3xl font-semibold tracking-[0.02em] text-foreground sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-2 text-[13px] text-muted">Last updated: April 13, 2025</p>

        <div className="mt-10 flex flex-col gap-8 text-[15px] leading-relaxed text-muted">
          <section>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground">
              1. Information We Collect
            </h2>
            <p>
              When you join our waitlist, we collect your email address and, optionally, your phone
              number. We also collect UTM parameters from the URL you arrived from to understand how
              you found us. We do not collect payment information, passwords, or sensitive personal
              data at this time.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground">
              2. How We Use Your Information
            </h2>
            <p>We use your information to:</p>
            <ul className="mt-2 list-inside list-disc space-y-1">
              <li>Notify you when RUVVI launches</li>
              <li>Send you a one-time SMS if you opted in</li>
              <li>Understand where our audience comes from (via UTM data)</li>
              <li>Improve our website and marketing</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground">
              3. Third-Party Services
            </h2>
            <p>
              We use Supabase to store waitlist data, and may use Google Analytics, Meta Pixel, and
              TikTok Pixel to understand website traffic. These services may collect anonymous usage
              data such as page views and device type. We do not sell your personal information to
              third parties.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground">
              4. Data Storage & Security
            </h2>
            <p>
              Your data is stored securely via Supabase with row-level security policies. We use
              HTTPS for all data transmission. While no method of transmission over the internet is
              100% secure, we take reasonable steps to protect your information.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground">
              5. Your Rights
            </h2>
            <p>
              You may request to view, update, or delete your personal data at any time by contacting
              us at{" "}
              <a href="mailto:privacy@ruvvi.co" className="text-accent transition-colors duration-200 hover:text-accent-light">
                privacy@ruvvi.co
              </a>
              . We will respond to all requests within 30 days.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground">
              6. Cookies
            </h2>
            <p>
              We may use cookies or similar tracking technologies for analytics purposes. You can
              control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground">
              7. Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. Any changes will be posted on this
              page with an updated revision date.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.15em] text-foreground">
              8. Contact
            </h2>
            <p>
              If you have questions about this policy, contact us at{" "}
              <a href="mailto:privacy@ruvvi.co" className="text-accent transition-colors duration-200 hover:text-accent-light">
                privacy@ruvvi.co
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
