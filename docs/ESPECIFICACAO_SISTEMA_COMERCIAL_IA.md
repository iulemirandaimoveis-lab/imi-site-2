# ESPECIFICAÇÃO TÉCNICA: SISTEMA OPERACIONAL COMERCIAL COM IA
**Sistema Multi-Tenant para Marketing, Vendas e Relacionamento**  
**Cliente Principal: IMI - Inteligência Imobiliária**  
**Produto Replicável: Connectar SaaS Platform**  

**Data**: 2026-02-08  
**Versão**: 1.0 - Especificação Fechada  
**Disciplina**: Arquitetura limpa, controle de escopo, zero abstrações vagas

---

## 1. DIAGNÓSTICO DO BACKOFFICE ATUAL

### 1.1 Infraestrutura Existente

**Stack Técnico Validado:**
- **Framework**: Next.js 14 (App Router)
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL via Supabase
- **Autenticação**: Supabase Auth
- **ORM**: Prisma Client
- **Armazenamento**: Supabase Storage (bucket: media)
- **Real-time**: SWR para cache e revalidação
- **UI**: TailwindCSS + Framer Motion
- **Charts**: Recharts
- **Deploy**: Vercel (produção ativa)

**Domínios de Dados Já Modelados:**
1. `developments` - Empreendimentos imobiliários
2. `development_units` - Unidades específicas
3. `developers` - Construtoras/incorporadoras
4. `leads` - Contatos captados
5. `consultations` - Solicitações de consultoria
6. `credit_requests` - Simulações de crédito
7. `appraisal_requests` - Avaliações solicitadas
8. `pages` - Conteúdo institucional
9. `activity_logs` - Auditoria de ações
10. `users` - Usuários do backoffice (ADMIN, EDITOR, VIEWER)

**Módulos Funcionais Implementados:**
- ✅ **Dashboard Analítico**: KPIs, gráficos de crescimento, atividade recente
- ✅ **Gestão de Leads**: Listagem, filtros, status pipeline, drawer de detalhes, WhatsApp direto
- ✅ **Gestão de Imóveis**: CRUD completo, upload de mídia, vínculo com construtoras
- ✅ **Gestão de Construtoras**: Cadastro, logos, dados corporativos
- ✅ **Gestão de Conteúdo**: Páginas institucionais editáveis, SEO
- ✅ **Autenticação**: Login seguro, RLS policies, roles
- ✅ **Logs de Auditoria**: Rastreamento de ações críticas

**Website Público Ativo:**
- ✅ Institucional multi-idioma (pt, en, ja)
- ✅ Portal de imóveis com filtros avançados
- ✅ Formulários de captura integrados ao backoffice
- ✅ Deploy contínuo (GitHub → Vercel)

### 1.2 Gaps Identificados para Sistema Operacional Comercial

#### Não Existe:
1. **Planejamento e geração de conteúdo com IA**
2. **Automação de postagens em redes sociais**
3. **Consolidação e análise de campanhas de Ads**
4. **CRM avançado com IA prescritiva**
5. **Playbooks parametrizáveis por nicho**
6. **Relatórios executivos automatizados**
7. **Multi-tenancy real (1 backoffice serve N clientes)**
8. **Parametrização por nicho de mercado**
9. **Integrações com Meta, Google, LinkedIn, TikTok, WhatsApp Business API**
10. **Motor de IA para qualificação, recomendação e resposta automática**

#### Estado Atual vs. Estado Desejado:

| Dimensão | Atual | Desejado |
|----------|-------|----------|
| **Operador Humano** | Múltiplos (marketing, vendas, ads, atendimento) | **1 operador único** |
| **Geração de Conteúdo** | Manual, externo | **Claude gera conteúdo aprovável** |
| **Publicação** | Manual via Meta Business Suite | **Agendamento automático multi-canal** |
| **Ads** | Dashboards externos (Meta/Google) | **Consolidado + recomendações IA** |
| **Atendimento** | Reativo manual | **IA sugere respostas + follow-ups** |
| **Replicabilidade** | Hardcoded para imóveis | **Parametrável para qualquer nicho** |
| **Relatórios** | Planilhas manuais | **Geração automática executiva** |

---

## 2. ARQUITETURA GERAL DO SISTEMA EVOLUÍDO

### 2.1 Princípios Arquiteturais Invioláveis

1. **Separação IA / Execução**: Claude **NUNCA** executa ações automaticamente. Apenas planeja, sugere, gera texto/prompts.
2. **Aprovação Humana Obrigatória**: Toda publicação, campanha ou ação crítica exige aprovação explícita do operador.
3. **Multi-Tenant Nativo**: Cada cliente IMI/Connectar tem workspace isolado com configurações próprias.
4. **Parametrização por Nicho**: Zero hardcoding de "imóveis". Tudo configurável via `tenant_settings` e `niche_playbooks`.
5. **Auditoria Total**: Todo input de IA, toda aprovação, toda publicação é logada com timestamp, user_id e dados completos.
6. **IA como Camada de Serviço**: Claude via API (Anthropic Claude 3.5 Sonnet), Gemini via Vertex AI para imagens.
7. **Sem Refatoração do Core**: Módulos novos são **acoplados** ao backoffice existente, não substituem nada.

### 2.2 Diagrama de Módulos (Visão de Alto Nível)

```
┌─────────────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js 14)                         │
│  ┌───────────────┬────────────────┬────────────────────────┐   │
│  │ Backoffice    │ Public Website │ API Routes             │   │
│  │ (existente +  │ (existente)    │ (/api/ai, /api/publish,│   │
│  │  novos mods)  │                │  /api/ads, /api/crm)   │   │
│  └───────────────┴────────────────┴────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              CAMADA DE SERVIÇOS / WORKERS                       │
│  ┌──────────────┬──────────────┬──────────────┬─────────────┐  │
│  │ AI Service   │ Publish      │ Ads Sync     │ CRM Engine  │  │
│  │ (Claude API) │ Worker       │ Worker       │ (IA +       │  │
│  │ (Gemini API) │ (N8N/cron)   │ (N8N/cron)   │  regras)    │  │
│  └──────────────┴──────────────┴──────────────┴─────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  BANCO DE DADOS (Supabase)                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ ESQUEMAS EXISTENTES:                                     │  │
│  │ • developments, leads, users, developers, pages...       │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ ESQUEMAS NOVOS:                                          │  │
│  │ • tenants (multi-tenant)                                 │  │
│  │ • niche_playbooks (parametrização)                       │  │
│  │ • content_calendar (planejamento)                        │  │
│  │ • content_items (posts gerados)                          │  │
│  │ • content_variants (versões por canal)                   │  │
│  │ • publish_queue (fila de publicação)                     │  │
│  │ • publish_logs (histórico)                               │  │
│  │ • ad_campaigns (consolidação de ads)                     │  │
│  │ • ad_insights (métricas)                                 │  │
│  │ • crm_interactions (histórico IA + humano)               │  │
│  │ • crm_suggestions (recomendações IA pendentes)           │  │
│  │ • reports (relatórios executivos gerados)                │  │
│  │ • ai_requests (logs de chamadas Claude/Gemini)           │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│              INTEGRAÇÕES EXTERNAS (APIs)                        │
│  ┌────────────┬────────────┬────────────┬──────────────────┐   │
│  │ Meta Graph │ Google Ads │ LinkedIn   │ WhatsApp Business│   │
│  │ API        │ API        │ API        │ API              │   │
│  ├────────────┼────────────┼────────────┼──────────────────┤   │
│  │ TikTok     │ Anthropic  │ Vertex AI  │ N8N Workflows    │   │
│  │ Marketing  │ Claude API │ (Gemini)   │ (orquestração)   │   │
│  │ API        │            │            │                  │   │
│  └────────────┴────────────┴────────────┴──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

### 2.3 Fluxo de Dados End-to-End (Exemplo: Geração de Conteúdo)

```
1. OPERADOR: Define brief mensal no módulo "Conteúdos"
   └─► Input: nicho, identidade visual, tom de voz, público, ofertas, datas, restrições legais
   
2. SISTEMA: Envia brief estruturado para Claude API
   └─► Claude retorna: planejamento de 30 dias (tópicos, datas sugeridas, mix de conteúdo)
   
3. OPERADOR: Aprova/ajusta planejamento
   └─► Status do calendario: "approved"
   
4. SISTEMA: Para cada item do calendário, aciona Claude novamente
   └─► Claude gera: legenda, CTA, hashtags, prompt de imagem, variações (Instagram/Facebook/LinkedIn/TikTok)
   
5. SISTEMA: Envia prompts de imagem para Gemini (Vertex AI)
   └─► Gemini retorna: URLs de imagens geradas (salvas no Supabase Storage)
   
6. OPERADOR: Revisa conteúdo + imagem, aprova para agendamento
   └─► Status: "scheduled"
   
7. WORKER (N8N/Cron): No datetime agendado, publica via Meta Graph API
   └─► Logs: publish_logs (sucesso/erro), atualiza status para "published"
   
8. RESULTADO: Conteúdo no ar, histórico completo auditável
```

---

## 3. MODELO DE DADOS DOS NOVOS MÓDULOS

### 3.1 Multi-Tenancy Core

```sql
-- TENANTS: Cada cliente do Connectar (ou workspace da IMI)
CREATE TABLE tenants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,  -- ex: "imi-inteligencia-imobiliaria"
    name TEXT NOT NULL,          -- ex: "IMI - Inteligência Imobiliária"
    
    -- Nicho
    niche TEXT NOT NULL,         -- ex: "real_estate", "aesthetics", "auto"
    playbook_id UUID REFERENCES niche_playbooks(id),
    
    -- Identidade Visual
    brand_colors JSONB DEFAULT '{"primary":"#...", "secondary":"#..."}',
    brand_fonts JSONB DEFAULT '{"heading":"...", "body":"..."}',
    brand_logo_url TEXT,
    
    -- Tom de Voz
    tone_of_voice TEXT,          -- ex: "técnico, autoridade, educador"
    
    -- Público
    target_audience JSONB DEFAULT '[]',  -- ["investidores", "compradores_primeira_casa"]
    
    -- Configurações de IA
    ai_provider TEXT DEFAULT 'anthropic',
    ai_model TEXT DEFAULT 'claude-3-5-sonnet-20241022',
    ai_temperature DECIMAL(3,2) DEFAULT 0.7,
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    subscription_tier TEXT DEFAULT 'professional',  -- starter, professional, enterprise
    
    -- Auditoria
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- NICHE_PLAYBOOKS: Templates reutilizáveis por nicho
CREATE TABLE niche_playbooks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,  -- ex: "real_estate_brazil"
    name TEXT NOT NULL,
    niche TEXT NOT NULL,
    
    -- Linguagem Padrão
    default_language JSONB DEFAULT '{"greetings":[], "objections":[], "CTAs":[]}',
    
    -- Públicos Típicos
    typical_audiences JSONB DEFAULT '[]',
    
    -- Restrições Legais
    legal_restrictions TEXT,  -- ex: "Não mencionar ROI garantido, seguir Lei 8.078/90"
    
    -- Estrutura de Campanhas
    campaign_templates JSONB DEFAULT '[]',
    
    -- Versão
    version INT DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- TENANT_USERS: Usuários vinculados a cada tenant (multi-tenant)
CREATE TABLE tenant_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'operator' CHECK (role IN ('owner', 'admin', 'operator', 'viewer')),
    
    UNIQUE(tenant_id, user_id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.2 Módulo Conteúdos

```sql
-- CONTENT_CALENDAR: Planejamento mensal
CREATE TABLE content_calendar (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Período
    month INT NOT NULL,  -- 1-12
    year INT NOT NULL,
    
    -- Brief Estruturado
    objectives TEXT[],           -- ["aumentar_awareness", "gerar_leads"]
    offers JSONB DEFAULT '[]',   -- [{"title":"Lançamento X", "date":"2026-03-15"}]
    strategic_dates JSONB DEFAULT '[]',  -- [{"date":"2026-03-08", "event":"Dia da Mulher"}]
    legal_restrictions TEXT,
    
    -- Planejamento Gerado pela IA
    ai_plan JSONB,  -- Estrutura completa retornada pelo Claude
    ai_request_id UUID REFERENCES ai_requests(id),
    
    -- Status
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'ai_generated', 'approved', 'active', 'archived')),
    
    -- Aprovação
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(tenant_id, month, year)
);

-- CONTENT_ITEMS: Posts individuais
CREATE TABLE content_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    calendar_id UUID REFERENCES content_calendar(id) ON DELETE CASCADE,
    
    -- Conteúdo
    topic TEXT NOT NULL,
    content_type TEXT NOT NULL CHECK (content_type IN ('post', 'story', 'video_script', 'carousel')),
    
    -- Base Content (para adaptar por canal)
    base_copy TEXT,
    base_cta TEXT,
    hashtags TEXT[],
    
    -- Mídia
    image_prompt TEXT,  -- Prompt enviado ao Gemini
    image_url TEXT,     -- URL final da imagem gerada
    media_urls JSONB DEFAULT '[]',  -- Múltiplas imagens/vídeos
    
    -- Agendamento
    scheduled_date DATE,
    scheduled_time TIME,
    
    -- Status
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'ai_generated', 'image_generated', 'approved', 'scheduled', 'published', 'failed')),
    
    -- Aprovação
    approved_by UUID REFERENCES auth.users(id),
    approved_at TIMESTAMPTZ,
    
    -- Logs de IA
    ai_request_ids UUID[],  -- Múltiplas chamadas (texto, imagem, etc)
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- CONTENT_VARIANTS: Adaptações por canal
CREATE TABLE content_variants (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content_item_id UUID REFERENCES content_items(id) ON DELETE CASCADE,
    
    -- Canal
    platform TEXT NOT NULL CHECK (platform IN ('instagram_feed', 'instagram_story', 'facebook', 'linkedin', 'tiktok', 'whatsapp')),
    
    -- Adaptações
    adapted_copy TEXT,
    adapted_cta TEXT,
    adapted_hashtags TEXT[],
    character_count INT,
    
    -- Mídia específica (crop, aspect ratio)
    media_url TEXT,
    aspect_ratio TEXT,  -- "1:1", "9:16", "16:9"
    
    -- Gerado por IA
    ai_request_id UUID REFERENCES ai_requests(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(content_item_id, platform)
);
```

### 3.3 Módulo Automação de Postagens

```sql
-- SOCIAL_ACCOUNTS: Contas conectadas
CREATE TABLE social_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Plataforma
    platform TEXT NOT NULL CHECK (platform IN ('meta', 'linkedin', 'tiktok', 'whatsapp_business')),
    account_name TEXT NOT NULL,  -- Nome amigável
    
    -- Credenciais Criptografadas
    access_token_encrypted TEXT NOT NULL,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMPTZ,
    
    -- IDs externos
    platform_account_id TEXT,  -- Instagram Business Account ID, LinkedIn Organization ID, etc
    platform_page_id TEXT,     -- Facebook Page ID, etc
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    last_auth_check TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(tenant_id, platform, platform_account_id)
);

-- PUBLISH_QUEUE: Fila de publicação
CREATE TABLE publish_queue (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    content_item_id UUID REFERENCES content_items(id) ON DELETE SET NULL,
    content_variant_id UUID REFERENCES content_variants(id) ON DELETE SET NULL,
    social_account_id UUID REFERENCES social_accounts(id) ON DELETE CASCADE,
    
    -- Agendamento
    scheduled_for TIMESTAMPTZ NOT NULL,
    
    -- Payload para publicação
    publish_payload JSONB NOT NULL,  -- {"text":"...", "media_url":"...", "platform_specific":{...}}
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'published', 'failed', 'cancelled')),
    
    -- Resultado
    platform_post_id TEXT,  -- ID retornado pela API (Instagram Post ID, etc)
    platform_response JSONB,
    error_message TEXT,
    
    -- Retry
    retry_count INT DEFAULT 0,
    max_retries INT DEFAULT 3,
    
    -- Timestamps
    processed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- PUBLISH_LOGS: Histórico completo
CREATE TABLE publish_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    publish_queue_id UUID REFERENCES publish_queue(id) ON DELETE SET NULL,
    content_item_id UUID REFERENCES content_items(id) ON DELETE SET NULL,
    
    -- Dados da publicação
    platform TEXT NOT NULL,
    published_at TIMESTAMPTZ NOT NULL,
    published_url TEXT,  -- Link público do post
    
    -- Métricas iniciais (podem ser atualizadas posteriormente)
    initial_metrics JSONB DEFAULT '{"likes":0, "comments":0, "shares":0}',
    
    -- Auditoria
    published_by UUID REFERENCES auth.users(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.4 Módulo Ads Analítico

```sql
-- AD_ACCOUNTS: Contas de Ads conectadas
CREATE TABLE ad_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    
    -- Plataforma
    platform TEXT NOT NULL CHECK (platform IN ('google_ads', 'meta_ads', 'tiktok_ads')),
    account_name TEXT NOT NULL,
    
    -- Credenciais
    access_token_encrypted TEXT NOT NULL,
    refresh_token_encrypted TEXT,
    token_expires_at TIMESTAMPTZ,
    
    -- IDs externos
    platform_account_id TEXT NOT NULL,  -- Google Ads Customer ID, Meta Ad Account ID, etc
    
    -- Moeda e timezone
    currency TEXT DEFAULT 'BRL',
    timezone TEXT DEFAULT 'America/Sao_Paulo',
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    last_sync_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(tenant_id, platform, platform_account_id)
);

-- AD_CAMPAIGNS: Campanhas consolidadas
CREATE TABLE ad_campaigns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    ad_account_id UUID REFERENCES ad_accounts(id) ON DELETE CASCADE,
    
    -- Dados da campanha
    platform_campaign_id TEXT NOT NULL,
    campaign_name TEXT NOT NULL,
    platform TEXT NOT NULL,
    
    -- Objetivo
    objective TEXT,  -- CONVERSIONS, TRAFFIC, AWARENESS, etc
    
    -- Budget
    daily_budget DECIMAL(15,2),
    lifetime_budget DECIMAL(15,2),
    
    -- Status
    status TEXT,  -- ACTIVE, PAUSED, ARCHIVED (vem da plataforma)
    
    -- Datas
    start_date DATE,
    end_date DATE,
    
    -- Sync
    last_synced_at TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(ad_account_id, platform_campaign_id)
);

-- AD_INSIGHTS: Métricas diárias
CREATE TABLE ad_insights (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    ad_campaign_id UUID REFERENCES ad_campaigns(id) ON DELETE CASCADE,
    
    -- Data de referência
    date DATE NOT NULL,
    
    -- Métricas core
    impressions BIGINT DEFAULT 0,
    clicks BIGINT DEFAULT 0,
    spend DECIMAL(15,2) DEFAULT 0,
    conversions BIGINT DEFAULT 0,
    conversion_value DECIMAL(15,2) DEFAULT 0,
    
    -- Métricas calculadas
    ctr DECIMAL(5,4),          -- Click-Through Rate
    cpc DECIMAL(10,2),         -- Cost Per Click
    cpm DECIMAL(10,2),         -- Cost Per Mille
    cpa DECIMAL(10,2),         -- Cost Per Acquisition
    roas DECIMAL(10,2),        -- Return on Ad Spend
    
    -- Raw data da plataforma
    platform_data JSONB,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    UNIQUE(ad_campaign_id, date)
);

-- AD_RECOMMENDATIONS: Sugestões da IA
CREATE TABLE ad_recommendations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    ad_campaign_id UUID REFERENCES ad_campaigns(id) ON DELETE CASCADE,
    
    -- Tipo de recomendação
    recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('pause', 'increase_budget', 'decrease_budget', 'change_audience', 'change_creative', 'alert')),
    
    -- Recomendação da IA
    recommendation_text TEXT NOT NULL,
    reasoning TEXT,  -- Explicação do Claude
    
    -- Prioridade
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    
    -- Dados de suporte
    supporting_data JSONB,  -- {"current_cpa": 150, "target_cpa": 80, ...}
    
    -- Status
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'acknowledged', 'applied', 'dismissed')),
    
    -- Ação tomada
    action_taken_by UUID REFERENCES auth.users(id),
    action_notes TEXT,
    action_taken_at TIMESTAMPTZ,
    
    -- IA
    ai_request_id UUID REFERENCES ai_requests(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 3.5 Módulo CRM Avançado

```sql
-- CRM_INTERACTIONS: Histórico de interações (IA + Humano)
CREATE TABLE crm_interactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    
    -- Tipo de interação
    interaction_type TEXT NOT NULL CHECK (interaction_type IN ('whatsapp', 'email', 'phone', 'meeting', 'note', 'ai_suggestion')),
    
    -- Direção
    direction TEXT CHECK (direction IN ('inbound', 'outbound', 'internal')),
    
    -- Conteúdo
    content TEXT,
    summary TEXT,  -- Resumo gerado pela IA
    
    -- Mídia
    media_urls TEXT[],
    
    -- Autor
    created_by UUID REFERENCES auth.users(id),  -- NULL se foi IA
    is_ai_generated BOOLEAN DEFAULT false,
    ai_request_id UUID REFERENCES ai_requests(id),
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CRM_SUGGESTIONS: Recomendações da IA para cada lead
CREATE TABLE crm_suggestions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    
    -- Tipo de sugestão
    suggestion_type TEXT NOT NULL CHECK (suggestion_type IN ('next_step', 'response', 'qualification', 'alert', 'offer')),
    
    -- Conteúdo da sugestão
    suggestion_text TEXT NOT NULL,
    reasoning TEXT,  -- Por que a IA sugeriu isso
    
    -- Prioridade
    priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
    
    -- Status
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'modified', 'rejected')),
    
    -- Ação
    actioned_by UUID REFERENCES auth.users(id),
    actioned_at TIMESTAMPTZ,
    action_notes TEXT,
    
    -- IA
    ai_request_id UUID REFERENCES ai_requests(id),
    
    -- Validade
    expires_at TIMESTAMPTZ,  -- Sugestões sensíveis ao tempo
    
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- CR
