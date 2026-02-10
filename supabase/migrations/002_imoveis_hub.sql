-- 002: Imoveis Hub - novas colunas e tabelas
-- Executar no Supabase SQL Editor

-- 1. Novas colunas em developments
ALTER TABLE developments ADD COLUMN IF NOT EXISTS tipo TEXT DEFAULT 'apartamento' CHECK (tipo IN ('apartamento','casa','flat','lote','comercial','resort'));
ALTER TABLE developments ADD COLUMN IF NOT EXISTS status_comercial TEXT DEFAULT 'rascunho' CHECK (status_comercial IN ('rascunho','publicado','campanha','privado'));
ALTER TABLE developments ADD COLUMN IF NOT EXISTS pais TEXT DEFAULT 'Brasil';
ALTER TABLE developments ADD COLUMN IF NOT EXISTS publico_alvo TEXT;
ALTER TABLE developments ADD COLUMN IF NOT EXISTS argumentos_venda JSONB DEFAULT '[]';
ALTER TABLE developments ADD COLUMN IF NOT EXISTS tipologias TEXT;
ALTER TABLE developments ADD COLUMN IF NOT EXISTS metragem TEXT;
ALTER TABLE developments ADD COLUMN IF NOT EXISTS quartos TEXT;
ALTER TABLE developments ADD COLUMN IF NOT EXISTS suites TEXT;
ALTER TABLE developments ADD COLUMN IF NOT EXISTS vagas TEXT;
ALTER TABLE developments ADD COLUMN IF NOT EXISTS leads_count INT DEFAULT 0;
ALTER TABLE developments ADD COLUMN IF NOT EXISTS score INT DEFAULT 0;
ALTER TABLE developments ADD COLUMN IF NOT EXISTS created_by TEXT;
ALTER TABLE developments ADD COLUMN IF NOT EXISTS updated_by TEXT;

-- 2. Tracked links para campanhas
CREATE TABLE IF NOT EXISTS tracked_links (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    development_id UUID REFERENCES developments(id) ON DELETE CASCADE,
    channel TEXT NOT NULL CHECK (channel IN ('instagram','google','whatsapp','email','linkedin','tiktok','other')),
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    short_code TEXT UNIQUE NOT NULL,
    clicks INT DEFAULT 0,
    leads_generated INT DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE tracked_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_all_tracked_links" ON tracked_links FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 3. Timeline de eventos do imovel
CREATE TABLE IF NOT EXISTS development_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    development_id UUID REFERENCES developments(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL CHECK (event_type IN ('criado','publicado','campanha_iniciada','primeiro_lead','pico_interesse','queda_interesse','ajuste_preco','vendido','pausado','atualizado')),
    description TEXT,
    metadata JSONB DEFAULT '{}',
    created_by TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE development_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "auth_all_dev_events" ON development_events FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4. Funcao para calcular score do imovel (0-100)
CREATE OR REPLACE FUNCTION calculate_development_score(dev_id UUID)
RETURNS INT AS $$
DECLARE
    s INT := 0;
    dev RECORD;
BEGIN
    SELECT * INTO dev FROM developments WHERE id = dev_id;
    IF NOT FOUND THEN RETURN 0; END IF;
    -- Cadastro basico completo
    IF dev.name IS NOT NULL AND dev.name != '' THEN s := s + 10; END IF;
    IF dev.description IS NOT NULL AND dev.description != '' THEN s := s + 10; END IF;
    IF dev.short_description IS NOT NULL AND dev.short_description != '' THEN s := s + 5; END IF;
    -- Midia
    IF dev.images IS NOT NULL AND (dev.images->>'main') != '' THEN s := s + 15; END IF;
    IF dev.images IS NOT NULL AND jsonb_array_length(COALESCE(dev.images->'gallery', '[]'::jsonb)) > 0 THEN s := s + 10; END IF;
    IF dev.images IS NOT NULL AND jsonb_array_length(COALESCE(dev.images->'videos', '[]'::jsonb)) > 0 THEN s := s + 10; END IF;
    IF dev.images IS NOT NULL AND jsonb_array_length(COALESCE(dev.images->'floorPlans', '[]'::jsonb)) > 0 THEN s := s + 10; END IF;
    -- Dados comerciais
    IF dev.price_min IS NOT NULL AND dev.price_min > 0 THEN s := s + 10; END IF;
    IF dev.developer IS NOT NULL AND dev.developer != '' THEN s := s + 5; END IF;
    -- Interesse
    IF dev.leads_count > 0 THEN s := s + 5; END IF;
    IF dev.leads_count > 5 THEN s := s + 5; END IF;
    IF dev.leads_count > 20 THEN s := s + 5; END IF;
    RETURN LEAST(s, 100);
END;
$$ LANGUAGE plpgsql;

-- 5. Atualizar score de todos os developments existentes
UPDATE developments SET score = calculate_development_score(id);

-- 6. Atualizar leads_count baseado em leads existentes
UPDATE developments d SET leads_count = (
    SELECT COUNT(*) FROM leads l WHERE l.development_id = d.id
);
