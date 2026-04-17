-- Admin settings table (stores password hash)
-- IMPORTANT: Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

-- Drop old permissive policies
DROP POLICY IF EXISTS "Allow read" ON admin_settings;
DROP POLICY IF EXISTS "Allow insert" ON admin_settings;
DROP POLICY IF EXISTS "Allow update" ON admin_settings;

-- Only allow read from server-side (service_role bypasses RLS).
-- Anon users should NEVER read the password hash.
-- Allow anon SELECT only for login verification (password_hash key only).
CREATE POLICY "Anon can read password hash"
  ON admin_settings FOR SELECT
  TO anon
  USING (key = 'password_hash');

-- Allow anon insert ONLY if no password_hash exists yet (first-time setup)
CREATE POLICY "Anon can setup password once"
  ON admin_settings FOR INSERT
  TO anon
  WITH CHECK (
    key = 'password_hash'
    AND NOT EXISTS (SELECT 1 FROM admin_settings WHERE key = 'password_hash')
  );

-- Allow anon update for password_hash only
CREATE POLICY "Anon can update password"
  ON admin_settings FOR UPDATE
  TO anon
  USING (key = 'password_hash')
  WITH CHECK (key = 'password_hash');

-- No DELETE policy — password hash cannot be deleted via API
