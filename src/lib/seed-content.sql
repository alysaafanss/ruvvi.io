-- Create the page_content table
CREATE TABLE IF NOT EXISTS page_content (
  id TEXT PRIMARY KEY,
  content JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;

-- Allow public read
CREATE POLICY "Public read" ON page_content FOR SELECT USING (true);

-- Allow all writes (tighten later with auth)
CREATE POLICY "Allow writes" ON page_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow updates" ON page_content FOR UPDATE USING (true);
CREATE POLICY "Allow deletes" ON page_content FOR DELETE USING (true);

-- Auto-update timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON page_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();
