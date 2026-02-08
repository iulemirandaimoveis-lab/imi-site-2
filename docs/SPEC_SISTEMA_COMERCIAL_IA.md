# ESPECIFICAÇÃO TÉCNICA: SISTEMA OPERACIONAL COMERCIAL COM IA
**Produto**: Connectar SaaS Platform  
**Cliente Referência**: IMI - Inteligência Imobiliária  
**Versão**: 1.0 Fechada | **Data**: 2026-02-08

---

## 1. DIAGNÓSTICO BACKOFFICE ATUAL

### Stack Validado
- Next.js 14 + TypeScript + Supabase PostgreSQL + Prisma
- Supabase Auth + Storage + RLS
- SWR cache, Recharts, TailwindCSS, Framer Motion
- Deploy Vercel (produção ativa: www.iulemirandaimoveis.com.br)

### Módulos Funcionais
✅ Dashboard KPIs | ✅ CRM Leads básico | ✅ CRUD Imóveis | ✅ CRUD Construtoras | ✅ Gestão Conteúdo | ✅ Auth + Auditoria

### Gaps para Sistema Operacional
❌ Geração conteúdo IA | ❌ Automação postagens | ❌ Consolidação Ads | ❌ CRM prescritivo IA | ❌ Playbooks nicho | ❌ Multi-tenant | ❌ Relatórios executivos | ❌ Integrações Meta/Google/LinkedIn/TikTok/WhatsApp API

---

## 2. ARQUITETURA GERAL

### Princípios Invioláveis
1. **Claude NUNCA executa ações** - apenas planeja, sugere, gera texto/prompts
2. **Aprovação humana obrigatória** - toda publicação/campanha exige operador
3. **Multi-tenant nativo** - workspace isolado por cliente com configurações próprias
4. **Zero hardcoding de nicho** - tudo parametrizado via `tenant_settings` e `niche_playbooks`
5. **Auditoria total** - toda IA request, aprovação e publicação logada
6. **IA como serviço** - Claude API (Anthropic) + Gemini (Vertex AI)
7. **Sem refatoração core** - módulos novos acoplam ao existente

### Camadas do Sistema
```
[Frontend Next.js] → [API Routes /api/ai, /api/publish, /api/ads, /api/crm]
                  → [Workers N8N/Cron: Publish, Ads Sync, CRM Auto]
                  → [Supabase DB: 18 tabelas novas + existentes]
                  → [External APIs: Meta, Google, LinkedIn, TikTok, WhatsApp, Anthropic, Vertex]
```

---

## 3. MODELO DE DADOS (18 TABELAS NOVAS)

### Multi-Tenancy Core
- `tenants` - workspaces (slug, niche, playbook_id, brand_colors, tone_of_voice, ai_config)
- `niche_playbooks` - templates reutilizáveis (slug, default_language, legal_restrictions, campaign_templates)
- `tenant_users` - vínculo users ↔ tenants (role: owner/admin/operator/viewer)

### Módulo Conteúdos
- `content_calendar` - planejamento mensal (tenant_id, month/year, objectives, ai_plan, status, approved_by)
- `content_items` - posts individuais (calendar_id, topic, base_copy, image_prompt, scheduled_date, status)
- `content_variants` - adaptações por canal (content_item_id, platform, adapted_copy, aspect_ratio)

### Módulo Automação Postagens
- `social_accounts` - contas conectadas (tenant_id, platform, access_token_encrypted, platform_account_id)
- `publish_queue` - fila agendamento (content_item_id, scheduled_for, publish_payload, status, platform_post_id)
- `publish_logs` - histórico publicações (platform, published_url, initial_metrics, published_by)

### Módulo Ads Analítico
- `ad_accounts` - contas ads conectadas (platform, platform_account_id, access_token_encrypted)
- `ad_campaigns` - campanhas consolidadas (platform_campaign_id, objective, budget, status)
- `ad_insights` - métricas diárias (date, impressions, clicks, spend, conversions, ctr, cpc, roas)
- `ad_recommendations` - sugestões IA (campaign_id, recommendation_type, reasoning, priority, status)

### Módulo CRM Avançado
- `crm_interactions` - histórico (lead_id, interaction_type, content, summary, is_ai_generated)
- `crm_suggestions` - recomendações IA (lead_id, suggestion_type, reasoning, priority, status, expires_at)
- `crm_follow_up_automations` - automações follow-up (trigger_type, conditions, ai_template)

### Módulo Relatórios
- `reports` - relatórios executivos (tenant_id, report_type, period, ai_content, metrics, approved_by)

### IA Infrastructure
- `ai_requests` - logs todas chamadas IA (tenant_id, provider, model, prompt, response, tokens, cost)

---

## 4. FLUXOS CRÍTICOS DE IA

### 4.1 Fluxo Geração Conteúdo
```
1. Operador: Define brief mensal → content_calendar (status: draft)
2. API /api/ai/generate-calendar → Claude: retorna plano 30 dias → ai_plan JSONB
3. Operador: Aprova → status: approved
4. Para cada dia: /api/ai/generate-content → Claude: legenda/CTA/hashtags/prompt_imagem
5. /api/ai/generate-images → Gemini: gera imagens → salva Supabase Storage
6. Operador: Revisa → aprova → status: approved → content_items
7. Sistema: Cria content_variants (Instagram/Facebook/LinkedIn/TikTok)
8. Operador: Agenda → publish_queue (scheduled_for)
9. Worker N8N: No datetime → publica Meta Graph API → publish_logs
```

### 4.2 Fluxo Ads Prescritivo
```
1. Worker Cron: Diário 6h → /api/ads/sync → Google Ads API + Meta Ads API
2. Sistema: Atualiza ad_campaigns + ad_insights (métricas últimas 24h)
3. /api/ai/analyze-ads → Claude: analisa performance → identifica desperdícios
4. Sistema: Cria ad_recommendations (pause/increase_budget/change_audience)
5. Operador: Dashboard Ads → vê alertas → aceita/rejeita sugestão
6. Se aceita: Sistema aplica via API externa (pausa campanha, ajusta budget)
```

### 4.3 Fluxo CRM Prescritivo
```
1. Novo lead: leads table → trigger
2. /api/ai/qualify-lead → Claude: analisa dados → retorna score + perfil
3. Sistema: Atualiza leads.qualification_score
4. /api/ai/suggest-next-step → Claude: sugere follow-up com base em histórico
5. crm_suggestions (suggestion_type: next_step, priority, expires_at)
6. Operador: Vê sugestão → escreve mensagem (pode usar draft IA)
7. crm_interactions (content, summary gerado por Claude)
8. Worker Cron: Identifica leads esquecidos (>7 dias sem contato) → alert IA
```

---

## 5. STACK TÉCNICO & INTEGRAÇÕES

### IA Providers
- **Claude API** (Anthropic Claude 3.5 Sonnet): planejamento, texto, análise, sugestões
- **Gemini Vertex AI** (Imagen 3): geração de imagens a partir de prompts

### Integrações Externas (via API Routes)
- **Meta Graph API**: Instagram Feed/Stories, Facebook Pages
- **Google Ads API**: campanhas, keywords, métricas
- **LinkedIn Marketing API**: posts, company pages
- **TikTok Marketing API**: publicação orgânica + ads
- **WhatsApp Business API** (oficial): envio mensagens, chatbot qualificação

### Automação/Orquestração
- **N8N** (self-hosted ou cloud): workflows de publicação, sync ads, follow-ups
- **Cron Jobs** (Vercel/Supabase): triggers diários/horários

### Segurança
- Tokens OAuth: criptografados via `pgcrypto` Supabase (AES-256)
- RLS Policies: tenant_id obrigatório em todas queries
- API Rate Limiting: via Vercel Edge Config
- GDPR/LGPD: logs retention 90 dias, consent tracking

---

## 6. MÓDULOS BACKOFFICE (UI)

### 6.1 Módulo Conteúdos (`/backoffice/conteudos`)
**Telas**:
1. **Calendário Mensal** - grid 30 dias, status badges, modal brief
2. **Geração IA** - loading state, preview plano Claude, botão aprovar
3. **Editor de Post** - campos base_copy/CTA/hashtags, preview imagem Gemini, tabs variantes por canal
4. **Agendamento** - date/time picker, seleção contas sociais, confirmação

**Ações**:
- Criar brief → gerar plano IA → aprovar
- Gerar posts → gerar imagens IA → aprovar
- Agendar publicação → fila

### 6.2 Módulo Automação (`/backoffice/publicacoes`)
**Telas**:
1. **Contas Sociais** - lista conectadas, botão OAuth connect, status token
2. **Fila de Publicação** - tabela agendamentos, status (pending/published/failed), retry manual
3. **Histórico** - logs completos, links posts publicados, métricas iniciais

**Ações**:
- Conectar conta (OAuth flow)
- Cancelar agendamento
- Republicar falhado

### 6.3 Módulo Ads (`/backoffice/ads`)
**Telas**:
1. **Dashboard Consolidado** - cards spend/conversions/ROAS, gráficos tendência
2. **Campanhas** - tabela todas campanhas (Google+Meta+TikTok), filtros, badges status
3. **Recomendações IA** - lista alertas Claude, prioridade, ação rápida (aceitar/rejeitar)

**Ações**:
- Sincronizar contas ads (OAuth flow)
- Ver detalhes campanha
- Aplicar recomendação IA

### 6.4 Módulo CRM (`/backoffice/leads` - expandido)
**Novas Features**:
- Score de qualificação IA (0-100)
- Painel sugestões IA (cartões com reasoning)
- Histórico interações com resumos IA
- Alertas leads esquecidos
- Drafts de resposta IA (WhatsApp/email)

**Ações**:
- Ver sugestão IA → escrever resposta → enviar WhatsApp
- Marcar sugestão aceita/rejeitada
- Adicionar nota manual → IA resume

### 6.5 Módulo Playbooks (`/backoffice/playbooks`)
**Telas**:
1. **Lista Playbooks** - cards nichos, versão, status
2. **Editor Playbook** - tabs: linguagem padrão, públicos típicos, restrições legais, templates campanhas
3. **Aplicar a Tenant** - vincula playbook_id ao tenant

### 6.6 Módulo Relatórios (`/backoffice/relatorios`)
**Telas**:
1. **Geração** - seleção período, tipo (semanal/mensal), gerar via IA
2. **Preview** - markdown renderizado, seções: ações executadas, leads, custos, resultados, recomendações
3. **Histórico** - lista relatórios gerados, download PDF

**Ações**:
- Gerar relatório IA → aprovar → salvar → exportar PDF

---

## 7. PARAMETRIZAÇÃO POR NICHO

### Estrutura niche_playbooks
```json
{
  "slug": "real_estate_brazil",
  "default_language": {
    "greetings": ["Olá! Ficou interessado(a) no imóvel?"],
    "objections_handling": {
      "price_high": "Entendo. Vamos avaliar o custo-benefício técnico..."
    },
    "CTAs": ["Agende sua visita", "Fale com especialista"]
  },
  "typical_audiences": ["investidores", "primeira_casa", "upgrade"],
  "legal_restrictions": "Evitar promessas de ROI. Seguir Lei 8.078/90 CDC. Não usar 'garantido'.",
  "campaign_templates": [
    {"type": "lançamento", "budget_range": "5000-20000", "duration_days": 30}
  ]
}
```

### Como IA usa Playbook
- **Geração de conteúdo**: Claude recebe playbook.default_language + playbook.legal_restrictions no prompt
- **Qualificação de lead**: Claude classifica em typical_audiences
- **Criação de campanha**: Usa campaign_templates como referência de estrutura

### Replicação para Novo Nicho
1. Criar entry em `niche_playbooks` (ex: "aesthetics_brazil")
2. Popular default_language, legal_restrictions
3. Criar `tenant` vinculado ao playbook_id
4. Sistema automaticamente adapta prompts IA para contexto

---

## 8. ROADMAP DE IMPLEMENTAÇÃO

### Fase 1: Multi-Tenancy Core (2 semanas)
- [ ] Criar tabelas `tenants`, `niche_playbooks`, `tenant_users`
- [ ] Implementar RLS com tenant_id obrigatório
- [ ] Middleware tenant context (detecta tenant por subdomain ou user)
- [ ] UI: Seletor de workspace, configurações tenant

### Fase 2: Módulo Conteúdos (3 semanas)
- [ ] Tabelas `content_calendar`, `content_items`, `content_variants`
- [ ] Tabela `ai_requests` (logs infraestrutura)
- [ ] API /api/ai/generate-calendar (Claude integration)
- [ ] API /api/ai/generate-content
- [ ] API /api/ai/generate-images (Gemini integration)
- [ ] UI: Calendário, editor posts, preview, aprovação

### Fase 3: Módulo Automação Postagens (3 semanas)
- [ ] Tabelas `social_accounts`, `publish_queue`, `publish_logs`
- [ ] OAuth flows: Meta, LinkedIn, TikTok
- [ ] API /api/publish/schedule
- [ ] Worker N8N: poll publish_queue → publica via APIs externas
- [ ] UI: Gerenciar contas, fila, histórico

### Fase 4: Módulo Ads (2 semanas)
- [ ] Tabelas `ad_accounts`, `ad_campaigns`, `ad_insights`, `ad_recommendations`
- [ ] OAuth: Google Ads, Meta Ads, TikTok Ads
- [ ] Worker sync diário: /api/ads/sync
- [ ] API /api/ai/analyze-ads (Claude analisa métricas)
- [ ] UI: Dashboard consolidado, recomendações IA

### Fase 5: Módulo CRM Prescritivo (2 semanas)
- [ ] Tabelas `crm_interactions`, `crm_suggestions`, `crm_follow_up_automations`
- [ ] API /api/ai/qualify-lead
- [ ] API /api/ai/suggest-next-step
- [ ] Worker: detecta leads esquecidos
- [ ] UI: Expandir /backoffice/leads com IA features

### Fase 6: Playbooks + Relatórios (2 semanas)
- [ ] UI: Editor playbooks
- [ ] Tabela `reports`
- [ ] API /api/ai/generate-report (Claude relatório executivo)
- [ ] UI: Geração relatório, export PDF

### Fase 7: WhatsApp Business API (1 semana)
- [ ] Integração oficial WhatsApp Business API
- [ ] Webhook recebimento mensagens
- [ ] IA: qualificação inicial lead (fluxo secretária 24h)
- [ ] crm_interactions registro automático

### Fase 8: Testes + Homologação (2 semanas)
- [ ] Testes E2E todos fluxos
- [ ] Homologação com IMI (cliente referência)
- [ ] Ajustes finais UX
- [ ] Documentação operador

**Total: ~17 semanas (4 meses)**

---

## 9. CUSTOS ESTIMADOS (Por Tenant/Mês)

### IA APIs
- **Claude API**: ~$50-200 (depende volume geração)
- **Gemini Vertex AI**: ~$30-100 (imagens)

### Integrações
- **N8N Cloud**: $20-50 (ou self-hosted: $0)
- **WhatsApp Business API**: $100-300 (mensagens + hosting)

### Infraestrutura
- **Supabase Pro**: $25/tenant (ou shared: $25 total)
- **Vercel Pro**: $20 (ou shared: gratuito até limite)

**Total por tenant**: $225-670/mês  
**Ticket médio Connectar**: $800-1500/mês/tenant (margem: 40-60%)

---

## 10. DIFERENCIAL COMPETITIVO

### Único no Mercado
1. **1 operador gerencia tudo**: Conteúdo + Ads + CRM + Relatórios
2. **IA prescritiva real**: Claude não é chatbot, é motor de decisão com reasoning
3. **Aprovação humana sempre**: IA sugere, humano valida (compliance legal)
4. **Multi-nicho nativo**: Não é ferramenta de marketing genérica, é SO comercial parametrizável
5. **Consolidação total**: Dashboard único Meta+Google+LinkedIn+TikTok com análise cross-platform

### vs. Concorrentes
- **vs. RD Station/HubSpot**: Não têm IA prescritiva real, não geram conteúdo, não publicam automaticamente
- **vs. Hootsuite/Buffer**: Não têm CRM, não analisam ads, não são multi-tenant com playbooks
- **vs. Salesforce**: Complexidade absurda, custo proibitivo, zero geração de conteúdo

---

## CONCLUSÃO

Esta especificação define um sistema **executável, sem abstrações vagas, sem refatoração do core existente**.

O backoffice IMI evolui para **Sistema Operacional Comercial completo**, servindo como **cliente referência do produto Connectar SaaS**.

Todos os módulos são **acopláveis**, **auditáveis**, **parametrizáveis** e **replicáveis** para qualquer nicho B2C que opere com marketing de conteúdo, ads e vendas consultivas.

**Próximo passo**: Aprovação desta spec → Início Fase 1 (Multi-Tenancy Core).
