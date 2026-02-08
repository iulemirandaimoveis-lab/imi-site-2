# Configuração das APIs de IA - Sistema Comercial

## Pré-requisitos

Para utilizar o Sistema Operacional Comercial com IA, você precisa de:

### 1. Claude API (Anthropic)
- **Website**: https://console.anthropic.com/
- **Criar conta** e obter API Key
- **Custo**: ~$3/1M tokens input + $15/1M tokens output
- **Modelo usado**: `claude-3-5-sonnet-20241022`

### 2. Gemini API (Google)
- **Website**: https://ai.google.dev/
- **Criar projeto no Google AI Studio**
- **Obter API Key** gratuita para testes
- **Custo produção**: ~$0.02 por imagem (Vertex AI Imagen)
- **Modelo usado**: `gemini-2.0-flash-exp` para prompts, `imagen-3` para imagens

## Configuração Passo a Passo

### Passo 1: Obter Claude API Key

1. Acesse https://console.anthropic.com/
2. Faça login ou crie uma conta
3. Vá em **API Keys** no menu lateral
4. Clique em **Create Key**
5. Copie a key (formato: `sk-ant-api...`)
6. Adicione ao `.env`:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
```

**Importante**: A key só é exibida uma vez. Guarde com segurança.

### Passo 2: Obter Google AI API Key (Gemini)

1. Acesse https://ai.google.dev/
2. Clique em **Get API key** → **Get API key in Google AI Studio**
3. Crie um novo projeto ou selecione existente
4. Clique em **Create API Key**
5. Copie a key (formato: `AIza...`)
6. Adicione ao `.env`:

```bash
GOOGLE_AI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX
```

### Passo 3: Atualizar .env

Copie `.env.example` para `.env` e preencha:

```bash
# Supabase (já configurado)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...
NEXT_PUBLIC_SUPABASE_URL=https://...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...

# APIs de IA (NOVO)
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
GOOGLE_AI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX

# Google Cloud (OPCIONAL - para produção com Vertex AI)
# GOOGLE_CLOUD_PROJECT_ID=seu-projeto-id
# GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
```

### Passo 4: Aplicar Migrations

Execute as novas migrations SQL no Supabase:

```bash
# Via Supabase CLI (recomendado)
npx supabase db push

# OU manualmente via Dashboard Supabase
# 1. Acesse seu projeto no Supabase Dashboard
# 2. Vá em SQL Editor
# 3. Execute os arquivos na ordem:
#    - supabase/migrations/004_multi_tenant_core.sql
#    - supabase/migrations/005_content_management.sql
```

### Passo 5: Verificar Instalação

Execute o teste de integração:

```bash
npm run dev

# Em outro terminal
curl -X POST http://localhost:3000/api/ai/test \
  -H "Content-Type: application/json" \
  -d '{"test": true}'
```

Se retornar sucesso, as APIs estão configuradas corretamente.

## Custos Estimados

### Por Tenant/Mês

**Claude API**:
- Geração de 1 calendário mensal: ~10k tokens = $0.15
- Geração de 30 posts: ~150k tokens = $3.00
- Total médio: **$50-200/mês** (depende do volume)

**Gemini API**:
- 30 imagens geradas: $0.60 (com Vertex AI: ~$0.02/img)
- Otimização de prompts: negligível (gratuito até 60 req/min)
- Total médio: **$30-100/mês**

**Total IA por tenant**: $80-300/mês

## Produção: Vertex AI (Opcional)

Para produção com maior volume, recomenda-se usar Vertex AI:

### Setup Vertex AI

1. Criar projeto no Google Cloud Console
2. Ativar Vertex AI API
3. Criar Service Account e baixar JSON key
4. Configurar variáveis:

```bash
GOOGLE_CLOUD_PROJECT_ID=seu-projeto-12345
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
```

5. Descomentar código em `src/lib/ai/gemini.ts` (função `generateImageVertexAI`)

## Troubleshooting

### Erro: "Invalid API key"
- Verifique se copiou a key completa
- Confirme que a key não expirou
- Claude keys começam com `sk-ant-api`
- Google keys começam com `AIza`

### Erro: "Rate limit exceeded"
- Claude: 50 req/min (tier padrão)
- Google: 60 req/min (gratuito), 300 req/min (pago)
- Implemente retry logic ou aumente tier

### Erro: "CORS" ou "Network"
- APIs chamadas server-side (API Routes)
- Nunca exponha keys no frontend
- Verifique se está usando `fetch` de API Route, não direto

## Segurança

**NUNCA commite API keys no Git:**

```bash
# .gitignore já inclui
.env
.env.local
.env.production
```

**Rotação de keys**:
- Claude: Gere nova key, teste, delete antiga
- Google: Pode ter múltiplas keys ativas

**Rate limiting**:
- Implementado via Supabase RLS
- Logs em `ai_requests` table
- Monitoramento de custo em tempo real

## Suporte

- **Claude**: https://docs.anthropic.com/
- **Gemini**: https://ai.google.dev/docs
- **Vertex AI**: https://cloud.google.com/vertex-ai/docs

---

**Próximo passo**: Acessar `/backoffice/conteudos` e testar geração de calendário!
