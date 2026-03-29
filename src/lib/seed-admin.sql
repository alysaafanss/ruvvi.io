CREATE TABLE IF NOT EXISTS admin_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE admin_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read" ON admin_settings FOR SELECT USING (true);
CREATE POLICY "Allow insert" ON admin_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update" ON admin_settings FOR UPDATE USING (true);
