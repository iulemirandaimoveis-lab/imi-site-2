# IMI Atlantis - Backoffice Completo

## Estrutura Implementada

### Módulos Funcionais

| Módulo | Rota | Status |
|--------|------|--------|
| Dashboard Analítico | `/backoffice/dashboard` | ✅ Funcional |
| Gestão de Imóveis | `/backoffice/imoveis` | ✅ Funcional |
| Gestão de Unidades | `/backoffice/imoveis/[id]/unidades` | ✅ Funcional |
| Gestão de Construtoras | `/backoffice/construtoras` | ✅ Funcional |
| CRM de Leads | `/backoffice/leads` | ✅ Funcional |
| Consultorias | `/backoffice/consultations` | ✅ Funcional |
| Solicitações de Crédito | `/backoffice/credito` | ✅ Funcional |
| Solicitações de Avaliação | `/backoffice/avaliacoes` | ✅ Funcional |
| Conteúdo Institucional | `/backoffice/conteudo` | ✅ Funcional |
| Configurações | `/backoffice/settings` | ⚙️ Em desenvolvimento |

---

## Como Rodar Localmente

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variáveis de ambiente
# Crie um arquivo .env.local com:
NEXT_PUBLIC_SUPABASE_URL=sua_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave
DATABASE_URL=postgres://...
DIRECT_URL=postgres://...

# 3. Gerar Prisma Client
npx prisma generate

# 4. Rodar em desenvolvimento
npm run dev

# 5. Acessar
# Frontend: http://localhost:3000
# Backoffice: http://localhost:3000/backoffice
```

---

## Executar Migrações SQL no Supabase

### Passo 1: Migração Base (001_backoffice.sql)
Se ainda não foi executada, acesse:
1. https://supabase.com/dashboard → Seu projeto
2. SQL Editor → New Query
3. Cole o conteúdo de `supabase/migrations/001_backoffice.sql`
4. Execute

### Passo 2: Migração Complementar (002_backoffice_complete.sql)
1. SQL Editor → New Query
2. Cole o conteúdo de `supabase/migrations/002_backoffice_complete.sql`
3. Execute

**Tabelas criadas na migração 002:**
- `developers` - Construtoras/Incorporadoras
- `pages` - Conteúdo institucional editável
- `activity_logs` - Log de atividades para auditoria

---

## Deploy na Vercel

O deploy é automático via GitHub. Cada push para `main` dispara:

1. Build do Next.js
2. Deploy automático
3. Disponibilização em https://www.iulemirandaimoveis.com.br

**Variáveis de ambiente necessárias na Vercel:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `DATABASE_URL`
- `DIRECT_URL`

---

## Autenticação

### Login
- Rota: `/backoffice` (página de login)
- Sistema: Supabase Auth
- Após login: redireciona para `/backoffice/dashboard`

### Criar usuário admin
Execute no Supabase Auth → Users → Add User

Ou via API:
```bash
curl -X POST '/api/setup-admin' \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@imi.com.br","password":"SuaSenhaForte123"}'
```

### Proteção de Rotas
- Middleware em `src/middleware.ts`
- Todas as rotas `/backoffice/*` (exceto login) requerem autenticação
- Usuário não autenticado é redirecionado para `/backoffice`

---

## Estrutura de Pastas

```
src/
├── app/
│   ├── [lang]/(website)/     # Site público (multi-idioma)
│   ├── backoffice/           # Backoffice administrativo
│   │   ├── avaliacoes/
│   │   ├── construtoras/     ← NOVO
│   │   ├── consultations/
│   │   ├── conteudo/         ← NOVO
│   │   ├── credito/
│   │   ├── dashboard/
│   │   ├── imoveis/
│   │   │   ├── [id]/
│   │   │   │   └── unidades/ ← NOVO
│   │   │   └── page.tsx
│   │   ├── leads/
│   │   └── settings/
│   └── api/                  # APIs REST
├── components/
│   ├── backoffice/           # Componentes do admin
│   └── ui/                   # Componentes reutilizáveis
├── lib/
│   └── supabase/             # Clients Supabase
└── middleware.ts             # Proteção de rotas
```

---

## Banco de Dados

### Tabelas Principais

| Tabela | Descrição |
|--------|-----------|
| `developers` | Construtoras e incorporadoras |
| `developments` | Empreendimentos imobiliários |
| `development_units` | Unidades de cada empreendimento |
| `leads` | Contatos captados do site |
| `consultations` | Solicitações de consultoria |
| `credit_requests` | Simulações de crédito |
| `appraisal_requests` | Solicitações de avaliação |
| `pages` | Conteúdo institucional editável |
| `activity_logs` | Auditoria de ações |

### RLS (Row Level Security)
- Todas as tabelas têm RLS habilitado
- Usuários autenticados têm acesso total
- Formulários públicos (leads, etc.) permitem INSERT anônimo

---

## Próximos Passos (Sugestões)

1. **Upload de Logo de Construtoras** - Integrar com Supabase Storage
2. **Editor WYSIWYG** - Substituir textarea por editor rich text para páginas
3. **Relatórios Avançados** - Gráficos e exportação de dados
4. **Controle de Permissões** - Interface para gerenciar roles por usuário
5. **Notificações em Tempo Real** - WebSocket para novos leads

---

## Credenciais de Teste

Após executar as migrações, crie um usuário via Supabase Auth:
- Email: `admin@iulemirandaimoveis.com.br`
- Senha: (defina uma senha forte)

---

*Última atualização: 2026-02-07*
