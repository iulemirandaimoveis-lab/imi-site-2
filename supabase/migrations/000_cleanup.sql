-- ============================================================================
-- Migration 000: Base Normalization
-- Descrição: Normaliza tabelas existentes para suportar o Sistema Comercial IA
-- ============================================================================

DO $$ 
BEGIN
    -- 1. Normalizar LEADS (converter ID para UUID e colunas para snake_case)
    BEGIN
        ALTER TABLE leads ALTER COLUMN id SET DATA TYPE UUID USING (id::uuid);
    EXCEPTION WHEN OTHERS THEN NULL;
    END;

    -- Renomear colunas camelCase para snake_case (Prisma standard -> Supabase standard)
    BEGIN
        ALTER TABLE leads RENAME COLUMN "userId" TO user_id;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;

    BEGIN
        ALTER TABLE leads RENAME COLUMN "createdAt" TO created_at;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;

    BEGIN
        ALTER TABLE leads RENAME COLUMN "updatedAt" TO updated_at;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;

    BEGIN
        ALTER TABLE leads RENAME COLUMN "leadSource" TO source;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;


    -- 2. Corrigir erro de digitação da migration 001 (caso exista)
    BEGIN
        ALTER TABLE leads ALTER COLUMN updated_at SET DATA TYPE TIMESTAMPTZ;
    EXCEPTION WHEN OTHERS THEN NULL;
    END;

    -- 3. Limpar políticas redundantes da 001 para evitar erros
    DROP POLICY IF EXISTS "auth_all_leads" ON leads;
    DROP POLICY IF EXISTS "anon_insert_leads" ON leads;
    DROP POLICY IF EXISTS "auth_all_developments" ON developments;
    DROP POLICY IF EXISTS "auth_all_units" ON development_units;
    DROP POLICY IF EXISTS "auth_all_consultations" ON consultations;
    DROP POLICY IF EXISTS "auth_all_credit" ON credit_requests;
    DROP POLICY IF EXISTS "auth_all_appraisals" ON appraisal_requests;
    DROP POLICY IF EXISTS "anon_insert_consultations" ON consultations;
    DROP POLICY IF EXISTS "anon_insert_credit" ON credit_requests;
    DROP POLICY IF EXISTS "anon_insert_appraisals" ON appraisal_requests;
END $$;
