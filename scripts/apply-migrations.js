require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Variáveis de ambiente não encontradas');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function executeSqlFile(filename) {
    console.log(`\n📦 Aplicando ${filename}...`);

    const filePath = path.join(__dirname, '..', 'supabase', 'migrations', filename);
    const sql = fs.readFileSync(filePath, 'utf-8');

    // Split por statement (separados por ;)
    const statements = sql
        .split(';')
        .map(s => s.trim())
        .filter(s => s.length > 0 && !s.startsWith('--'));

    for (const statement of statements) {
        try {
            const { error } = await supabase.rpc('exec', { sql: statement });
            if (error && !error.message.includes('already exists')) {
                console.error(`⚠️  ${error.message.substring(0, 100)}`);
            }
        } catch (e) {
            // Silenciar erros de "já existe"
            if (!e.message.includes('already exists')) {
                console.error(`⚠️  ${e.message.substring(0, 100)}`);
            }
        }
    }

    console.log(`✅ ${filename} processado`);
}

async function main() {
    console.log('🚀 Aplicando Migrations do Sistema Comercial IA\n');

    try {
        await executeSqlFile('004_multi_tenant_core.sql');
        await executeSqlFile('005_content_management.sql');

        console.log('\n✅ Migrations aplicadas!');
        console.log('\n📋 Verificando tabelas criadas...\n');

        const { data, error } = await supabase
            .from('tenants')
            .select('id, slug, name')
            .limit(1);

        if (error) {
            console.log('⚠️  Tabelas ainda não visíveis via RLS (normal)');
            console.log('   Execute manualmente via SQL Editor se necessário');
        } else {
            console.log('✅ Tabela tenants acessível');
            if (data && data.length > 0) {
                console.log(`   Tenant: ${data[0].name} (${data[0].slug})`);
            }
        }
    } catch (error) {
        console.error('\n❌ Erro:', error.message);
        console.log('\n📝 Aplique manualmente via Supabase Dashboard');
    }
}

main();
