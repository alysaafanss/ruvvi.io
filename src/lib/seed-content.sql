-- Page content table (editable CMS content)
-- IMPORTANT: Run this in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS page_content (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Drop old permissive policies
DROP POLICY IF EXISTS "Public read" ON page_content;
DROP POLICY IF EXISTS "Allow writes" ON page_content;
DROP POLICY IF EXISTS "Allow updates" ON page_content;
DROP POLICY IF EXISTS "Allow deletes" ON page_content;

-- Public can read content (needed for the website to render)
CREATE POLICY "Public read"
  ON page_content FOR SELECT
  USING (true);

-- Only authenticated/service_role can write.
-- Since admin uses server actions, writes go through service_role.
-- Block anon from INSERT/UPDATE/DELETE entirely.
CREATE POLICY "Service role can insert"
  ON page_content FOR INSERT
  TO authenticated, service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update"
  ON page_content FOR UPDATE
  TO authenticated, service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Service role can delete"
  ON page_content FOR DELETE
  TO authenticated, service_role
  USING (true);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON page_content;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON page_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
