-- Enable RLS on core tables
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create generic authenticated policy for Properties
-- Allow authenticated users (backoffice admins) to do everything
CREATE POLICY "Enable all access for authenticated users on properties" 
ON properties 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Allow public read access to active properties (for website)
CREATE POLICY "Allow public read access on properties"
ON properties
FOR SELECT
TO public
USING (status = 'AVAILABLE' OR status = 'LANCAMENTO' OR status = 'USADO');


-- Leads Policies
CREATE POLICY "Enable all access for authenticated users on leads" 
ON leads 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- Allow public to insert leads (Contact forms)
CREATE POLICY "Allow public insert on leads"
ON leads
FOR INSERT
TO public
WITH CHECK (true);


-- Storage Policies (if not already set)
-- property-images bucket
-- INSERT INTO storage.buckets (id, name, public) VALUES ('property-images', 'property-images', true) ON CONFLICT DO NOTHING;

-- CREATE POLICY "Give public read access to property images"
-- ON storage.objects FOR SELECT
-- TO public
-- USING (bucket_id = 'property-images');

-- CREATE POLICY "Give authenticated users write access to property images"
-- ON storage.objects FOR INSERT
-- TO authenticated
-- WITH CHECK (bucket_id = 'property-images');
