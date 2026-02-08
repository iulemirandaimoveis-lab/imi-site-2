// Script para executar migração SQL diretamente no PostgreSQL
// Execute com: node scripts/migrate.mjs

import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Usar pooler connection (mais confiável)
const DATABASE_URL = 'postgresql://postgres.zocffccwjjyelwrgunhu:eusouumlobo@aws-0-us-west-2.pooler.supabase.com:6543/postgres';

async function runMigration() {
    console.log('🚀 Conectando ao banco de dados...\n');

    const client = new pg.Client({
        connectionString: DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await client.connect();
        console.log('✅ Conectado ao PostgreSQL!\n');

        // Ler arquivo de migração
        const migrationPath = path.join(__dirname, '../supabase/migrations/002_backoffice_complete.sql');
        const sql = fs.readFileSync(migrationPath, 'utf-8');

        console.log('📋 Executando migração...\n');

        // Executar SQL completo
        await client.query(sql);

        console.log('✅ Migração executada com sucesso!\n');

        // Verificar tabelas criadas
        const result = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            AND table_type = 'BASE TABLE'
            ORDER BY table_name;
        `);

        console.log('📊 Tabelas no banco:');
        result.rows.forEach((row, i) => {
            console.log(`   ${i + 1}. ${row.table_name}`);
        });

        // Verificar contagem de registros nas tabelas novas
        console.log('\n📈 Dados inseridos:');

        const devCount = await client.query('SELECT COUNT(*) FROM developers');
        console.log(`   - developers: ${devCount.rows[0].count} registros`);

        const pagesCount = await client.query('SELECT COUNT(*) FROM pages');
        console.log(`   - pages: ${pagesCount.rows[0].count} registros`);

    } catch (error) {
        console.error('❌ Erro na migração:', error.message);

        if (error.message.includes('already exists')) {
            console.log('\n⚠️  Algumas estruturas já existem. Isso é normal se a migração já foi executada antes.');
        }
    } finally {
        await client.end();
        console.log('\n🔌 Conexão encerrada.');
    }
}

runMigration();
