-- Run this in Supabase SQL Editor to fix RLS policies on the waitlist table.
-- The table already exists — this just adds the missing permissions.

-- Drop any existing policies to start clean
drop policy if exists "Allow anonymous inserts" on waitlist;
drop policy if exists "Allow anonymous updates" on waitlist;
drop policy if exists "Allow anonymous selects" on waitlist;

-- Allow anonymous inserts (frontend email signup)
create policy "Allow anonymous inserts" on waitlist
  for insert
  to anon
  with check (true);

-- Allow anonymous updates (upsert when adding phone to existing email)
create policy "Allow anonymous updates" on waitlist
  for update
  to anon
  using (true)
  with check (true);

-- Allow anonymous selects (needed for upsert conflict check + admin page)
create policy "Allow anonymous selects" on waitlist
  for select
  to anon
  using (true);
