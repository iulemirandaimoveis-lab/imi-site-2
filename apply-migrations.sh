#!/bin/bash

# Script para aplicar migrations do Sistema Comercial IA
# Execute: chmod +x apply-migrations.sh && ./apply-migrations.sh

echo "🚀 Aplicando Migrations do Sistema Comercial IA"
echo "================================================"
echo ""

# Verifica se Supabase CLI está instalado
if ! command -v supabase &> /dev/null; then
    echo "⚠️  Supabase CLI não encontrado."
    echo "📝 Você pode:"
    echo "   1. Instalar via: npm install -g supabase"
    echo "   2. Aplicar manualmente via Supabase Dashboard (SQL Editor)"
    echo ""
    echo "📂 Arquivos SQL para aplicar:"
    echo "   - supabase/migrations/004_multi_tenant_core.sql"
    echo "   - supabase/migrations/005_content_management.sql"
    echo ""
    exit 1
fi

# Aplica migrations
echo "📦 Aplicando Migration 004: Multi-Tenant Core..."
supabase db push --file supabase/migrations/004_multi_tenant_core.sql

if [ $? -eq 0 ]; then
    echo "✅ Migration 004 aplicada com sucesso!"
else
    echo "❌ Erro ao aplicar Migration 004"
    exit 1
fi

echo ""
echo "📦 Aplicando Migration 005: Content Management..."
supabase db push --file supabase/migrations/005_content_management.sql

if [ $? -eq 0 ]; then
    echo "✅ Migration 005 aplicada com sucesso!"
else
    echo "❌ Erro ao aplicar Migration 005"
    exit 1
fi

echo ""
echo "================================================"
echo "✅ Todas migrations aplicadas com sucesso!"
echo ""
echo "📋 Próximos passos:"
echo "   1. Configure API keys no .env:"
echo "      - ANTHROPIC_API_KEY"
echo "      - GOOGLE_AI_API_KEY"
echo "   2. Reinicie o servidor: npm run dev"
echo "   3. Acesse: http://localhost:3000/backoffice/conteudos"
echo ""
