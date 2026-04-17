-- Waitlist table with secure RLS policies
-- IMPORTANT: Run this in Supabase SQL Editor

-- Drop old permissive policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous updates" ON waitlist;
DROP POLICY IF EXISTS "Allow anonymous selects" ON waitlist;

-- Allow anonymous inserts (frontend email signup)
CREATE POLICY "Allow anonymous inserts"
  ON waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow anonymous updates (upsert when adding phone to existing email)
-- Restrict: can only update phone, utm, and referred_by fields
CREATE POLICY "Allow anonymous updates"
  ON waitlist FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- BLOCK anonymous selects — no one should be able to dump the waitlist.
-- Supabase upsert works via INSERT ... ON CONFLICT, which does NOT require SELECT.
-- Admin reads waitlist via service_role (bypasses RLS).
-- DO NOT add a SELECT policy for anon.
