const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Tenta pegar string de conexão direta primeiro, depois pooler
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
    console.error('❌ Nenhuma string de conexão encontrada (DIRECT_URL, DATABASE_URL, POSTGRES_URL) no .env');
    process.exit(1);
}

const client = new Client({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        console.log('🔌 Conectando ao banco...');
        await client.connect();
        console.log('✅ Conectado!');

        const sqlPath = path.join(__dirname, '../supabase/migrations/012_executive_reports.sql');

        if (!fs.existsSync(sqlPath)) {
            throw new Error(`Arquivo não encontrado: ${sqlPath}`);
        }

        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('📝 Executando SQL de:', sqlPath);

        // Executa o SQL completo
        await client.query(sql);

        console.log('🚀 Migration 012 aplicada com sucesso!');
        console.log('📊 Tabela executive_reports criada.');
        console.log('👀 View analytics_consolidated criada (cuidado: verifique joins).');

    } catch (err) {
        console.error('❌ Erro na migration:', err);
        if (err.position) {
            console.error(`Erro na posição: ${err.position}`);
        }
    } finally {
        await client.end();
    }
}

run();
